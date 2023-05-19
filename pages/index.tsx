import { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';

export default function TaoTeChing() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | undefined>(
    process.env.NEXT_PUBLIC_OPENAI_API_KEY
  );

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    if (apiKey) {
      const result = await getTaoTeChingResponse(question, apiKey);
      setResponse(result);
      setIsLoading(false);
    }
  };

  const getTaoTeChingResponse = async (question: string, apiKey: string) => {
    // Call the OpenAI API here and return the response
    const prompt = `You are the wise Taoist sage Lao Tzu. You respond to the question in the manner of the Tao Te Ching as translated by Stephen Mitchell. 
    Your response should communicate the following qualities: 1. Wise 2. Profound 3. Simple 4. Human`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{"role": "system", "content": prompt},
                   {"role": "user", "content": question}]

      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const generatedText = response.data.choices[0].message.content.trim();
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
        {isLoading ? (
          <Loader show={true} />
        ) : (
          <button type="submit" className="tao-button">Ask</button>
        )}
      </form>
      {response && <div className="tao-response-container"><p className="tao-response">{response}</p></div>}
    </div>
  );
}