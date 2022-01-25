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
exports.EnrollmentForm = void 0;
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var Modal_1 = require("react-bootstrap/Modal");
var react_bootstrap_2 = require("react-bootstrap");
var EnrollmentForm = /** @class */ (function (_super) {
    __extends(EnrollmentForm, _super);
    function EnrollmentForm(props) {
        var _this = _super.call(this, props) || this;
        _this.handleLoad = function () {
            fetch("/enrollment/enrollment/".concat(_this.props.enrollmentId))
                .then(function (response) { return response.json(); })
                .then(function (data) {
                return _this.setState({
                    courseName: "data.course.name",
                    marks: data.marks
                });
            });
        };
        _this.state = {
            show: false,
            marks: 0.0,
            //courseId: 0,
            //studentId: 0,
            courseName: ""
        };
        _this.handleSave = function () {
            var self = _this;
            fetch("/enrollment/RegisterCourse", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId: _this.props.courseId,
                    studentId: _this.props.studentId,
                    marks: _this.state.marks
                })
            })
                .then(function (response) { return response.json(); })
                .then(function (Course) { return console.log(Course); })
                .then(function (Course) { self.setState({ 'show': false }); window.location.reload(); })
                .catch(function (error) { return console.log(error.message); });
            ;
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
    EnrollmentForm.prototype.componentDidUpdate = function () {
        //this.setState({ 'show': this.props.show });
    };
    EnrollmentForm.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            this.props.enrollmentId != 0 ? (React.createElement(react_bootstrap_1.Button, { variant: "primary", onClick: this.handleShow }, "Edit Marks")) : React.createElement(React.Fragment, null),
            React.createElement(Modal_1.default, { show: this.state.show, onHide: this.handleClose },
                React.createElement(Modal_1.default.Header, { closeButton: true },
                    React.createElement(Modal_1.default.Title, null, "Edit Course")),
                React.createElement(Modal_1.default.Body, null,
                    React.createElement(react_bootstrap_2.Form.Group, { className: "mb-3", controlId: "marks" },
                        React.createElement(react_bootstrap_2.Form.Label, null, "Marks"),
                        React.createElement(react_bootstrap_2.Form.Control, { placeholder: "Enter Marks", value: this.state.marks, onChange: function (evt) { return _this.setState({ marks: Number.parseFloat(evt.target.value) }); } }))),
                React.createElement(Modal_1.default.Footer, null,
                    React.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: this.handleClose }, "Close"),
                    React.createElement(react_bootstrap_1.Button, { variant: "primary", onClick: this.handleSave }, "Save Changes")))));
    };
    ;
    return EnrollmentForm;
}(React.Component));
exports.EnrollmentForm = EnrollmentForm;
//# sourceMappingURL=EnrollmentForm.js.map