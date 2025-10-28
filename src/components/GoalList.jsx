import { Cancel } from "@mui/icons-material";
import { List, ListItem, Checkbox, Typography } from "@mui/material";

export default function GoalList({ goals, toggleGoal, deleteGoal, showCheckboxes=true }) {
  return (
    <List>
      {goals.map((goal, index) => (
        <ListItem key={index} className="flex items-center mb-2">
          {showCheckboxes && (
            <Checkbox  checked={goal.completed} onChange={() => toggleGoal(index)} />
          )}
          <Typography className={`ml-2 ${goal.completed ? 'line-through' : ''}`}>{goal.text}</Typography>
          <Cancel onClick={() => deleteGoal(index)} sx={{ ml: 'auto', color: 'red' }} />
        </ListItem>
      ))}
    </List>
  );
}
