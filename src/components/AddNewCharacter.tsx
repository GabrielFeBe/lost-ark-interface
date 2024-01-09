'use client';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { handleDate } from '@/utils/dateCalc';
import { User } from '@/utils/auth';
// import { miningSchedule } from '@/utils/miningSchedule';
import api from '@/utils/api';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
	user: User;
}
export default function AddNewCharacter( {user} : Props) {
	const [isCreating, setIsCreating] = useState<boolean>(false);
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// const date = new Date();
		// const currDate = dayjs(date).tz('America/Sao_Paulo').format();
		const data = new FormData(e.currentTarget);
		const name = data.get('name');
		const points = data.get('points');
		if(points === null || name === null) {
			throw new Error('points or name is null');
		}
		const body = {
			name,
			dateOfMine: handleDate(+user.pointsCap, +points),
			points,
			userId: +user.id,
		};  
		await api.post('/char', body);
		// The lines 21, 22, 36, 37, 38, 39, 40, 41 and 43 are disabled because even if the bot is ready i don't have a place to host it.
		// const scheduleBody = {
		// 	miliseconds: calculateTime(+points, 30, +user.pointsCap),
		// 	userId: user.discordId,
		// 	messageContent: `You can mine ${user.pointsCap} points again!,Char name ${name} , date of the request: ${dayjs(currDate).format('DD/MM/YYYY HH:mm') }`,
		// };
		// await miningSchedule(scheduleBody);
		window.location.reload();
	}
	return (
		<section  className={`p-3 border-white border-[1px] rounded-md ${ isCreating ? 'h-[100px]' : 'h-[50px]'  }w-full  flex flex-col items-center justify-center gap-5 `}>
			<button 
				className='bg-white text-black p-2 rounded-md text-[18px leading-5] w-[200px] h-[45px] text-center hover:bg-slate-200 transition-all duration-300'
				onClick={() => {	
					setIsCreating(!isCreating);
				}}>{isCreating ? 'Close' : 'Create'}</button>
			{ <form 
				className={`transition-all duration-1000 flex gap-5 ${isCreating ? 'h-[50px]' : 'h-[0] opacity-0'}`}
				action="" onSubmit={handleSubmit}>
				{isCreating && 'Name'}
				<input className={`transition-all duration-1000 text-black ${ isCreating ?'h-[40px]' : 'h-[0px]'} rounded-md`} type="text" placeholder='name' name='name' />
				{isCreating && 'Points'}
				<input 
					className={`transition-all duration-1000 text-black  ${ isCreating ?'h-[40px]' : 'h-[0px]'} rounded-md`}
					type="number" 
					name='points' 
				/>
				<button
					className={`bg-white text-black p-2 rounded-md text-[18px leading-5] w-[200px] ${ isCreating ? 'h-[45px]' : 'h-0' } text-center hover:bg-slate-200 transition-all duration-1000`}
				>Create</button>
			</form>}
		</section>
	);
}
