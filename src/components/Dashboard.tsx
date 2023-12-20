import React from 'react';
import { getUser } from '@/utils/auth';


export default async function Dashboard() {
	const user = getUser();

	const dashboardData = await fetch(`http://localhost:3000/api/char/${user.id}`);
	const data = await dashboardData.json();
	const characters = data.characters || [];
	return (
		<div>
			{ characters.map((character: any) => {
				return ( 
					<h1 key={1}>
            Here will be a comp that allows editing of the character
					</h1>

				);

			})}

		</div>
	);
}

