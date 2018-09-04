console.log("1. REDUCER PAGE");

const initialState = {
    myTasks: [],
    isLoading: false,
    error: null,
};

export default function functionTask(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_TASKS_STARTED': {
            console.log("FETCH STARTED:");
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'FETCH_TASKS_SUCCEEDED': {
            console.log("FETCH TASK SUCCEEDED X", action.payload);
            return {
                state,
                isLoading: false,
                myTasks: action.payload.tasks,
            };
        }
        case 'FETCH_TASKS_FAILED': {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }
        }

        case 'CREATE_TASK': {
            return {
                myTasks: state.myTasks.concat(action.payload),
            };
        }
        case 'EDIT_TASK': {
            const { payload } = action;
            return {
                myTasks: state.myTasks.map(task => {
                    if (task.id === payload.id) {
                        return Object.assign({}, task, payload.params);
                    }
                    return task;
                }),
            };
        }


        case 'CREATE_TASK_SUCCEEDED': {
            return {
                ...state,
                myTasks: state.myTasks.concat(action.payload.task),
            };
        }
        case 'EDIT_TASK_SUCCEEDED': {
            const { payload } = action;

            const nextTasks = state.myTasks.map(task => {
                if (task.id === payload.task.id) {
                    return payload.task;
                }

                return task;
            });

            return {
                ...state,
                myTasks: nextTasks,
            };
        }
        default: {
            return state;
        }
    }
}