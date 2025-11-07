import { Cancel } from "@mui/icons-material";
import { List, ListItem, Checkbox, Typography, IconButton, Chip, Stack } from "@mui/material";
import { PRIORITY_COLORS, PRIORITY_LABELS } from '../constants/priorities';
import { isOverdue, isDueToday, isDueSoon } from '../utils/date';

export default function GoalList({ goals, toggleGoal, deleteGoal, showCheckboxes=true }) {
  return (
    <List>
      {goals.map((goal) => {
        const overdue = isOverdue(goal.dueAt) && !goal.completed;
        const dueToday = isDueToday(goal.dueAt) && !goal.completed;
        const dueSoon = isDueSoon(goal.dueAt) && !goal.completed;
        return (
          <ListItem key={goal.id} className="flex items-start mb-2" alignItems="flex-start">
            {showCheckboxes && (
              <Checkbox checked={goal.completed} onChange={() => toggleGoal(goal.id)} />
            )}
            <Stack spacing={0.5} sx={{ flexGrow:1 }}>
              <Typography
                className={`${goal.completed ? 'line-through' : ''}`}
                sx={{ wordBreak: 'break-word' }}
              >
                {goal.text}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label={PRIORITY_LABELS[goal.priority]} size="small" color={PRIORITY_COLORS[goal.priority]} variant={goal.completed?'outlined':'filled'} />
                {goal.dueAt && (
                  <Chip
                    label={goal.dueAt + (overdue ? ' (Overdue)' : dueToday ? ' (Today)' : dueSoon ? ' (Soon)' : '')}
                    size="small"
                    color={overdue ? 'error' : dueToday ? 'warning' : dueSoon ? 'info' : 'default'}
                    variant={goal.completed ? 'outlined' : 'filled'}
                  />
                )}
                {goal.completed && <Chip label="Done" size="small" color="success" variant="outlined" />}
              </Stack>
            </Stack>
            <IconButton aria-label="delete goal" onClick={() => deleteGoal(goal.id)} edge="end" sx={{ ml:1 }}>
              <Cancel sx={{ color: 'red' }} />
            </IconButton>
          </ListItem>
        )
      })}
    </List>
  );
}
