import * as WeatherForecasts from './WeatherForecasts';
import * as Students from './Student';
import * as Courses from './Course';
import * as Enrollments from './Enrollment';

// The top-level state object
export interface ApplicationState {
    courses: Courses.CoursesState | undefined;
    enrollments: Enrollments.EnrollmentsState | undefined;
    students: Students.StudentsState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    students: Students.reducer,
    courses: Courses.reducer,
    enrollments: Enrollments.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
