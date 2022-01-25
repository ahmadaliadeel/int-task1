import * as React from 'react';
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { Form } from 'react-bootstrap';
import { get } from '../http'

type MyState = {
    show: boolean; // like this
    //courseId: number;
    //studentId: number;
    courseName: string;
    marks: number;
};

type MyProps = {
    //show: boolean;
    courseId: number;
    studentId: number;
    enrollmentId: number;
};

interface Enrollment {
    course: {
        name: string
    };
    marks: number;
}

export class EnrollmentForm extends React.Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props)

    }

    public componentDidUpdate() {
        //this.setState({ 'show': this.props.show });
    }

    handleLoad = () => {
        fetch(`/enrollment/enrollment/${this.props.enrollmentId}`)
            .then(response => response.json() as Promise<Enrollment>)
            .then(data => {
                return this.setState({
                    courseName: "data.course.name",
                    marks: data.marks
                })  ;
            });


    }

    state: MyState = {
        show: false,
        marks: 0.0,
        //courseId: 0,
        //studentId: 0,
        courseName: ""
    }
    handleSave = () => {
        let self = this;
        fetch(`/enrollment/RegisterCourse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseId: this.props.courseId,
                studentId: this.props.studentId,
                marks: this.state.marks
            })
        })
            .then(response => response.json())
            .then(Course => console.log(Course))
            .then(Course => { self.setState({ 'show': false }); window.location.reload() })
            .catch(error => console.log(error.message));

        ;
    };
    handleClose = () => {
        this.setState({ 'show': false });
    };
    handleShow = () => {
        this.handleLoad()
        this.setState({ 'show': true });
    };
    

    render() { return (
        <>

            {this.props.enrollmentId != 0 ? (<Button variant="primary" onClick={this.handleShow}>
                Edit Marks
            </Button>) : <></>}
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="marks">
                        <Form.Label>Marks</Form.Label>
                        <Form.Control placeholder="Enter Marks" value={this.state.marks} onChange={evt => this.setState({ marks: Number.parseFloat(evt.target.value) })} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
    } ;
}