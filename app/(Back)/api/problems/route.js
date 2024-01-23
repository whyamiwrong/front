import prisma from "@/lib/prisma";

    export async function GET(request) {

            const problems = await prisma.problems.findMany({
                select: {
                    problem_id: true,
                    title: true,
                    algorithm_category: true,
                },
                orderBy: {
                    problem_id : 'asc',
                },
            })

            return Response.json(problems);
    }


/**
 * @swagger
 * /problems:
 *   get:
 *     summary: Problems 문제 리스트를 반환합니다
 *     tags : [Problems]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - problem_id: 1
 *                 title: "피보나치 수열"
 *                 algorithm_category: "다이나믹 프로그래밍"
 */
    /*
    -- problems 테이블에 데이터 삽입
    INSERT INTO problems (title, description, limitations, difficulty, created_at, time_limit, memory_limit, algorithm_category, views)
    VALUES ('피보나치 수열', '피보나치 수열의 n번째 항을 출력하는 프로그램을 작성하시오.
    단, 피보나치 수열의 0번째 항은 0, 1번째 항은 1로 정의한다.', 
    '입력되는 n은 45보다 작거나 같은 자연수이다.','medium', NOW(), 1.0, 128, '다이나믹 프로그래밍', 0);

    -- problems 테이블에 삽입한 데이터의 problem_id 가져오기
    SET @problemId = last_insert_id();

    -- original_problems 테이블에 데이터problems 삽입
    INSERT INTO original_problems (problem_id)
    VALUES (@problemId);

    -- examples 테이블에 데이터 삽입
    INSERT INTO examples (problem_id, input, output)
    VALUES (@problemId, '5', '5'),
        (@problemId, '9', '34');
        
    -- testcases 테이블에 데이터 삽입
    INSERT INTO testcases (problem_id, input, output)
    VALUES (@problemId, '1', '1'),
        (@problemId, '2', '1'),
        (@problemId, '3', '2'),
        (@problemId, '4', '3'),
        (@problemId, '5', '5'),
        (@problemId, '6', '8'),
        (@problemId, '7', '13'),
        (@problemId, '8', '21'),
        (@problemId, '9', '34'),
        (@problemId, '10', '55'),
        (@problemId, '20', '6765'),
        (@problemId, '30', '832040'),
        (@problemId, '40', '102334155'),
        (@problemId, '45', '1134903170');
    */