import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {

        const oxProblems = await prisma.ox_problems.findMany();
        const shortAnswerProblems = 
        await prisma.short_answer_problems.findMany();
        const MultipleChoicesProblems = 
        await prisma.multiple_choices_problems.findMany();

        const snackProblems = {
            oxProblems,
            shortAnswerProblems,
            MultipleChoicesProblems
        };

        return Response.json(snackProblems);
}