import prisma from "@/lib/prisma";

export async function GET(req, { params }){
    const snack_id = params.snackId;

    const snack_quiz = await prisma.snack_quiz.findMany({
        where: {
            snack_id: snack_id,
        },
    });

    for(var i = 0; i < snack_quiz.length; i++){
        const solutions = await prisma.solutions.findMany({
        where: {
                snack_quiz_id: snack_quiz[i].snack_quiz_id,
            },
        });

        

    };


}

