'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';

export default function RegisterUser() {
	const router = useRouter();
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) { 
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData);
		const formatingObj = {...data , pointsCap: Number(data.pointsCap)};
		const res = await api.post('/user', formatingObj);
		router.push('/login');
		console.log(res);
	}
	return (
		<form action="" 
			onSubmit={handleSubmit}
			className='border-white border-[1px] flex flex-col p-2 w-[600px] h-[600px] m-auto justify-around items-center rounded-xl'>
			<h1>Register</h1>
			<label htmlFor="">
      Email
				<input type="email" name="email" id="" 
					className='text-black'
				/>
			</label>
			<label htmlFor="">
      Password
				<input type="password" name='password'
					className='text-black'
				/>
			</label>
			<label htmlFor="">
      PointsCap
				<input type="number"  name='pointsCap'
					className='text-black'
				/>
			</label>
			<label htmlFor="">
     Discord ID
				<input type="text" name='discordId'  
					className='text-black'
				/>
			</label>
			<button className='bg-white text-black p-2 rounded-md text-[18px leading-5] w-[200px] h-[45px] text-center hover:bg-slate-200 transition-all duration-300'>Register</button>
		</form>
	);
}
