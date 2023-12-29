import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
	// Customize connection pool settings
	errorFormat: 'pretty', // This is just an example; adjust according to your needs

});

export default prisma;
