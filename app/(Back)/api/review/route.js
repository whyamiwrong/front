
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function POST(request) {
  try {
  const session = await request.json();
  const generationConfig = {
    temperature: 0.9,
  };
  
  const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });
  // 모델 정의
  var prompt = '';
  prompt = `${session.code} \n 다음 코드에 대해 리뷰를 작성해줘. 리뷰 내용에는 코드의 Time Complexity, Space Complexity 등 효율성을 고려해줘. 내 코드의 장점, 단점 등을 논리 있게 정리해줘. 단점이 있는 경우에는 어떤 식으로 고쳐야 하는 지에 대한 advice도 같이 제공해줘. 알고리즘 종류는 ${session.algorithm} 이야. `
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

    console.log();
    console.log(text);
    // POST 함수 호출

    return Response.json(response)}

    catch(error){
        console.error('Error:', error);

        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
} 
