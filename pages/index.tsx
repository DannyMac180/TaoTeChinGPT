import { useState, useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { auth, googleProvider } from '@/lib/firebase';
import { incrementCredits, decrementCredits } from '@/lib/updateCredits';

export default function TaoTeChing() {
  const [question, setQuestion] = useState('');
  const [responseData, setResponseData] = useState('');

  const { user, credits } = useContext(UserContext);

  const getTaoTeChingResponse = async (question: string) => {
    console.log('Getting response');
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

    const processStream = async () => {
      console.log('Processing stream');
      let accumulatedData = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('Streaming completed');
          break;
        }
        const chunk = new TextDecoder().decode(value);
        accumulatedData += chunk;
        const chunks = accumulatedData.split('\n');
        accumulatedData = chunks.pop() || ''; // Save any incomplete chunk for the next iteration
        for (const chunk of chunks) {
          if (chunk === '[DONE]') {
            console.log('Streaming done');
            // Handle completion of the streaming response
          } else {
            const potentialJson = chunk.substring(5);
            try {
              const data = JSON.parse(potentialJson); // Remove the "data: " prefix
              setResponseData(prevData => prevData + data.choices[0].delta.content);
              console.log(responseData);
            } catch (e) {
              console.error('Invalid JSON:', potentialJson);
            }
          }
        }
        await processStream();
      }
    };
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (user && credits !== undefined && credits > 0) {
      getTaoTeChingResponse(question);
      decrementCredits(user.uid, 1);
    } else {
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
        <button
          type={user ? "submit" : "button"}
          className="tao-button"
          onClick={user ? handleSubmit : handleLogin}
        >
          {user ? 'Ask' : 'Login'}
        </button>
      </form>
      {responseData && <div className="tao-response-container"><p className="tao-response">{responseData}</p></div>}
    </div >
  );
};

