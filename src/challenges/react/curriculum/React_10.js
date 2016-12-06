/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { render/**/, shallow, mount } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// -------------- define challenge title and challenge instructions --------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use React to Render Nested Components`

export const challengeText = `<span class = 'default'>Intro: </span>
Now that we've seen how to compose two components together, let's look at composition a little further. 
You can compose components in many different ways with React. Component composition is one of React's
powerful and endearing features.<br><br>

The process of breaking a UI down into components separates code and logic and makes writing and maintaining a project much easier. It is
important to begin to see a UI in terms of components like this when working with React. Now let's practice with some composition that's a 
bit more complex.`

export const challengeInstructions = `
<span class = 'default'>Instructions: </span>
Here we've defined two functional components for you, <code>TypesOfFruit</code> and <code>Fruits</code>.
Take the <code>TypesOfFruit</code> component and compose it, or <em>nest</em> it, within the <code>Fruits</code> component, then take the <code>Fruits</code> component and
nest it within the <code>TypesOfFood</code> component. The result should be a child component, nested within a parent component, which is 
nested within a parent component of its own!`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const TypesOfFruit = () => {
	return (
		<div>
			<h2>Fruits:</h2>
			<ul>
				<li>Apples</li>
				<li>Blueberries</li>
				<li>Strawberries</li>
				<li>Bananas</li>
			</ul>
		</div>
	);
};

const Fruits = () => {
	return (
		<div>
			{ /* change code below this line */ }

			{ /* change code above this line */ }
		</div>
	);
};

class TypesOfFood extends React.Component {
  constructor(props) {
  	super(props);

  }
  render() {
    return (
	    <div>
	    	<h1>Types of Food:</h1>
		    { /* change code below this line */ }
		
		    { /* change code above this line */ }
	    </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = 
`const TypesOfFruit = () => {
	return (
		<div>
			<h2>Fruits:</h2>
			<ul>
				<li>Apples</li>
				<li>Blueberries</li>
				<li>Strawberries</li>
				<li>Bananas</li>
			</ul>
		</div>
	);
};

const Fruits = () => {
	return (
		<div>
			{ /* change code below this line */ }
				<TypesOfFruit />
			{ /* change code above this line */ }
		</div>
	);
};

class TypesOfFood extends React.Component {
  constructor(props) {
  	super(props);

  }
  render() {
    return (
	    <div>
	    	<h1>Types of Food:</h1>
		    { /* change code below this line */ }
				<Fruits />
		    { /* change code above this line */ }
	    </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	let es5, mockedComponent, mockRender, shallowRender, passed = true;

	const error_1 = 'The TypesOfFood component returns a single <div> element.';
	const error_2 = 'TypesOfFood returns the Fruits Component.';
	const error_3 = 'The Fruits Component returns the TypesOfFruit Component.';
	const error_4 = 'The TypesOfFruit component returns the h2 and ul elements.';

	let testResults = [
		{
			test: 0,
			status: false,
			condition: 'Your JSX code was transpiled successfully.'
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

	const exportScript = '\n export default TypesOfFood'
	const modifiedCode = code.concat(exportScript);

	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}
	
	// shallow render the component with Enzyme
	try {
		mockRender = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// test 1:
	try {
		shallowRender = shallow(React.createElement(eval(es5)));
		assert.strictEqual(shallowRender.type(), 'div', error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	//test 2:
	try {
		assert.strictEqual(shallowRender.nodes[0].props.children[1].type.name, 'Fruits', error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		assert.strictEqual(mockRender.find('h2').node.innerHTML, 'Fruits:', error_3);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;		
	}

	// test 4:
	try {
		assert.strictEqual(mockRender.find('ul').node.innerText, 'ApplesBlueberriesStrawberriesBananas', error_4);
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
		const exportScript = '\n export default TypesOfFood'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}