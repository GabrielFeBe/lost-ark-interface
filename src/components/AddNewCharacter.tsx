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
		<>
			<button onClick={() => {	
				setIsCreating(!isCreating);
			}}>{isCreating ? 'Close' : 'Create'}</button>
			{ <form 
				className={`transition-all duration-1000 flex gap-5 ${isCreating ? 'h-full' : 'h-[0] opacity-0'}`}
				action="" onSubmit={handleSubmit}>
				<input className='text-black' type="text" placeholder='name' name='name' />
				<input className='text-black' type="number" name='points' />
				<button className='flex h-full'>Create</button>
			</form>}
		</>
	);
}
