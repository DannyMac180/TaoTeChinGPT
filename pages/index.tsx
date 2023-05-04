import { useState } from 'react';
import axios from 'axios';

export default function TaoTeChing() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [apiKey, setApiKey] = useState<string | undefined>(
    process.env.NEXT_PUBLIC_OPENAI_API_KEY
  );

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (apiKey) {
      const result = await getTaoTeChingResponse(question, apiKey);
      setResponse(result);
    }
  };

  const getTaoTeChingResponse = async (question: string, apiKey: string) => {
    // Call the OpenAI API here and return the response
    const prompt = `Answer the following question or statement in the style of Stephen Mitchell's translation of the Tao Te Ching, ${question}`;

    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const generatedText = response.data.choices[0].text.trim();
    return generatedText;
  };

  return (
    <div className="tao-container">
      <div style={{ textAlign: "center" }}>
        <img src="https://res.cloudinary.com/dmcmhshoe/image/upload/v1682979603/0_Taoist_philosopher_natural_landscape_profile_hi_esrgan-v1-x2plus_1_m5qfxj.png" alt="taoist_philosophy" style={{ width: "100%", height: "25%" }} />
      </div>
      <h1 className="tao-title">Tao Te ChinGPT</h1>
      <form onSubmit={handleSubmit} className="tao-form">
        <label className="tao-label">
          Ask a question to the Tao Te Ching:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="tao-input"
          />
        </label>
        <button type="submit" className="tao-button">Ask</button>
      </form>
      {response && <div className="tao-response-container"><p className="tao-response">{response}</p></div>}
    </div>
  );
}