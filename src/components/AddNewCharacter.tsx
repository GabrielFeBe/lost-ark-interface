'use client';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { handleDate, calculateTime } from '@/utils/dateCalc';
import { useRouter } from 'next/navigation';
import { User } from '@/utils/auth';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
	user: User;
}
export default function AddNewCharacter( {user} : Props) {
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const router = useRouter();
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const date = new Date();
		const currDate = dayjs(date).tz('America/Sao_Paulo').format();
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
		const res = await fetch('http://localhost:3000/api/char', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const scheduleBody = {
			miliseconds: calculateTime(+points, 30, +user.pointsCap),
			userId: user.discordId,
			messageContent: `You can mine ${user.pointsCap} points again!,Char name ${name} , date of the request: ${dayjs(currDate).format('DD/MM/YYYY HH:mm') }`,
		};
		const json = await res.json();
		const schedule = await fetch('https://minningbot-js.hu3masterzord.repl.co/schedule', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// Adicione outros cabeçalhos se necessário...
			},
			body: JSON.stringify(scheduleBody),
		});
		const info = await schedule.json();
		// console.log(handleDate(+user.pointsCap, +points));
		// console.log(calculateTime(+points, 30, +user.pointsCap));
		console.log(info);
		console.log(json);
		router.refresh();
	}
	return (
		<>
			<button onClick={() => {	
				setIsCreating(!isCreating);
			}}>{isCreating ? 'Close' : 'Create'}</button>
			{isCreating && <form action="" onSubmit={handleSubmit}>
				Char Name
				<input className='text-black' type="text" placeholder='name' name='name'/>
				Points
				<input className='text-black' type="number"  name='points'/>
				<button >Create</button>
			</form>}
		</>
	);
}
