import React from 'react';
import {Link} from 'react-router-dom'
// import {useState, useEffect} from 'react';
import MngrNavbar from '../../../components/Layouts/MngrNavbar';
import './MngrMainPage.css';
import {Container, Row, Col} from 'react-bootstrap';
import MngrRequestList from '../../../components/MngrRequestList/MngrRequestList';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MngrRequestListOfResidents from '../../../components/MngrRequestListOfResidents/MngrRequestListOfResidents';



const MngrMainPage = () => {

    return (  
        <Router>
        <div>
            <Container fluid>
                <Row>
                    <MngrNavbar />
                    <div>
                    </div>
                </Row>
                <Row>
                    <Col sm={3} md={3} className="menu-window">
                        <Link to='/manager/request-list-of-services'>
                            <h2 style={{color:'black'}}>Requests</h2>
                        </Link>
                        <Link to='/manager/request-list-of-residents'>
                            <h2 style={{color:'black'}}>Residents</h2>
                        </Link>
                        <h2 style={{color:'lightgrey'}}>Units</h2>
                        <h2 style={{color:'lightgrey'}}>Reports</h2>
                        <h2 style={{color:'lightgrey'}}>Announcements</h2>
                    </Col>
                    <Col sm={9} md={9} className="service-window">
                            <Switch>
                                <Route exact path="/manager/request-list-of-services" component=        {MngrRequestList}/>
                                <Route exact path="/manager/request-list-of-residents" component=        {MngrRequestListOfResidents}/>
                            </Switch>
                    </Col>
                </Row>
                
            </Container>
        </div>
        </Router>
    );
}
 
export default MngrMainPage;