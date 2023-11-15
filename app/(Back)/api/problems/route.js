/*
// test code
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const testProblem = {
        id: 1,
        title: 'Test Problem',
        description: 'This is a test problem for demonstration purposes.',
    };

    return new Response(JSON.stringify([testProblem]), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
*/


import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(){
    const problems = await prisma.problems.findMany();

    return Response.json(problems);
}