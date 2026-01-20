export const isToday = (dbDate) => {
  const today = new Date();
  const dateFromDb = new Date(dbDate);

  return (
    today.getFullYear() === dateFromDb.getFullYear() &&
    today.getMonth() === dateFromDb.getMonth() &&
    today.getDate() === dateFromDb.getDate()
  );
};

export const isNotPastDate = (selectedDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const appointmentDate = new Date(selectedDate);
  appointmentDate.setHours(0, 0, 0, 0);

  return appointmentDate >= today;
};

