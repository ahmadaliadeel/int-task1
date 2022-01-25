import * as React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import { EnrollmentForm } from '../components/EnrollmentForm';
import * as EnrollmentsStore from '../store/Enrollment';
import { Button } from 'react-bootstrap'

type Course = {
    courseId: number,
    courseName: string
}

type MyState = {
    showModal: boolean,
    studentId: number,
    courseId: number,
    courses: Array<any>
}

interface RouteParams {
    studentId: string | undefined
}

// At runtime, Redux will merge together...
type EnrollmentProps =
    RouteComponentProps<RouteParams>
  & EnrollmentsStore.EnrollmentsState // ... state we've requested from the Redux store
  & typeof EnrollmentsStore.actionCreators // ... plus action creators we've requested
  ;//& RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters


class FetchData extends React.Component<EnrollmentProps, MyState> {
    myRef: React.RefObject<any>;

    constructor(props: EnrollmentProps) {
        super(props)
        this.myRef = React.createRef();

    }
    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
        fetch(`enrollment/availablecourses/${this.props.match.params.studentId}`)
            .then(response => response.json())
            .then(data => this.setState({ courses: data.map((x: Course) => ({ value: x.courseId, label: x.courseName })) }));
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {
        //this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <h1 id="tabelLabel">Enrollments</h1>
                <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
                {this.renderEnrollmentsTable()}
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        this.props.requestEnrollments(parseInt(this.props.match.params.studentId??"0"));
    }


    deleteEntry = (id: number) => {
        fetch(`/Enrollment/${id}`, { method: 'DELETE' })
            .then(Enrollment => window.location.href = '/page/Enrollment')

    }

    state: MyState = {
        showModal: false,
        studentId: 0,
        courseId: 0,
        courses: []
    }

    regCourse = (courseId: number) => {
        this.myRef.current.setState({ 'show': true })
        this.setState({
            courseId: courseId,
            showModal: true
        })
    }

    private renderEnrollmentsTable() {
        return (
            <>
                <select className="form-select" onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => this.regCourse(Number.parseInt(evt.target.value))} >
                    <option aria-readonly>CHOOSE COURSE</option>
                    {this.state.courses.map(c => (<option key={c.value} value={c.value}>{c.label}</option>))}
                </select>

                <EnrollmentForm ref={this.myRef} enrollmentId={0} courseId={this.state.courseId } studentId={parseInt(this.props.match.params.studentId??"0")} show={this.state.showModal} />
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Course</th>
                            <th>Marks</th>
                            <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.Enrollments.map((Enrollment: EnrollmentsStore.Enrollment) =>
                        <tr key={Enrollment.id}>
                            <td>{Enrollment.course.courseName}</td>
                            <td>{Enrollment.marks}</td>
                            <td><EnrollmentForm enrollmentId={Enrollment.id} courseId={Enrollment.courseId} studentId={Enrollment.studentId} show={false} />
                                <Button onClick={() => fetch(`Enrollment/Enrollment/${Enrollment.id}`, { method: "DELETE" }).then(()=> window.location.reload() )}>Drop</Button>
                            </td>

                        </tr>
                    )}
                </tbody>
            </table></>
        );
    }
}


export default connect(
  (state: ApplicationState) => state.enrollments, // Selects which state properties are merged into the component's props
  EnrollmentsStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData as any); // eslint-disable-line @typescript-eslint/no-explicit-any
