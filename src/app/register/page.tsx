import RegisterUser from '@/components/RegisterUser';
import React from 'react';

export default async function Register() {
	const res = await fetch('http://localhost:3000/api/user');
	const data = await res.json();
	console.log(data);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<RegisterUser />  
		</main>
	);
}
