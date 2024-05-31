const TaskReminderTemplate = (task) => {
  return `
    <div> hi ${task.user.username}, </div>
    <div> This is a reminder for your task titled: <b>${task.title}</b> due tomorrow. </div>
    <div> Regards, </div>
    <div> Task Manager Team </div>
    `;
};

module.exports = { TaskReminderTemplate };
