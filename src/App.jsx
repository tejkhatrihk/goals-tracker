import { useState, useMemo } from 'react'
import useLocalStorage from './hooks/useLocalStorage';
import GoalInput from './components/GoalInput';
import GoalList from './components/GoalList';
import './App.css'
import { Typography, Box, Stack, Button, Chip } from '@mui/material';
import Layout from './components/Layout'
import { PRIORITY_WEIGHT } from './constants/priorities';
import { isOverdue, isDueToday, isDueSoon } from './utils/date';

function App() {
  const [goals, setGoals] = useLocalStorage('dailyGoals', []);
  const [filter, setFilter] = useState('all'); // all | active | completed | overdue | dueSoon | today
  const [sort, setSort] = useState('default'); // default | priority | due | created

  const addGoal = (goal) => {
    if (!goal || !goal.text) return;
    const newGoal = {
      id: crypto.randomUUID(),
      text: goal.text,
      completed: false,
      priority: goal.priority || 'medium',
      dueAt: goal.dueAt || null,
      createdAt: new Date().toISOString().slice(0,10),
    };
    setGoals([...goals, newGoal]);
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const clearCompleted = () => {
    setGoals(goals.filter(g => !g.completed));
  };

  // Migration: ensure older goals get ids & fields
  const migratedGoals = useMemo(() => {
    let changed = false;
    const mg = goals.map(g => {
      if (g.id && g.priority && 'createdAt' in g) return g;
      changed = true;
      return {
        id: g.id || crypto.randomUUID(),
        text: g.text,
        completed: !!g.completed,
        priority: g.priority || 'medium',
        dueAt: g.dueAt || null,
        createdAt: g.createdAt || new Date().toISOString().slice(0,10),
      };
    });
    if (changed) setGoals(mg);
    return mg;
  }, [goals]);

  const filtered = useMemo(() => {
    return migratedGoals.filter(g => {
      switch (filter) {
        case 'active': return !g.completed;
        case 'completed': return g.completed;
        case 'overdue': return isOverdue(g.dueAt) && !g.completed;
        case 'dueSoon': return isDueSoon(g.dueAt) && !g.completed;
        case 'today': return isDueToday(g.dueAt);
        default: return true;
      }
    });
  }, [migratedGoals, filter]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case 'priority':
        return arr.sort((a,b) => PRIORITY_WEIGHT[b.priority]-PRIORITY_WEIGHT[a.priority]);
      case 'due':
        return arr.sort((a,b) => {
          if (!a.dueAt && !b.dueAt) return 0;
          if (!a.dueAt) return 1;
          if (!b.dueAt) return -1;
          return a.dueAt.localeCompare(b.dueAt);
        });
      case 'created':
        return arr.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
      default:
        return arr;
    }
  }, [filtered, sort]);

  const completedCount = migratedGoals.filter(g => g.completed).length;

  return (
    <>
    <Layout>
    <Box sx={{ m: 4, p: 4, border: '1px solid #ccc', borderRadius: 2, boxShadow: 3 }}>
      <div className="App container mx-auto p-4">
      <Typography gutterBottom variant="h5" component="div">Add Goal</Typography>
      <GoalInput addGoal={addGoal} />
      <Stack direction="row" spacing={1} sx={{ m:2, flexWrap:'wrap' }}>
        <Button size="small" variant={filter==='all'?'contained':'outlined'} onClick={()=>setFilter('all')}>All</Button>
        <Button size="small" variant={filter==='active'?'contained':'outlined'} onClick={()=>setFilter('active')}>Active</Button>
        <Button size="small" variant={filter==='completed'?'contained':'outlined'} onClick={()=>setFilter('completed')}>Completed</Button>
        <Button size="small" variant={filter==='overdue'?'contained':'outlined'} onClick={()=>setFilter('overdue')}>Overdue</Button>
        <Button size="small" variant={filter==='dueSoon'?'contained':'outlined'} onClick={()=>setFilter('dueSoon')}>Due Soon</Button>
        <Button size="small" variant={filter==='today'?'contained':'outlined'} onClick={()=>setFilter('today')}>Today</Button>
        <Button size="small" color="warning" onClick={clearCompleted} disabled={completedCount===0}>Clear Completed</Button>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ m:2 }}>
        <Typography variant="body2" sx={{ alignSelf:'center' }}>Sort:</Typography>
        <Button size="small" variant={sort==='default'?'contained':'outlined'} onClick={()=>setSort('default')}>Default</Button>
        <Button size="small" variant={sort==='priority'?'contained':'outlined'} onClick={()=>setSort('priority')}>Priority</Button>
        <Button size="small" variant={sort==='due'?'contained':'outlined'} onClick={()=>setSort('due')}>Due Date</Button>
        <Button size="small" variant={sort==='created'?'contained':'outlined'} onClick={()=>setSort('created')}>Created</Button>
      </Stack>
      <Chip label={`Completed: ${completedCount} / ${migratedGoals.length}`} color="success" variant="outlined" />
      
    </div>
    </Box>
    {sorted.length > 0 && (
      <Box sx={{ m: 4, p: 4, border: '1px solid #ccc', borderRadius: 2, boxShadow: 3, mb: 10 }}>
        <div className="container mx-auto p-4">
          <GoalList goals={sorted} toggleGoal={toggleGoal} deleteGoal={deleteGoal} />
        </div>
      </Box>
    )}
    </Layout>
    </>
  )
}

export default App
