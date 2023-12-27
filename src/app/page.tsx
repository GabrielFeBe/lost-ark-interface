import Login from '@/components/Login';
import { getUser } from '@/utils/auth';
import Link from 'next/link';
import React from 'react';

export default async function Home() {
	const token = getUser();

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{	!token ? <Login/> : (
				<>
					<h1>You are in</h1>
					<Link href="/dashboard"> Dashboard</Link>
				</>

			)}
		</main>
	);
}
