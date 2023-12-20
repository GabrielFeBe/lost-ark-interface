import { type SignOptions } from 'jsonwebtoken';

export const opcoes: SignOptions = {
	algorithm: 'HS256', // algoritmo de assinatura
	expiresIn: '24h' // tempo de expiração do token
};

export const chaveSecreta = process.env.CHAVE_SECRETA || 'suaChaveSecreta';
