import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export interface User {
  id: number
  email: string
  discordId: string
  pointsCap: number
}
export function getUser() {
	const token = cookies().get('token')?.value;
	if (!token) {
		throw new Error('Unaunthenticated');
	}
	const user: User = jwt.decode(token) as User;

	return user;
}
