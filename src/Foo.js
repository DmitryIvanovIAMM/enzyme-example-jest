import React, {Component}  from 'react';
import { Row, Col } from 'react-bootstrap';
import { Control, Errors } from 'react-redux-form';

export class TextWithError extends Component {

    render() {
        return (
            <Row>
                <Col md={12}>
                    <Control
                        type="text"
                        className="form-control"
                        model={'login.loginForm'}
                        validateOn="change"
                    />
                    <Errors
                        className="errors"
                        model={'login.loginForm'}
                        show="touched"
                        messages={{
                            valueMissing: 'Login is required',
                        }}
                    />
                </Col>
            </Row>
        )
    }
}