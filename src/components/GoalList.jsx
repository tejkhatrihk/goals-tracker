export default function GoalList({ goals, toggleGoal, deleteGoal }) {
  return (
    <ul>
      {goals.map((goal, index) => (
        <li key={index} className="flex items-center mb-2">
          <input type="checkbox" checked={goal.completed} onChange={() => toggleGoal(index)} />
          <span className={`ml-2 ${goal.completed ? 'line-through' : ''}`}>{goal.text}</span>
          <button onClick={() => deleteGoal(index)} className="ml-auto text-red-500">x</button>
        </li>
      ))}
    </ul>
  );
}
