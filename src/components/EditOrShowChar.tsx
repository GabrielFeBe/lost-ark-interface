'use client';
import IChar from '@/types/IChar';
import React, { useState, useEffect} from 'react';
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
  char: IChar
	user: User;
  
}

export default function EditOrShowChar({ char, user} : Props) {
	const [character, setCharacter] = useState<IChar>();
	const [editing, setEditing] = useState<boolean>(false);
	useEffect(() => {
		setCharacter(char);
	}, []);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// const date = new Date();
		// const currDate = dayjs(date).tz('America/Sao_Paulo').format();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData);
		const formatingObj = { dateOfMine: handleDate(+user.pointsCap, +data.points)};
		// The Lines 30, 31, 36, 37, 38, 39, 40, and 43 are disabled because even if the bot is ready i don't have a place to host it.
		// const scheduleBody = {
		// 	miliseconds: calculateTime(+data.points, 30, +user.pointsCap),
		// 	userId: user.discordId,
		// 	messageContent: `You can mine ${user.pointsCap} points again!,Char name ${char.name} , date of the request: ${dayjs(currDate).format('DD/MM/YYYY HH:mm') }`,
		// };
		const res = await api.patch(`/char/${character?.id}`, formatingObj);

		// await miningSchedule(scheduleBody);
		console.log(res);
		setEditing(!editing);
		window.location.reload();
	}


  
	return (
		<tr className='border-[white] border-[1px]'>
			<td className='p-2 w-[100px]'>{character?.name}</td>
			
			<td className='p-2 w-[250px]'>{dayjs(character?.dateOfMine).format('ddd, MMM D, YYYY h:mm A')}</td>
		
			<td className='p-2 w-[200px] flex items-center justify-center gap-1'>
				
				<div className='flex gap-[5px]'>
					<form action="" onSubmit={handleSubmit} className={`${editing ? 'w-full' : 'w-[0px]'}  flex transition-all duration-1000`}>
						<input type="number" name='points' className={`${editing ? 'w-[100px]' : 'w-[0px]'} text-black  rounded-md transition-all duration-1000`}/>
						<button 
							className={`ml-1 bg-white text-black  rounded-md text-[18px leading-5]  ${ editing ? 'w-[40px]' : 'w-[0px]' } text-center hover:bg-slate-200 transition-all duration-1000`}

						>Save</button>
					
					</form>
					<button onClick={() => {
						setEditing(!editing);
					}}>{ editing ? 'Close' : 'Edit'}</button>
				</div>
			
				
			</td>
		</tr>

	);
}
