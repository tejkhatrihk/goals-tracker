import { useState } from 'react';
import { TextField, Button, List, ListItem, Typography, Container, Box, Input } from '@mui/material'
import { InputOutlined } from '@mui/icons-material';
export default function GoalInput({ addGoal }) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    addGoal(input);
    setInput('');
  };

  return (
    <div className="mb-4 h-50">
      <TextField
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Enter goal"
        className="border p-1 mr-2"
        variant="outlined"
        required        
        id="outlined-basic"
        label="Goal"
        size='small'
        sx={{ m:4}}
      />
      <Button onClick={handleAdd} 
        className="bg-blue-500 text-white px-3 py-1" 
        variant='contained' sx={{ mt:4}} >Add</Button>
    </div>
  );
}
