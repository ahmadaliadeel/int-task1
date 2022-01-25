import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface EnrollmentsState {
    isLoading: boolean;
    Enrollments: Enrollment[];
}

export interface Enrollment {
    id: number;
    studentId: number;
    courseId: number;
    course: {
        courseName: string;
    };
    marks: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestEnrollmentsAction {
    type: 'REQUEST_EnrollmentS';
    studentId: number
}

interface ReceiveEnrollmentsAction {
    type: 'RECEIVE_EnrollmentS';
    Enrollments: Enrollment[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestEnrollmentsAction | ReceiveEnrollmentsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestEnrollments: (studentId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.enrollments ) {
            fetch(`/enrollment/student/${studentId}`)
                .then(response => response.json() as Promise<Enrollment[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_EnrollmentS', Enrollments: data });
                });
            dispatch({ type: 'REQUEST_EnrollmentS', studentId: studentId });
        }
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: EnrollmentsState = { Enrollments: [], isLoading: false };

export const reducer: Reducer<EnrollmentsState> = (state: EnrollmentsState | undefined, incomingAction: Action): EnrollmentsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_EnrollmentS':
            return {
                Enrollments: state.Enrollments,
                isLoading: true
            };
        case 'RECEIVE_EnrollmentS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                Enrollments: action.Enrollments,
                isLoading: false
            };
    }

    return state;
};
