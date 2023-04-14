import { useState } from 'react';
import axios from 'axios';
import ApiKeyPrompt from '../components/ApiKeyPrompt';
import AuthForm from '../components/AuthForm';

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
    <div className="container">
      <h1>TaoTeChinGPT</h1>
      {!apiKey && <ApiKeyPrompt onApiKeySubmit={setApiKey} />}
      <AuthForm />
      <form onSubmit={handleSubmit} className="form">
        <label>
          Ask a question to the Tao Te Ching:
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