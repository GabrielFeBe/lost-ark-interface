import ISchedule from '@/types/ISchedule';

export async function miningSchedule(scheduleBody:ISchedule) {
	await fetch('https://minningbot-js.hu3masterzord.repl.co/schedule', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			// Adicione outros cabeçalhos se necessário...
		},
		body: JSON.stringify(scheduleBody),
	});
}