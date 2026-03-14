const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testApiKey() {
  const genAI = new GoogleGenerativeAI('AIzaSyDhG-t2SvIEFfbyGgEPCAAMAnvvlDZZ1FQ');  
  const modelsToTry = ['gemini-3-flash', 'gemini-2.5-flash', 'gemini-1.5-flash'];
  
  for (const modelName of modelsToTry) {
    try {
      console.log(`\nTrying model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Say 'API works'");
      console.log(`SUCCESS with ${modelName}! Output:`, result.response.text());
      return;
    } catch (err) {
      console.error(`FAILED with ${modelName}. Reason: ${err.message}`);
    }
  }
  
  console.log('\nAll models failed. This is when the hardcoded fallback triggers.');
}

testApiKey();
