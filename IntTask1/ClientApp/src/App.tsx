import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Course from './components/Course';
import Enrollment from './components/Enrollment';
import Student from './components/Student';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/page/course' component={Course} />
        <Route path='/page/student' component={Student} />
        <Route path='/page/enrollment/:studentId' component={Enrollment} />
    </Layout>
);
