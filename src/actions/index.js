
import * as api from '../api';

export function fetchTasks() {
    return dispatch => {
        console.log("6 ACTIONS PAGE - DISPATCHING TO FETCH TO REDUCER");
        dispatch(fetchTasksStarted());
        api.fetchTasks().then(resp => {
            console.log("ACTION PAGE API FETCH DATA:", resp.data);
            /*
            setTimeout(() => {
                console.log("ACTION PAGE - DISPATCH SUCCESS TO REDUCER");
                dispatch(fetchTasksSucceeded(resp.data));
            }, 2000);*/

            throw new Error('Oh noes! Unable to fetch tasks!');
        }).catch(err => {
            dispatch(fetchTasksFailed(err.message));

        });
    }
}


export function createTask({ title, description, status = 'Unstarted' }) {
    console.log("CREATING TASK...");
    return dispatch => {
        api.createTask({ title, description, status }).then(resp => {
            console.log("CREATE IT...");
            dispatch(createTaskSucceeded(resp.data));
        });
    };
}

export function editTask(id, params = {}) {

    return (dispatch, getState) => {

        console.log("Test:", getState());

        //console.log("ALL INFO", getState().tasks);
        const task = getTaskById(getState().myTasks, id);
        const updatedTask = Object.assign({}, task, params);

        api.editTask(id, updatedTask).then(resp => {
            dispatch(editTaskSucceeded(resp.data));
        });


    };
}

function fetchTasksFailed(error) {
    return {
        type: 'FETCH_TASKS_FAILED',
        payload: {
            error,
        },
    };
}



function getTaskById(tasks, id) {
    console.log("TASK:", id);
    return tasks.find(task => task.id === id);
}

function createTaskSucceeded(task) {
    return {
        type: 'CREATE_TASK_SUCCEEDED',
        payload: {
            task,
        },
    };
}

export function fetchTasksSucceeded(tasks) {
    console.log("FETCH SUCCEEDED, GO TO REDUCER CALLBACK", tasks);
    return {
        type: 'FETCH_TASKS_SUCCEEDED',
        payload: {
            tasks
        }
    }

}

function editTaskSucceeded(task) {
    console.log("EDIT TASK SUCCESS", task);
    return {
        type: 'EDIT_TASK_SUCCEEDED',
        payload: {
            task,
        },
    }
}

function fetchTasksStarted() {
    return {
        type: 'FETCH_TASKS_STARTED',
    };
}
