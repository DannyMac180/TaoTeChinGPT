import { useState } from 'react';
import axios from 'axios';

export default function TaoTeChing() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const result = await getTaoTeChingResponse(question);
    setResponse(result);
  };

  const getTaoTeChingResponse = async (question: string) => {
    // Call the OpenAI API here and return the response
    const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const prompt = `Answer the following question or statement in the style of Stephen Mitchell's translation of the Tao Te Ching, ${question}`;

    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        "model": "text-davinci-003",
        "prompt": prompt,
        "max_tokens": 100,
        "temperature": 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );

    const generatedText = response.data.choices[0].text.trim();
    return generatedText;

  };

  return (
    <div className="container">
      <h1>TaoTeChinGPT</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Ask a question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="input-field"
          />
        </label>
        <button type="submit">Ask</button>
      </form>
      {response && <div className="response">{response}</div>}
    </div>

  );
}