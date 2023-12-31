'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { isProduction } from '@/utils/api';

export default function Login () {
	const [loginError, setLoginError] = useState(false);
	const router = useRouter();
	const loginUrl = isProduction ? 'https://lainterface.vercel.app/api/login' : 'http://localhost:3000/api/login';
	async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData);
		console.log(data);
		const res = await fetch(loginUrl, {
			method:'POST',
			headers: {
				'Content-Type': 'application/json'
				// Adicione outros cabeçalhos conforme necessário
			},
			body: JSON.stringify(data)
		});
		if(res.status !== 200) {
			setLoginError(true);
			return;
		}
		const json = await res.json();
		console.log(json);
		Cookies.set('token', json.token, {expires: json.cookiesExpiresInDays});
		router.push(json.redirectUrl);
		
	}
	if(loginError) {
		// for now i'll do this, but i'll make a better error handling system later
		return null;
	}

	return (
		<form action=""
			onSubmit={handleSubmit}
			className='border-white border-[1px] flex flex-col p-2 w-[600px] h-[500px] m-auto justify-around items-center rounded-xl'
		>
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
			<button className='bg-white text-black p-2 rounded-md text-[18px leading-5] w-[200px] h-[45px] text-center hover:bg-slate-200 transition-all duration-300'>Login</button>
			<Link href={'/register'} className='bg-white text-black p-2 rounded-md text-[18px leading-5] w-[200px] h-[45px] text-center hover:bg-slate-200 transition-all duration-300'>Register</Link>
		</form>
	);
}
