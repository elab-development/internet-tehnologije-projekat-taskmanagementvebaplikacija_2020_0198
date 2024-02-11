import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context/UserContext'
import { Task } from '../model';
import { User } from '../model';
import { useGet } from '../hooks'

export default function Calendar() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useUserContext(); // Dobijamo trenutnog korisnika

   // Dobijamo zadatke sa servera
  const { data: tasksData } = useGet<Task>('/api/tasks');
  
  useEffect(() => {
    if (tasksData && tasksData.length > 0 && user ) {
      // Filtriramo zadatke samo za trenutnog korisnika
      const userTasks = tasksData.filter(task => task.user.username === user.username);
      setTasks(userTasks);
    }
  }, [tasksData, user]);
  
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <div className="column active-column" style={{ backgroundColor: '#F4C2C2' }}>
            <h2 style={{ color: '#E15656' }}>User's Tasks</h2>
            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="task" style={{ backgroundColor: '#f0f0f0' }}>
                    <td>{task.project?.name}</td>
                    <td>{task.project?.start_date}</td>
                    <td>{task.project?.end_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}