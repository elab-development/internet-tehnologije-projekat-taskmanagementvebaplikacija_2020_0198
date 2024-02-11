import { useState, useEffect } from "react";
import { useGet } from "../hooks"; // Pretpostavljamo da imate funkciju za dohvaćanje zadataka iz baze
import { Task } from "../model";
import './styleKanban.css';
 

export default function KanbanBoardPage() {
    const [activeTasks, setActiveTasks] = useState<Task[]>([]);
    const [finishedTasks, setFinishedTasks] = useState<Task[]>([]);
    const { data: tasks } = useGet<Task>('/api/tasks');
    
    useEffect(() => {
        if (tasks) {
          const active = tasks.filter(task => Number(task.status) === 0  );
          const finished = tasks.filter(task => Number(task.status) === 1  );
          setActiveTasks(active);
          setFinishedTasks(finished);
        }
      }, [tasks]);

      return (
        <div className="container mt-4">
          <div className="row">
            <div className="col">
              <div className="column active-column" style={{ backgroundColor: '#F4C2C2' }}>
                <h2 style={{ color: '#E15656' }}>Active</h2>
                {activeTasks.map((task) => (
                  <div key={task.id} className="task" style={{ backgroundColor: '#f0f0f0' }}>
                    <p>Name: {task.name}</p>
                    <p>Project Name: {task.project?.name}</p>
                    <p>User Name: {task.user.username}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col">
              <div className="column finished-column" style={{ backgroundColor: '#C2DBF4' }}>
                <h2 style={{ color: '#45b3e7' }}>Finished</h2>
                {finishedTasks.map((task) => (
                  <div key={task.id} className="task" style={{ backgroundColor: '#f0f0f0' }}>
                    <p>{task.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
}
