'use client';
import IChar from '@/types/IChar';
import React, { useState, useEffect} from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { handleDate, calculateTime } from '@/utils/dateCalc';
import { User } from '@/utils/auth';
import { miningSchedule } from '@/utils/miningSchedule';
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
		const date = new Date();
		const currDate = dayjs(date).tz('America/Sao_Paulo').format();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData);
		const formatingObj = { dateOfMine: handleDate(+user.pointsCap, +data.points)};
		const scheduleBody = {
			miliseconds: calculateTime(+data.points, 30, +user.pointsCap),
			userId: user.discordId,
			messageContent: `You can mine ${user.pointsCap} points again!,Char name ${char.name} , date of the request: ${dayjs(currDate).format('DD/MM/YYYY HH:mm') }`,
		};
		const res = await api.patch(`/char/${character?.id}`, formatingObj);
		await miningSchedule(scheduleBody);
		// const json = await res.json();
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
		<div>
			<p>{character?.name}</p>
			<div>
			</div>
			<p>{dayjs(character?.dateOfMine).format('ddd, MMM D, YYYY h:mm A')}</p>
			<button onClick={() => {
				setEditing(true);
			}}>Edit</button>
		</div>

	);
}
