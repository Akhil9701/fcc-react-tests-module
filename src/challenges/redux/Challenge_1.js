import expect from 'expect'
import { transform } from 'babel-standalone'

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Redux Store`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Create a redux store with the Redux method
createStore() and initalize its state to be 5.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`// Redux methods are available from a Redux object
// For example: Redux.createStore()
// Define the store here:`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const store = Redux.createStore(
	(state = 5) => state
);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	let es5, store, passed = true;

	let testResults = [
		{
			test: 0,
			status: false,
			failure: 'Your code could not be transpiled successfully.',
			success: 'Your code was transpiled successfully.'
		},
		{
			test: 1,
			status: false,
			failure: 'The redux store does not exist.',
			success: 'The redux store exists.'
		},
		{
			test: 2,
			status: false,
			failure: 'The redux store does not have a value of 5 for the state.',
			success: 'The redux store has a value of 5 for the state.'
		}
	]

	// this code hijacks the user input to create an IIFE 
	// which returns the store from Redux as an object
	const prepend = `(function() {`
	const apend = `; return store })()`
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
	try {
		store = eval(es5)
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// test 1:
	try {
		expect(typeof store.getState).toBe('function');
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		expect(store.getState()).toEqual(5);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;
	}

	return {
		passed,
		testResults
	}
	
}

// liveRender modifies console.log in user input and returns message data
export const liveRender = (code) => {

	// this code modifies the user input to return all
	// console.log statements as a message array to be
	// displayed on the client UI
	const prepend = `
	(function() { 
		let log = []
		const message = (msg) => log[log.length] = msg;
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

