import React from 'react';
import { getUser } from '@/utils/auth';

export default async function Dashboard() {
	const user = getUser();

	const dashboardData = await fetch(`http://localhost:3000/api/char/${user.id}`);
	const data = await dashboardData.json();
	console.log(data);
	return (
		<div>Dashboard</div>
	);
}

