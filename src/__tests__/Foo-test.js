import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
//import TestUtils from 'react-addons-test-utils';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {combineForms} from 'react-redux-form';
import thunk from 'redux-thunk';
import { TextWithError } from '../Foo.js';
import {assert} from 'chai';

function setup() {
    const initialState = {
        message: 'test store login message',
        login: '',
        loginForm: 'test-login',
        password: 'test-password',
        id_token: '',
        isUserLoggedIn: false,
        modalIsOpen: true,
        afterPostSubmitFunction: null
    };

    const store = createStore(
        combineForms({
            login: initialState
        }),
        applyMiddleware(thunk)
    );

    const form = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
            <form>
                <TextWithError
                    dispatch={store.dispatch}
                    store={initialState}
                />
            </form>
        </Provider>
    );

    return form;
}

describe('TextError', function () {

    it('should contain one input and show error for it', function () {
        const form = setup();
        const input = ReactTestUtils.findRenderedDOMComponentWithTag(form, 'input');
        const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(form, 'input');
        console.log(input);
        assert.lengthOf(inputs, 1);
        assert.equal(input.value, 'test-login');
        input.value = '';
        ReactTestUtils.Simulate.change(input);
        const errors = ReactTestUtils.scryRenderedDOMComponentsWithTag(form, 'errors');
        console.log(errors);
        assert.lengthOf(errors, 1);
    });

});
