import React from 'react';
import { getUser } from '@/utils/auth';
import IChar from '@/types/IChar';
import EditOrShowChar from './EditOrShowChar';
import AddNewCharacter from './AddNewCharacter';
import api from '@/utils/api';

interface data  {
	data : {
		char: IChar[]
		message:string
	}
}

export default async function Dashboard() {
	const user = getUser();
	if(!user) return null;
	const data: data = await api.get(`/char/${user.id}`);
	
	const characters = data.data.char || [];
	return (
		<div className='min-h-screen w-full flex flex-col justify-center items-center gap-[20px]'>
			<section className='h-[50px] w-full transition-all duration-1000'>

				<AddNewCharacter user={user} />
			</section>
			{ characters.map((character: IChar) => {
				return ( 
					<EditOrShowChar char={character} key={character.id} user={user}/>
				);
			})}
		</div>
	);
}

