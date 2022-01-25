import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as StudentsStore from '../store/Student';
import { StudentForm } from '../components/StudentForm'
import { Button } from 'react-bootstrap'
// At runtime, Redux will merge together...
type StudentProps =
  StudentsStore.StudentsState // ... state we've requested from the Redux store
  & typeof StudentsStore.actionCreators // ... plus action creators we've requested
  ;//& RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters


class FetchData extends React.PureComponent<StudentProps> {
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
                <h1 id="tabelLabel">Students</h1>
                <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
                {this.renderStudentsTable()}
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        //const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
        this.props.requestStudents();
    }


    deleteEntry = (id: number) => {
        fetch(`/student/${id}`, { method: 'DELETE' })
            .then(student => window.location.href = '/page/student')

    }

    private renderStudentsTable() {
        return (
            <><StudentForm show={false} studentId={null}/>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Roll No</th>
                            <th>Name</th>
                            <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.students.map((student: StudentsStore.Student) =>
                        <tr key={student.rollNo}>
                            <td>{student.rollNo}</td>
                            <td>{student.name}</td>
                            <td><StudentForm show={false} studentId={student.id} />
                                <Button variant="danger" onClick={()=>this.deleteEntry(student.id) }>
                                    Delete
                                </Button><a className="btn btn-warning" href={'/page/enrollment/'+student.id}>Enrolled Courses</a>                      </td>
                        </tr>
                    )}
                </tbody>
            </table></>
        );
    }
}


export default connect(
  (state: ApplicationState) => state.students, // Selects which state properties are merged into the component's props
  StudentsStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData as any); // eslint-disable-line @typescript-eslint/no-explicit-any
