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

    return Response.json(response)}
    catch(error){
        console.error('Error:', error);

        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
} 
