/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Set State with this.setState`

export const challengeText = `<span class = 'default'>Intro: </span>You have learned about component <code>state</code>
and how to initialize state in the <code>constructor</code>. Now let's see how we can change the component's
<code>state</code>. React provides a method for updating component <code>state</code> called <code>setState</code>.
You can call this method within your component class like this: <code>this.setState()</code>, passing in an object
which defines the <code>state</code> values you wish to update. It is important to never modify <code>state</code>
directly but always use <code>this.setState()</code> to do so.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>In this example we've provided
a <code>button</code> element which has an <code>onClick()</code> handler. This handler is triggered when the
<code>button</code> recieves a click event in the browser, which in this case will run the <code>click</code>
method we have defined on the MyComponent class. Within this <code>click</code> method we want to update the
component <code>state</code> with <code>this.setState</code>. Update the <code>click</code> method to set the
'name' property in the MyComponent <code>state</code> to equal the string 'React Rocks!'.<br><br>

Try it out! Click the button and watch the rendered state update. Don't worry about understanding how we our
definining the <code>click</code> method or assigning the click handler at this point, we will continue to
elaborate on these details in the subsequent lessons.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Initial State'
		};
		this.click = this.click.bind(this);
	}
	click() {
		 // change code below this line

	  // change code above this line
	}
	render() {
  	return (
	    <div>
        <button onClick = {this.click}>Click Me</button>
        <h1>{this.state.name}</h1>
	    </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Initial State'
		};
		this.click = this.click.bind(this);
	}
	click() {
		 // change code below this line
		this.setState({
			name: 'React Rocks!'
		});
	  // change code above this line
	}
	render() {
  	return (
	    <div>
        <button onClick = {this.click}>Click Me</button>
        <h1>{this.state.name}</h1>
	    </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The state of MyComponent is initialized with the key value pair { message: \'Initial State\'';
	const error_2 = 'The component renders an h1 tag';
	const error_3 = 'The rendered h1 tag contains text rendered from the component\'s state';
	const error_4 = 'Calling the click method on MyComponent sets the name property in state to equal \'React Rocks!\'';

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
		},
		{
			test: 4,
			status: false,
			condition: error_4
		}
	];

	let es5, shallowRender, mockedComponent, passed = true;

	const exportScript = '\n export default MyComponent'
	const modifiedCode = code.concat(exportScript);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}
	
	// try to shallow render the component with Enzyme
	try {
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// test 1:
	try {
		assert.strictEqual(mockedComponent.state('name'), 'Initial State', error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.find('h1').length, 1, error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		mockedComponent.setState({name: 'TestName'});
		assert.strictEqual(mockedComponent.contains(<h1>TestName</h1>), true, error_3);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		mockedComponent.setState({name: 'Before'});
		const before = mockedComponent.state('name');
		// run click method and test state afterwards
		mockedComponent.instance().click();
		const after = mockedComponent.state('name');
		assert.strictEqual(before === 'Before' && after === 'React Rocks!', true, error_4);
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;
	}	

	return {
		passed,
		testResults
	}
	
}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const exportScript = '\n export default MyComponent'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}