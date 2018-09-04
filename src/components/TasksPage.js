﻿import React, { Component } from 'react';
import TaskList from './TaskList';
const TASK_STATUSES = ['Unstarted', 'In Progress', 'Completed'];
class TasksPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNewCardForm: false,
            title: '',
            description: '',
        };
    }

    onTitleChange = (e) => {
        this.setState({ title: e.target.value });
    }

    onDescriptionChange = (e) => {
        this.setState({ description: e.target.value });
    }

    resetForm() {
        this.setState({
            showNewCardForm: false,
            title: '',
        });
    }

    onCreateTask = (e) => {
        e.preventDefault();
        this.props.onCreateTask({
            title: this.state.title,
            description: this.state.description,
        });
        this.resetForm();
    }

    toggleForm = () => {
        this.setState({ showNewCardForm: !this.state.showNewCardForm });
    }

    renderTaskLists() {
        const { appTasks } = this.props;
        return TASK_STATUSES.map(status => {
            const statusTasks = appTasks.filter(taskList => taskList.status === status);
            return (
                <TaskList
                    key={status}
                    listStatus={status}
                    listTasks={statusTasks}
                    onStatusChange={this.props.onStatusChange}
                />
            );
        });
    }
    render() {

        console.log("4 TASK PAGE", this.props.isLoading);
        if (this.props.isLoading) {
            console.log("LODING");
            return (
                <div className="tasks-loading">
                    Loading...AHHH
                </div>
            );
        }

        return (
            <div className="task-list">
                <div className="task-list-header">
                    <button
                        className="button button-default"
                        onClick={this.toggleForm}
                    >
                        + New Task
                    </button>
                </div>
                {this.state.showNewCardForm && (<form className="task-list-form" onSubmit={this.onCreateTask}>
                    <input className="full-width-input"
                        onChange={this.onTitleChange}
                        value={this.state.title}
                        type="text"
                        placeholder="title" />
                    <input className="full-width-input" onChange={this.onDescriptionChange}
                        value={this.state.description}
                        type="text"
                        placeholder="description"
                    />
                    <button className="button" type="submit">Save</button>
                </form>)}
                <div className="task-lists">
                    {this.renderTaskLists()}
                </div>
            </div>
        );
    }
}

export default TasksPage;