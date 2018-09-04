import React, { Component } from 'react';
import { connect } from 'react-redux';
import TasksPage from './components/TasksPage';
import { createTask, editTask, fetchTasks } from './actions';
import FlashMessage from './components/FlashMessage';

class App extends Component {
    componentDidMount() {
        console.log("APP PAGE MOUNT, CALL FETCH TASK FROM ACTION PAGE");
        this.props.dispatch(fetchTasks());
    }


    onCreateTask = ({ title, description }) => {
        this.props.dispatch(createTask({ title, description }));
    }

    onStatusChange = (id, status) => {
        this.props.dispatch(editTask(id, { status }));
    }

    render() {
        console.log("APP PAGE RENDER", this.props.error);

        return (
            <div className="container">
                {this.props.error && <FlashMessage message={this.props.error} />}

                <div className="main-content">
                    <TasksPage appTasks={this.props.myTasks} onCreateTask={this.onCreateTask} onStatusChange={this.onStatusChange} isLoading={this.props.isLoading} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(myState) {

    const { myTasks, isLoading, error } = myState;
    console.log("3 APP PAGE - MYSTATE:", myState);
    return {
        myTasks,
        isLoading,
        error,
        /*
                tasks: myState.myTasks,
                isLoading: myState.isLoading,
                error: myState.error,
                */

    };

}

export default connect(mapStateToProps)(App);
