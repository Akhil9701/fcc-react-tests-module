/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Change Inline CSS Conditionally Based on Component State`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now that we've seen several applications of conditional
rendering in addition to the use of inline styles, we'll cover one more example which combines both of these topics. We can
also render CSS conditionally based on the state of our React component (or anything else you wish to evaluate programmatically).
To do this, we can simply check for a condition and if that condition is met we will modify the styles object which is assigned
to the JSX elements in our render method.<br><br>

This paradigm is important to understand because it is a dramatic shift from the more traditional approach of applying styles by 
modifying DOM elements directly (this is very common with jQuery, for example). In that approach, you must keep track of when elements change
and also handle the actual manipulation directly. It can become difficult to keep track of changes and your UI can become
unpredictable. In this approach, we simply describe how the UI should look as a function of the application's state. There is a clear flow
of information which only moves in one direction. This is the preferred method when writing applications with React.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Here we've created a simple controlled input
and styled its border. We want to style this border red if the user types too much text in the input box. Add a condition to check
for this and if the condition is valid set the input border style to <code>3px solid red</code>. Try it out by entering text in the input!`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
class GateKeeper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ''
		};
		this.handleInput = this.handleInput.bind(this);
	}
	handleInput(event) {
		this.setState({ input: event.target.value })
	}
	render() {
		let inputStyle = {
			border: '1px solid black'
		};
		// change code below this line

		// change code above this line
		return (
			<div>
				<h3>Don't Type Too Much:</h3>
				<input
					type="text"
					style={inputStyle}
					value={this.state.input}
					onChange={this.handleInput} />
			</div>
		);
	}
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
class GateKeeper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ''
		};
		this.handleInput = this.handleInput.bind(this);
	}
	handleInput(event) {
		this.setState({ input: event.target.value })
	}
	render() {
		let inputStyle = {
			border: '1px solid black'
		};
		if (this.state.input.length > 15) {
			inputStyle.border = '3px solid red';
		};
		return (
			<div>
				<h3>Don't Type Too Much:</h3>
				<input
					type="text"
					style={inputStyle}
					value={this.state.input}
					onChange={this.handleInput} />
			</div>
		);
	}
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_1 = 'The GateKepper component should render a div element.';
	const error_2 = 'The GateKeeper component should be initialized with a state key input set to an empty string.';
	const error_3 = 'The GateKeeper component should render an h3 tag and an input tag.';
	const error_4 = 'The input tag should initially have a style of \'1px solid black\' for the border property.';
	const error_5 = 'The input tag should be styled with a border of \'3px solid red\' if the input value in state is longer than 15 characters';

	let testResults = [
		{
			test: 0,
			status: false,
			condition: 'Your JSX code should transpile successfully.'
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
		},
		{
			test: 4,
			status: false,
			condition: error_4
		},
		{
			test: 5,
			status: false,
			condition: error_5
		}
	];

	let es5, mockedComponent, passed = true;
	const exportScript = '\n export default GateKeeper;'
	const modifiedCode = code.concat(exportScript);

	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}

	try {
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// test 1:
	try {
		assert.strictEqual(mockedComponent.find('div').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.find('GateKeeper').node.state.input, '', error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		assert(
			mockedComponent.find('h3').length === 1 &&
			mockedComponent.find('input').length === 1,
			error_3
		);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		assert.strictEqual(mockedComponent.find('input').node.style.border, '1px solid black', error_4);
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;
	}

	// test 5:
	try {
		let initialStyle = mockedComponent.find('input').node.style.border;
		mockedComponent.setState({input: 'this is 15 char' });
		let testStyle = mockedComponent.find('input').node.style.border;
		mockedComponent.setState({input: 'A very long string longer than 15 characters.' });
		let afterStyle = mockedComponent.find('input').node.style.border;
		assert(
			initialStyle === '1px solid black' &&
			testStyle === '1px solid black' &&
			afterStyle === '3px solid red',
			error_5
		);
		testResults[5].status = true;
	} catch (err) {
		passed = false;
		testResults[5].status = false;
	}

	return {
		passed,
		testResults
	}

}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const exportScript = '\n export default GateKeeper;'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}
