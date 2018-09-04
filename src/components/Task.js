import React from 'react';

const TASK_STATUSES = ['Unstarted', 'In Progress', 'Completed']

const Task = props => {

    console.log("TASKXXXX");

    return (
        <div className="task" style={divStyle}>
            <div className="taskID">{props.tasker.id}</div>
            <div className="task-header">
                <div>Title: {props.tasker.title}</div>
                <select value={props.tasker.status} onChange={onStatusChange}>{TASK_STATUSES.map(status => (<option key={status} value={status}>{status}</option>
                ))}
                </select>
            </div>
            <hr />
            <div className="task-body">Desc: {props.tasker.description}</div>
        </div>
    );

    function onStatusChange(e) {
        props.onStatusChange(props.tasker.id, e.target.value);
    }
}

const divStyle = {
    margin: '40px',
    padding: '10px',
    border: '5px solid pink'
};

export default Task;