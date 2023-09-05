import { useState, useContext } from 'react';
import Loader from '../components/Loader';
import { UserContext } from '@/contexts/UserContext';
import { auth, googleProvider } from '@/lib/firebase';
import { incrementCredits, decrementCredits } from '@/lib/updateCredits';

export default function TaoTeChing() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const { user, credits } = useContext(UserContext);

  const getTaoTeChingResponse = async (question: string) => {
    const prompt = `You are the wise Taoist sage Lao Tzu. You respond to the question in the manner of the Tao Te Ching as translated by Stephen Mitchell. 
    Your response should communicate the following qualities: 1. Wise 2. Profound 3. Simple. The response should be in prose that is relevant to the question and not rhyming poetry.`;

    const messages = [
      { "role": "system", "content": prompt },
      { "role": "user", "content": question }
    ];

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        'model': 'gpt-4',
        'messages': messages,
        'stream': true
      }),
    });

    const reader = res.body?.getReader();
    if (!reader) {
      throw new Error('Response body is undefined');
    }
    const decoder = new TextDecoder('utf-8');

    let result = '';
    let data;

    while (!(data = await reader.read()).done) {
      const chunk = decoder.decode(data.value || new Uint8Array, {stream: !data.done});
      const lines = chunk.split('\n');

      for (let line of lines) {
        if (line.startsWith('data:')) {
          const message = JSON.parse(line.slice(5));
          if (message.choices) {
            result += message.choices[0].delta.content;
          }
        }
      }
    }

    setResponse(result);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    if (user && credits !== undefined && credits > 0) {
      getTaoTeChingResponse(question);
      setIsLoading(false);
      decrementCredits(user.uid, 1);
    } else {
      setIsLoading(false);
      console.log(user, credits);
      alert('You must be logged in and have credits to ask a question.');
    }
  };


  const handleLogin = () => {
    auth.signInWithPopup(googleProvider);
  }

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
          <button
            type={user ? "submit" : "button"}
            className="tao-button"
            onClick={user ? handleSubmit : handleLogin}
          >
            {user ? 'Ask' : 'Login'}
          </button>
        )}
      </form>
      {!isLoading && response && <div className="tao-response-container"><p className="tao-response">{response}</p></div>}
    </div >
  );
}

