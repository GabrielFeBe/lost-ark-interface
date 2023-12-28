import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function calculateTime
(initialValue:number,
	periodicPointsIncrease:number, 
	targetValue:number, 
	periodicTime = 10) {
	// the time is to be given in minutes and it'll be returned in milliseconds
	const tempo = (targetValue - initialValue) / periodicPointsIncrease * periodicTime;
	return tempo * 60 * 1000;
}

export function handleDate(pointsCap:number,currentPoints:number) {
	// for now the periodic inrese will be locked to 30 points
	const milisecondsToAdd = calculateTime(currentPoints, 30, pointsCap);
	const date = new Date();
	date.setTime(date.getTime() + milisecondsToAdd);
	// change timezone to BRST
	return date;
}