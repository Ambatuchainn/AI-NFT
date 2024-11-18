import './App.css';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState(''); // Add state to store the prompt
  const { data: count, call: refetchCount } = useQueryCall({
    functionName: 'get',
  });

  const { call: increment, loading } = useUpdateCall({
    functionName: 'inc',
    onSuccess: () => {
      refetchCount();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    increment(); // Call increment on form submit
  };

  return (
    <div className="App">
      <h1>AI-FINITY</h1>
      <h2>Generated Prompt Text AI Powered By ICP</h2>
      <form onSubmit={handleSubmit}>
        <div className="prompt">
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)} // Update prompt state
          />
          <label htmlFor="prompt">Enter the Prompt</label>
        </div>
        <div className="card">
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : `Count is ${count}`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
