export function isOverdue(dueAt) {
  if (!dueAt) return false
  const today = new Date()
  const due = new Date(dueAt + 'T00:00:00')
  return today.setHours(0,0,0,0) > due.getTime()
}

export function isDueToday(dueAt) {
  if (!dueAt) return false
  const today = new Date().toISOString().slice(0,10)
  return today === dueAt
}

export function isDueSoon(dueAt) {
  if (!dueAt) return false
  const today = new Date()
  const due = new Date(dueAt + 'T00:00:00')
  const diffDays = (due - today.setHours(0,0,0,0)) / (1000*60*60*24)
  return diffDays > 0 && diffDays <= 3 // within next 3 days
}
