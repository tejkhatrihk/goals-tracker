import { useState } from 'react';

export default function GoalInput({ addGoal }) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    addGoal(input);
    setInput('');
  };

  return (
    <div className="mb-4">
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Enter goal"
        className="border p-1 mr-2"
      />
      <button onClick={handleAdd} className="bg-blue-500 text-white px-3 py-1">Add</button>
    </div>
  );
}
