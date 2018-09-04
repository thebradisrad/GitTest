import React from 'react';
import Task from './Task';
const TaskList = props => {
    console.log("5 LIST PAGE");

    return (
        <div className="tasklist">
            <div className="tasklisttitle">
                <strong>{props.listStatus}</strong>
            </div>
            {props.listTasks.map(task => (
                <Task key={task.id} tasker={task} onStatusChange={props.onStatusChange} />
            ))}
        </div>
    );
}
export default TaskList;