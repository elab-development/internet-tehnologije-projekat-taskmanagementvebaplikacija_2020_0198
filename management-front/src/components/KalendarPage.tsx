import React, { useState, useEffect } from 'react';
import { useGet } from '../hooks';
import { Task } from '../model';

export default function KalendarPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data: tasksData } = useGet<Task[]>('/api/tasks');
  
  // Ako je `tasksData` niz nizova zadataka
  useEffect(() => {
    if (tasksData && tasksData.length > 0) {
      const flattenedTasks: Task[] = tasksData.flatMap(taskArray => taskArray);
      setTasks(flattenedTasks);
    }
  }, [tasksData]);
  
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <div className="column active-column" style={{ backgroundColor: '#F4C2C2' }}>
            <h2 style={{ color: '#E15656' }}>All Tasks</h2>
            {tasks.map((task) => (
              <div key={task.id} className="task" style={{ backgroundColor: '#f0f0f0' }}>
                <p>Name: {task.name}</p>
                <p>Project Name: {getProjectName(task)}</p>
                <p>Start Date: {getStartDate(task)}</p>
                <p>End Date: {getEndDate(task)}</p>
                <p>User Name: {getUserName(task)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getProjectName(task: Task): string {
  return task.project?.name;
}

function getStartDate(task: Task): string {
  return task.project?.start_date;
}

function getEndDate(task: Task): string {
  return task.project?.end_date;
}

function getUserName(task: Task): string {
  return task?.user?.username;
}