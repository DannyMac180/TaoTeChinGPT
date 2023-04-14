// components/ApiKeyPrompt.tsx

import { useState, useEffect, FormEvent } from 'react';

interface ApiKeyPromptProps {
  onApiKeySubmit: (apiKey: string | undefined) => void;
}

const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/storeApiKey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      if (response.ok) {
        if (onApiKeySubmit) {
          onApiKeySubmit(apiKey);
        }
      } else {
        console.error('Failed to store API key');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Enter OpenAI API Key</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ApiKeyPrompt;
