import * as React from 'react';
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { Form } from 'react-bootstrap';
import { get } from '../http'

type MyState = {
    show: boolean; // like this
    courseId: number | null;
    courseNo: string,
    courseName: string
};

type MyProps = {
    show: boolean;
    courseId: number | null;
};

interface Course {
    courseId: number;
    courseName: string;
    courseNo: string;
}

export class CourseForm extends React.Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props)

    }

    handleLoad = () => {
        fetch(`Course/${this.props.courseId}`)
            .then(response => response.json() as Promise<Course>)
            .then(data => {
                return this.setState({
                    courseId: data.courseId,
                    courseNo: data.courseNo,
                    courseName: data.courseName
                })  ;
            });


    }

    state: MyState = {
        show: this.props.show,
        courseId: null,
        courseNo: "",
        courseName: ""
    }
    handleSave = () => {
        fetch(`/course/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseId: this.state.courseId,
                courseNo: this.state.courseNo,
                courseName: this.state.courseName
            })
        })
            .then(response => response.json())
            .then(Course => console.log(Course))
            .then(Course => window.location.href = '/page/Course')
            .catch(error => console.log(error.message));

        this.setState({ 'show': false });
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

            <Button variant="primary" onClick={this.handleShow}>
                { this.props.courseId ? "Edit" : "Create" }
            </Button>

            <Modal show={this.state.show as boolean} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="courseNo">
                        <Form.Label>Course No</Form.Label>
                        <Form.Control  placeholder="Enter Course No" value={this.state.courseNo} onChange={evt=>this.setState({courseNo: evt.target.value})} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control placeholder="Course Name" value={this.state.courseName} onChange={evt => this.setState({ courseName: evt.target.value })} />
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