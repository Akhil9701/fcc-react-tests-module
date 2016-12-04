/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Define an Action Creator`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now that we can create actions lets learn how we can
send these actions to the Redux store so it can update its state. In Redux we define action creators to accomplish this.
An action creator is simply a JavaScript function which returns an action. In other words, action creators create objects
that represent actions events.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've defined our <code>action</code> from
the previous lesson. Now, define a function called <code>actionCreator</code> which returns this action object when called.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const action = {
	type: 'LOGIN'
}
// Define an actionCreator here:`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const action = {
	type: 'LOGIN'
}
// Define an actionCreator here:
const actionCreator = () => {
	return action;
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'actionCreators is a function.';
	const error_2 = 'Running the actionCreator function returns an action object.';
	const error_3 = 'The action has a key property \'type\' with value \'LOGIN\'.';

	let testResults = [
		{
			test: 0,
			status: false,
			condition: error_0
		},
		{
			test: 1,
			status: false,
			condition: error_1
		},
		{
			test: 2,
			status: false,
			condition: error_2
		},
		{
			test: 3,
			status: false,
			condition: error_3
		}
	];

	let es5, action, passed = true;

	// this code hijacks the user input to create an IIFE 
	// which returns the store from Redux as an object
	// or whatever you need from the client code
	const prepend = `(function() {`
	const apend = `;\n return actionCreator() })()`
	const modifiedCode = prepend.concat(code).concat(apend);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[0].status = false;
	}

	// save the store from redux to test here
	// now you can access the redux store methods
	try {
		action = eval(es5)
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// test 1:
	try {

		const prepend = `(function() {`
		const apend = `;\n return actionCreator })()`
		const modifiedCode = prepend.concat(code).concat(apend);
		let actionCreator = eval(modifiedCode);

		assert.strictEqual(typeof actionCreator, 'function', error_1);
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}		
	
	// test 2:
	try {
		assert.strictEqual(typeof action, 'object', error_2);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		assert.strictEqual(action.type, 'LOGIN', error_3);
		testResults[3].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[3].status = false;		
	}

	return {
		passed,
		testResults
	}
	
}

// liveRender modifies console.log in user input and returns message data -----------------------
export const liveRender = (code) => {

	// this code modifies the user input to return all
	// console.log statements as a message array to be
	// displayed on the client UI
	const prepend = `
	(function() { 
		let log = []
		const message = (msg) => log.push(msg);
	`
	const apend = `; return log })();`
	const consoleReplaced = code.replace(/console.log/g, 'message');
	const hijackedCode = prepend.concat(consoleReplaced).concat(apend);
	
	let evaluatedCode;
	try {
		evaluatedCode = eval(hijackedCode);
	} catch (err) {
		console.log(err);
	}

	return evaluatedCode;

}
