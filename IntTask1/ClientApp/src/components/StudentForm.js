"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentForm = void 0;
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var Modal_1 = require("react-bootstrap/Modal");
var react_bootstrap_2 = require("react-bootstrap");
var StudentForm = /** @class */ (function (_super) {
    __extends(StudentForm, _super);
    function StudentForm(props) {
        var _this = _super.call(this, props) || this;
        _this.handleLoad = function () {
            fetch("student/".concat(_this.props.studentId))
                .then(function (response) { return response.json(); })
                .then(function (data) {
                return _this.setState({
                    studentId: data.id,
                    rollNo: data.rollNo,
                    name: data.name
                });
            });
        };
        _this.state = {
            show: _this.props.show,
            studentId: null,
            rollNo: "",
            name: ""
        };
        _this.handleSave = function () {
            fetch("/student/edit", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: _this.state.studentId,
                    rollNo: _this.state.rollNo,
                    name: _this.state.name
                })
            })
                .then(function (response) { return response.json(); })
                .then(function (student) { return console.log(student); })
                .then(function (student) { return window.location.href = '/page/student'; })
                .catch(function (error) { return console.log(error.message); });
            _this.setState({ 'show': false });
        };
        _this.handleClose = function () {
            _this.setState({ 'show': false });
        };
        _this.handleShow = function () {
            _this.handleLoad();
            _this.setState({ 'show': true });
        };
        return _this;
    }
    StudentForm.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(react_bootstrap_1.Button, { variant: "primary", onClick: this.handleShow }, this.props.studentId ? "Edit" : "Create"),
            React.createElement(Modal_1.default, { show: this.state.show, onHide: this.handleClose },
                React.createElement(Modal_1.default.Header, { closeButton: true },
                    React.createElement(Modal_1.default.Title, null, "Edit Student")),
                React.createElement(Modal_1.default.Body, null,
                    React.createElement(react_bootstrap_2.Form.Group, { className: "mb-3", controlId: "rollno" },
                        React.createElement(react_bootstrap_2.Form.Label, null, "Roll No"),
                        React.createElement(react_bootstrap_2.Form.Control, { placeholder: "Enter Roll No", value: this.state.rollNo, onChange: function (evt) { return _this.setState({ rollNo: evt.target.value }); } })),
                    React.createElement(react_bootstrap_2.Form.Group, { className: "mb-3", controlId: "name" },
                        React.createElement(react_bootstrap_2.Form.Label, null, "Name"),
                        React.createElement(react_bootstrap_2.Form.Control, { placeholder: "Name", value: this.state.name, onChange: function (evt) { return _this.setState({ name: evt.target.value }); } }))),
                React.createElement(Modal_1.default.Footer, null,
                    React.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: this.handleClose }, "Close"),
                    React.createElement(react_bootstrap_1.Button, { variant: "primary", onClick: this.handleSave }, "Save Changes")))));
    };
    ;
    return StudentForm;
}(React.Component));
exports.StudentForm = StudentForm;
//# sourceMappingURL=StudentForm.js.map