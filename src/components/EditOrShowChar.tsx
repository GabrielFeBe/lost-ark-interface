'use client';
import IChar from '@/types/IChar';
import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  char: IChar
  
}

export default function EditOrShowChar({ char} : Props) {
	const [character, setCharacter] = useState<IChar>();
	const [editing, setEditing] = useState<boolean>(false);
	const router = useRouter();
	useEffect(() => {
		setCharacter(char);
    
	}, []);

	if(editing) {
		return (
			<form action="">
				<p>{character?.name}</p>
				<p>{dayjs(character?.dateOfMine).tz('America/Sao_Paulo').format('ddd, MMM D, YYYY h:mm A')}</p>
				<input type="number"  />
				<button onClick={() => {
					// const date = new Date();
					// // change timezone to BRST
					// const dateOfMine = dayjs(date).tz('America/Sao_Paulo').format();

					setEditing(false);
					router.refresh();
				}}>Save</button>
			</form>
		);
	}
  
	return (
		<div>
			<p>{character?.name}</p>
			<p>{dayjs(character?.dateOfMine).tz('America/Sao_Paulo').format('ddd, MMM D, YYYY h:mm A')}</p>
			<button onClick={() => {
				setEditing(true);
			}}>Edit</button>
		</div>

	);
}
