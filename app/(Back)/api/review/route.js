
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
  prompt = `${session.code} \n 다음 코드에 대해 리뷰를 작성해줘. 리뷰 내용에는 코드의 Time Complexity, Space Complexity 등 효율성을 고려해줘. 내 코드의 장점, 단점 등을 논리 있게 정리해줘. 마지막에는 수정된 코드도 반드시 제공해줘. 알고리즘 종류는 ${session.algorithm} 이야. `
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

    console.log();
    console.log(text);
    // POST 함수 호출

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
 * /review:
 *   post:
 *     summary: 사용자의 코드에 대한 리뷰를 반환합니다.
 *     tags: [Gemini]
 *     requestBody:
 *       description: 문제의 설명, 사용자의 코드
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             algorithm: 양의 정수 A와 B가 주어졌을 때, A - B의 결과를 출력하는 프로그램을 작성하세요.
 *             code: "#include <iostream>\\nusing namespace std;\\n\\nint a, b;\\n\\nint main() {\\n cin >> a >> b;\\n\\n cout << a - b;\\n return 0;\\n}"
 *     responses:
 *       200:
 *         description: 성공적인 응답
 *         content:
 *           application/json:
 *             example:
 *               - text: "**리뷰**\n\n**효율성**\n\n* **Time Complexity:** O(1)\n    * 입력을 받고 연산을 수행하는 데 상수 시간이 걸립니다.\n* **Space Complexity:** O(1)\n    * 입력 값과 출력 값을 저장하는 데 상수 공간이 필요합니다.\n\n**장점**\n\n* **간결함:** 코드가 매우 간결하고 이해하기 쉽습니다.\n* **정확성:** 알고리즘은 문제 요구 사항을 정확하게 구현합니다.\n* **효율성:** 코드는 Time 및 Space Complexity 측면에서 효율적입니다.\n\n**단점**\n\n* **입력 검증 부족:** 코드에서는 입력 값의 유효성을 검증하지 않습니다. 예를 들어, 사용자가 음수 또는 유효하지 않은 값을 입력할 수 있습니다.\n* **오류 처리 부족:** 코드에서는 입력이나 계산 중 발생할 수 있는 오류를 처리하지 않습니다.\n\n**개선 방법**\n\n* **입력 검증 추가:** 사용자 입력을 검증하여 음수 또는 유효하지 않은 값을 처리합니다.\n* **오류 처리 추가:** 입력이나 계산 중 발생할 수 있는 오류를 처리합니다.\n* **주석 추가:** 코드의 목적과 구현을 설명하는 주석을 추가하여 코드의 가독성을 향상시킵니다.\n\n**수정된 코드 (입력 검증 및 오류 처리 추가):**\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n\n    // 입력 검증\n    while (true) {\n        cout << \"두 정수 A와 B를 입력하세요 (공백으로 구분): \";\n        cin >> a >> b;\n\n        if (a >= 0 && b >= 0) {\n            break;\n        } else {\n            cout << \"유효하지 않은 입력입니다. 음수는 입력할 수 없습니다.\\n\";\n        }\n    }\n\n    // 계산\n    int result = a - b;\n\n    // 출력\n    cout << \"결과: \" << result << endl;\n\n    return 0;\n}\n```"
 *       500:
 *         description: Internal Server Error
 * 
 */
