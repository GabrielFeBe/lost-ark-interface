import React from 'react';
import { getUser } from '@/utils/auth';
import IChar from '@/types/IChar';
import EditOrShowChar from './EditOrShowChar';
import AddNewCharacter from './AddNewCharacter';


export default async function Dashboard() {
	const user = getUser();
	if(!user) return null;
	const dashboardData = await fetch(`http://localhost:3000/api/char/${user.id}`);
	const data = await dashboardData.json();
	const characters = data.char || [];
	return (
		<div>
			<AddNewCharacter user={user} />
			{ characters.map((character: IChar) => {
				return ( 
					<EditOrShowChar char={character} key={character.id}/>
				);
			})}
		</div>
	);
}

