import * as React from 'react';
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { Form } from 'react-bootstrap';
import { get } from '../http'

type MyState = {
    show: boolean; // like this
    studentId: number | null;
    rollNo: string,
    name: string
};

type MyProps = {
    show: boolean;
    studentId: number | null;
};

interface Student {
    id: number;
    rollNo: string;
    name: string;
}

export class StudentForm extends React.Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props)

    }

    handleLoad = () => {
        fetch(`student/${this.props.studentId}`)
            .then(response => response.json() as Promise<Student>)
            .then(data => {
                return this.setState({
                    studentId: data.id,
                    rollNo: data.rollNo,
                    name: data.name
                })  ;
            });


    }

    state: MyState = {
        show: this.props.show,
        studentId: null,
        rollNo: "",
        name: ""
    }
    handleSave = () => {
        fetch(`/student/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.studentId,
                rollNo: this.state.rollNo,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(student => console.log(student))
            .then(student => window.location.href = '/page/student')
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
                { this.props.studentId ? "Edit" : "Create" }
            </Button>

            <Modal show={this.state.show as boolean} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="rollno">
                        <Form.Label>Roll No</Form.Label>
                        <Form.Control  placeholder="Enter Roll No" value={this.state.rollNo} onChange={evt=>this.setState({rollNo: evt.target.value})} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Name" value={this.state.name} onChange={evt => this.setState({ name: evt.target.value })} />
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