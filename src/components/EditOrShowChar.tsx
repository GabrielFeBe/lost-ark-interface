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

	if(editing) {
		return (
			<form action="" onSubmit={handleSubmit}>
				<p>{character?.name}</p>
				<p>{dayjs(character?.dateOfMine).format('ddd, MMM D, YYYY h:mm A')}</p>
				<input type="number" name='points' className='text-black'/>
				<button >Save</button>
				<button onClick={() => {
					setEditing(!editing);
				}}>Close</button>
			</form>
		);
	}
  
	return (
		<>
			<tr>
				<td>{character?.name}</td>
			
				<td>{dayjs(character?.dateOfMine).format('ddd, MMM D, YYYY h:mm A')}</td>
		
			</tr>
			<div>	<button onClick={() => {
				setEditing(true);
			}}>Edit</button></div>
		</>
	);
}
