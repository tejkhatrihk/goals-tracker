import { useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage';
import GoalInput from './components/GoalInput';
import GoalList from './components/GoalList';
import './App.css'
import { Typography, Box } from '@mui/material';
import Layout from './components/Layout'

function App() {
  const [goals, setGoals] = useLocalStorage('dailyGoals', []);

  const addGoal = (goal) => {
    if (!goal) return;
    setGoals([...goals, { text: goal, completed: false }]);
  };

  const toggleGoal = (index) => {
    const newGoals = [...goals];
    newGoals[index].completed = !newGoals[index].completed;
    setGoals(newGoals);
  };

  const deleteGoal = (index) => {
    const newGoals = goals.filter((_, i) => i !== index);
    setGoals(newGoals);
  };

  return (
    <>
    <Layout>
    <Box sx={{ m: 4, p: 4, border: '1px solid #ccc', borderRadius: 2, boxShadow: 3 }}>
      <div className="App container mx-auto p-4">
      <Typography gutterBottom variant="h5" component="div">
            Add Goals
          </Typography>
      <GoalInput addGoal={addGoal} />
      
    </div>
    </Box>
    {
    goals.length > 0 && 
    <Box sx={{ m: 4, p: 4, border: '1px solid #ccc', borderRadius: 2, boxShadow: 3, mb: 10 }}>
      <div className="container mx-auto p-4">      
      <GoalList goals={goals} toggleGoal={toggleGoal} deleteGoal={deleteGoal} />
    </div>
    </Box>
    }
    </Layout>
    </>
  )
}

export default App
