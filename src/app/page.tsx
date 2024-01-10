import Login from '@/components/Login';
import Profile from '@/components/Profile';
import { getUser } from '@/utils/auth';
import React from 'react';

export default async function Home() {
	const token = getUser();

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{	!token ? <Login/> : (
				<Profile id={ token.id}/>
			)}
		</main>
	);
}
