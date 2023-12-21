import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function AddNewCharacter() {
	const date = new Date();
	// change timezone to BRST
	const dateOfMine = dayjs(date).tz('America/Sao_Paulo').format();
	console.log(date);
	console.log(dateOfMine);

	return (
		<div>AddNewCharacter</div>
	);
}
