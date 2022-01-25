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
exports.CourseForm = void 0;
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var Modal_1 = require("react-bootstrap/Modal");
var react_bootstrap_2 = require("react-bootstrap");
var CourseForm = /** @class */ (function (_super) {
    __extends(CourseForm, _super);
    function CourseForm(props) {
        var _this = _super.call(this, props) || this;
        _this.handleLoad = function () {
            fetch("Course/".concat(_this.props.courseId))
                .then(function (response) { return response.json(); })
                .then(function (data) {
                return _this.setState({
                    courseId: data.courseId,
                    courseNo: data.courseNo,
                    courseName: data.courseName
                });
            });
        };
        _this.state = {
            show: _this.props.show,
            courseId: null,
            courseNo: "",
            courseName: ""
        };
        _this.handleSave = function () {
            fetch("/course/edit", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId: _this.state.courseId,
                    courseNo: _this.state.courseNo,
                    courseName: _this.state.courseName
                })
            })
                .then(function (response) { return response.json(); })
                .then(function (Course) { return console.log(Course); })
                .then(function (Course) { return window.location.href = '/page/Course'; })
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
    CourseForm.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(react_bootstrap_1.Button, { variant: "primary", onClick: this.handleShow }, this.props.courseId ? "Edit" : "Create"),
            React.createElement(Modal_1.default, { show: this.state.show, onHide: this.handleClose },
                React.createElement(Modal_1.default.Header, { closeButton: true },
                    React.createElement(Modal_1.default.Title, null, "Edit Course")),
                React.createElement(Modal_1.default.Body, null,
                    React.createElement(react_bootstrap_2.Form.Group, { className: "mb-3", controlId: "courseNo" },
                        React.createElement(react_bootstrap_2.Form.Label, null, "Course No"),
                        React.createElement(react_bootstrap_2.Form.Control, { placeholder: "Enter Course No", value: this.state.courseNo, onChange: function (evt) { return _this.setState({ courseNo: evt.target.value }); } })),
                    React.createElement(react_bootstrap_2.Form.Group, { className: "mb-3", controlId: "name" },
                        React.createElement(react_bootstrap_2.Form.Label, null, "Course Name"),
                        React.createElement(react_bootstrap_2.Form.Control, { placeholder: "Course Name", value: this.state.courseName, onChange: function (evt) { return _this.setState({ courseName: evt.target.value }); } }))),
                React.createElement(Modal_1.default.Footer, null,
                    React.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: this.handleClose }, "Close"),
                    React.createElement(react_bootstrap_1.Button, { variant: "primary", onClick: this.handleSave }, "Save Changes")))));
    };
    ;
    return CourseForm;
}(React.Component));
exports.CourseForm = CourseForm;
//# sourceMappingURL=CourseForm.js.map