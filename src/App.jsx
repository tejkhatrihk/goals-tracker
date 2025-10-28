import { useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage';
import GoalInput from './components/GoalInput';
import GoalList from './components/GoalList';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
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
      <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Daily Goals Tracker</h1>
      <GoalInput addGoal={addGoal} />
      <GoalList goals={goals} toggleGoal={toggleGoal} deleteGoal={deleteGoal} />
    </div>
    </>
  )
}

export default App
