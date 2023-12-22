'use client';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { handleDate } from '@/utils/dateCalc';
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
		const data = new FormData(e.currentTarget);
		const name = data.get('name');
		// change timezone to BRST
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
		});
		const json = await res.json();
		console.log(json);
		router.refresh();
	}
	return (
		<>
			<button onClick={() => {
				if(isCreating){
					setIsCreating(false);
				} else {
					setIsCreating(true);
				}

			}}>{isCreating ? 'Close' : 'Create'}</button>
			{isCreating && <form action="" onSubmit={handleSubmit}>
				<input type="text" placeholder='name' name='name'/>
				<input type="number"  name='points'/>
				<button >Create</button>
			</form>}
		</>
	);
}
