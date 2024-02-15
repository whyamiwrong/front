const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function POST(request) {
    try {
    const session = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    // 모델 정의
    var prompt = '';
    prompt = `${session.code} \n 다음 코드에 대해 hint를 제공해줘. hint 내용에는 hint가 될 수 있는 함수나 code의 일부, 현재 내가 작성한 코드의 부족한 부분, 잘못된 부분, 진행 상황 등에 대해 전반적으로 feedback 해줘. 그러나 완전한 정답 코드를 제공해서는 안 돼. 코드에 대한 문제는 ${session.algorithm}.`
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // gemini가 생성한 코드 힌트 data 포함  
    console.log(text);

    return Response.json(text)}
    catch(error){
        console.error('Error:', error);

        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
} 

/**
 * @swagger
 * /hint:
 *   post:
 *     summary: 사용자의 코드에 대한 힌트를 반환합니다.
 *     tags: [Gemini]
 *     requestBody:
 *       description: 문제의 설명, 사용자의 코드
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             algorithm: 양의 정수 A와 B가 주어졌을 때, A - B의 결과를 출력하는 프로그램을 작성하세요.
 *             code: "#include <iostream>\\n using namespace std;\\n int main()\\n { cout << \"Hello, World!\"; \\nreturn 0; \\n}"
 *     responses:
 *       200:
 *         description: 성공적인 응답
 *         content:
 *           application/json:
 *             example:
 *               - text: "* `iostream` 헤더는 `std::cout`을 사용하려면 필요합니다.\n* `main` 함수는 `int` 형을 반환합니다.\n* 현재 코드는 `A`와 `B`를 입력받지 않습니다.\n* `A`와 `B`를 입력받으려면 `cin`을 사용해야 합니다.\n* `A`와 `B`를 빼서 결과를 출력하려면 연산자 `-`를 사용해야 합니다."
 *       500:
 *         description: Internal Server Error
 * 
 */