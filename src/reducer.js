import { createStore } from 'redux';
function counterReducer(state = 0, action) {

    if (action.type === 'INCREMENT') {
        return state + 1;
    }
    return state;
}
const store = createStore(counterReducer);
console.log(store.getState());
store.subscribe(() => {
    console.log('current state: ', store.getState());
});
store.dispatch({ type: 'INCREMENT' });
