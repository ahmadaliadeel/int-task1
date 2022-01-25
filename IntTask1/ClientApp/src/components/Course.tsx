import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as CoursesStore from '../store/Course';
import { CourseForm } from '../components/CourseForm'
import { Button } from 'react-bootstrap'
// At runtime, Redux will merge together...
type CourseProps =
  CoursesStore.CoursesState // ... state we've requested from the Redux store
  & typeof CoursesStore.actionCreators // ... plus action creators we've requested
  ;//& RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters


class FetchData extends React.PureComponent<CourseProps> {
    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {
        //this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <h1 id="tabelLabel">Courses</h1>
                <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
                {this.renderCoursesTable()}
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        //const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
        this.props.requestCourses();
    }


    deleteEntry = (id: number) => {
        fetch(`/Course/${id}`, { method: 'DELETE' })
            .then(Course => window.location.href = '/page/Course')

    }

    private renderCoursesTable() {
        return (
            <><CourseForm show={false} courseId={null}/>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Course No</th>
                            <th>Name</th>
                            <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.Courses.map((Course: CoursesStore.Course) =>
                        <tr key={Course.courseNo}>
                            <td>{Course.courseNo}</td>
                            <td>{Course.courseName}</td>
                            <td><CourseForm show={false} courseId={Course.id} />
                                <Button variant="danger" onClick={()=>this.deleteEntry(Course.id) }>
                                    Delete
                                </Button>                            </td>
                        </tr>
                    )}
                </tbody>
            </table></>
        );
    }
}


export default connect(
  (state: ApplicationState) => state.courses, // Selects which state properties are merged into the component's props
  CoursesStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData as any); // eslint-disable-line @typescript-eslint/no-explicit-any
