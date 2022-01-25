import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface StudentsState {
    isLoading: boolean;
    students: Student[];
}

export interface Student {
    id: number;
    rollNo: string;
    name: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestStudentsAction {
    type: 'REQUEST_STUDENTS';
}

interface ReceiveStudentsAction {
    type: 'RECEIVE_STUDENTS';
    students: Student[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestStudentsAction | ReceiveStudentsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestStudents: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.students ) {
            fetch(`student`)
                .then(response => response.json() as Promise<Student[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_STUDENTS', students: data });
                });

            dispatch({ type: 'REQUEST_STUDENTS' });
        }
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: StudentsState = { students: [], isLoading: false };

export const reducer: Reducer<StudentsState> = (state: StudentsState | undefined, incomingAction: Action): StudentsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_STUDENTS':
            return {
                students: state.students,
                isLoading: true
            };
        case 'RECEIVE_STUDENTS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                students: action.students,
                isLoading: false
            };
    }

    return state;
};
