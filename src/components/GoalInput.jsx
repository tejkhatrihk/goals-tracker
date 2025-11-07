import { useState } from 'react';
import { TextField, Button, MenuItem, Stack } from '@mui/material'
import { PRIORITIES, PRIORITY_LABELS } from '../constants/priorities';
export default function GoalInput({ addGoal }) {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueAt, setDueAt] = useState('');

  const handleAdd = () => {
    const value = input.trim();
    if (!value) return;
    addGoal({ text: value, priority, dueAt: dueAt || null });
    setInput('');
    setPriority('medium');
    setDueAt('');
  };

  return (
    <div className="mb-4 h-50">
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ m:2, alignItems:'flex-start' }}>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="Enter goal"
            variant="outlined"
          required        
          id="goal-text"
          label="Goal"
          size='small'
          sx={{ minWidth: 220 }}
        />
        <TextField
          select
          label="Priority"
          size="small"
          value={priority}
          onChange={(e)=>setPriority(e.target.value)}
          id="goal-priority"
          sx={{ minWidth: 140 }}
        >
          {PRIORITIES.map(p => (
            <MenuItem key={p} value={p}>{PRIORITY_LABELS[p]}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Due"
          type="date"
          size="small"
          value={dueAt}
          onChange={(e)=>setDueAt(e.target.value)}
          InputLabelProps={{ shrink: true }}
          id="goal-due"
        />
        <Button onClick={handleAdd}
          disabled={input.trim().length === 0}
          variant='contained' >Add</Button>
      </Stack>
    </div>
  );
}
