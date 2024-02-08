import { useState, useEffect } from "react";
import styled from "styled-components";
import { useGet } from "../hooks"; // Pretpostavljamo da imate funkciju za dohvaćanje zadataka iz baze
import { Task } from "../model";
 
const CSS = styled.div`
  .container {
    margin-top: 20px;
  }
  .column-content {
    display: flex;
    justify-content: space-between;
  }
  .column {
    flex: 1;
    margin: 0 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f9fa;
  }
  .task {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
  }
  .task p {
    margin: 0;
  }
  .active-column {
    background-color: #F4C2C2; /* Jedna boja za active kolonu */
  }
  .finished-column {
    background-color: #C2DBF4; /* Jedna boja za finished kolonu */
  }
  .task:nth-child(odd) {
    background-color: #f0f0f0; /* Svaki drugi red drugačije svijetle boje */
  }
`;


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
        <CSS className="container mt-4">
          <div className="row">
            <div className="col">
              <div className="column active-column">
                <h2 style={{ color: '#E15656' }}>Active</h2>
                {activeTasks.map((task) => (
                  <div key={task.id} className="task">
                    <p>Name: {task.name}</p>
                    <p>Project Name: {task.project.name}</p>
                    <p>User Name: {task.user.username}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col">
              <div className="column finished-column">
                <h2 style={{ color: '#45b3e7' }}>Finished</h2>
                {finishedTasks.map((task) => (
                  <div key={task.id} className="task">
                    <p>{task.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CSS>
      );
    
}
