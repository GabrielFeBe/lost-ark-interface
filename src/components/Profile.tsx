'use client';
import api from '@/utils/api';
import Link from 'next/link';
import React from 'react';
import Cookies from 'js-cookie';

interface Props { 
  id: number;
}
export default function Profile({ id } : Props) {
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) { 
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData);
		const formatingObj = {...data , pointsCap: Number(data.pointsCap)};
		await api.patch(`/user/${id}`, formatingObj);
		Cookies.remove('token');
		window.location.reload();
	}
	return (
		<>
			<h1>Edit your points cap here</h1>
			<form action="" onSubmit={handleSubmit} className='flex gap-[5px]'>
				<label htmlFor="">
      PointsCap
					<input type="number"  name='pointsCap'
						className='text-black'
					/>
				</label>
				<button
					className={'ml-1 bg-white text-black  rounded-md text-[18px leading-5] w-[40px] text-center hover:bg-slate-200 transition-all duration-1000'}
				>Edit</button>
			</form>
			<Link href="/dashboard"
				className='hover:text-gray-300 transition-all duration-300'
			> Dashboard</Link>

		</>
	);
}
