/* eslint-disable */
import { assert } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { testCreateStore, defaultTestContexts } from './utils';
import { Errors, modelReducer, formReducer, Control, actions, Field } from 'react-redux-form';

    describe(`<Errors /> `, () => {
        it('should exist', () => {
            assert.ok(Errors);
        });

        describe('displaying errors from messages', () => {
            const initialState = {foo: ''};
            const store = testCreateStore({
                testForm: formReducer('test', initialState),
                test: modelReducer('test', initialState),
            });

            const form = TestUtils.renderIntoDocument(
                <Provider store={store}>
                    <form>
                        <Errors model="test.foo"
                                messages={{
                                    required: 'This field is required',
                                    valid: 'This field is invalid',
                                    valueMissing: 'Login field is required'
                                }}
                        />
                        <Control
                            type="text"
                            model="test.foo"
                            validators={{
                                required: (v) => v && v.length,
                                valid: (v) => v === 'valid',
                            }}

                        >
                        </Control>
                    </form>
                </Provider>
            );

            const input = TestUtils.findRenderedDOMComponentWithTag(form, 'input');
            const errors = TestUtils.scryRenderedDOMComponentsWithTag(form, 'span');

            it('should display all errors', () => {
                const input = TestUtils.findRenderedDOMComponentWithTag(form, 'input');
                const errors = TestUtils.scryRenderedDOMComponentsWithTag(form, 'span');
                assert.lengthOf(errors, 2);
                assert.equal(errors[0].innerHTML, 'This field is required');
                assert.equal(errors[1].innerHTML, 'This field is invalid');
            });

            it('should display only relevant errors when validity changes', () => {
                const input = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

                input.value = 'invalid';

                TestUtils.Simulate.change(input);

                const errors = TestUtils.scryRenderedDOMComponentsWithTag(form, 'span');

                assert.lengthOf(errors, 1);
                assert.equal(errors[0].innerHTML, 'This field is invalid');
            });

            it('should not display any errors for a valid field', () => {
                const input = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

                input.value = 'valid';

                TestUtils.Simulate.change(input);

                const errors = TestUtils.scryRenderedDOMComponentsWithTag(form, 'span');

                assert.lengthOf(errors, 0);
            });
        })
    })
