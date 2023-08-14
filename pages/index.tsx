import { useState, useContext } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { UserContext } from '@/contexts/UserContext';
import { auth, googleProvider } from '@/lib/firebase';

export default function TaoTeChing() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, credits } = useContext(UserContext);
  const [apiKey, setApiKey] = useState<string | undefined>(
    process.env.NEXT_PUBLIC_OPENAI_API_KEY
  );
  const signIn = () => {
    auth.signInWithPopup(googleProvider);
  }

  const decrementCredits = async (uid: string) => {
    try {
      const response = await axios.post('/api/decrementCredits', { uid });
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const getTaoTeChingResponse = async (question: string, apiKey: string) => {
    const prompt = `You are the wise Taoist sage Lao Tzu. You respond to the question in the manner of the Tao Te Ching as translated by Stephen Mitchell. 
    Your response should communicate the following qualities: 1. Wise 2. Profound 3. Simple. The response should be in prose that is relevant to the question and not rhyming poetry.`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ "role": "system", "content": prompt },
        { "role": "user", "content": question }]
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    if (apiKey) {
      const result = await getTaoTeChingResponse(question, apiKey);
      setResponse(result);
      setIsLoading(false);
      if (user) {
        decrementCredits(user.uid);
      }
    }
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
        {user ? (
          <button type="submit" className="tao-button">Ask</button>
        ) : (
          <button className="tao-button" onClick={signIn}>Log in</button>
        )}
        {isLoading ? (
          <Loader show={true} />
        ) : (
          <button type="submit" className="tao-button">Ask</button>
        )}
      </form>
      {!isLoading && response && <div className="tao-response-container"><p className="tao-response">{response}</p></div>}
    </div >
  );
}
