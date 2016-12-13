/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Learn About Self-Closing JSX Tags`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>
So far, we’ve seen how JSX differs from HTML in a key way with the use of <code>className</code> vs. <code>class</code> for defining HTML classes. 
Another important way in which JSX differs from HTML is in the idea of the self closing tag.<br><br>

In HTML, almost all tags have both an opening and closing tag: <code>&lt;div&gt;&lt;/div&gt;</code>; the closing tag always has a forward slash before the tag name that we are closing. 
However, there are special instances in HTML where we have “self closing tags”, or tags that don’t require both an opening and closing tag before another tag can start. 
For example the line-break tag can be written as <code>&lt;br&gt;</code> or as <code>&lt;br /&gt;</code>, but should never be written as <code>&lt;br&gt;&lt;/br&gt;</code>, as it does not contain any content.<br><br> 

In JSX though, the rules are a little different. Any JSX element can be written with a self-closing tag, and every element must be closed.
So the line-break tag, for example, must always be written as <code>&lt;br /&gt;</code> in order to be valid JSX than can be transpiled. 
A <code>&lt;div&gt;</code>, on the other hand, can be written as <code>&lt;div /&gt;</code> or <code>&lt;div&gt;&lt;/div&gt;</code>. With
that first syntax there is no way to include anything in the <code>&lt;div&gt;</code>, of course.
We will see later that this syntax also comes in handy when rendering React components.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>
Fix the errors in the code below so that it is valid JSX that can be successfully transpiled and render it to the DOM using the <code>ReactDOM.render()</code> method.
We've provided a <code>&lt;div&gt;</code> with <code>id='challenge-node'</code> for you to render to. Be sure not to change any of the content but only to add self-closing tags where
they are needed.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = 
`const JSX = (
<div>
	{/* change code below this line */}
	<p>Welcome to React!<p> <br >
	<img src="https://goo.gl/ErGBQs" alt="React Logo">
	{/* change code above this line */}
</div>
);
// change code below this line
ReactDOM.render(JSX, document.getElementById('challenge-node'));`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = 
`const JSX = (
<div>
	{/* change code below this line */}
	<p>Welcome to React!</p> <br />
	<img src="https://goo.gl/ErGBQs" alt="React Logo" />
	{/* change code above this line */}
</div>
);
// change code below this line
ReactDOM.render(JSX, document.getElementById('challenge-node'));`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	let es5, mockedComponent, jsx, passed = true;

	let testResults = [
		{
			test: 0,
			status: false,
			condition: 'Your JSX code was transpiled successfully.'
		},
		{
			test: 1,
			status: false,
			condition: 'The constant JSX returns an <div> element.'
		},
		{
			test: 2,
			status: false,
			condition: 'The div contains a br tag.'
		},
		{
			test: 3,
			status: false,
			condition: 'The div contains an img tag.'
		},
		{
			test: 4,
			status: false,
			condition: 'The provided JSX element is rendered to the DOM node with id \'challenge-node\'.'
		}
	];

	const prepend = `(function() {`
	const apend = `; return JSX })()`
	const modifiedCode = prepend.concat(code).concat(apend);
	
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
		jsx = eval(es5);
	} catch (err) {
		passed = false;
	}

	// test 1:
	try {
		
		assert.strictEqual(jsx.type, 'div', 'The constant JSX returns an <div> element.');
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(jsx.props.children[2].type, 'br', 'The div contains a br tag.');
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		assert.strictEqual(jsx.props.children[3].type, 'img', 'The div contains an img tag.');
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		let testDiv = document.getElementById('challenge-node').childNodes[0].innerHTML.replace(/\s/g,'');
		assert(
			testDiv.includes('<p>WelcometoReact!</p>') &&
			testDiv.includes('<br><imgsrc="https://goo.gl/ErGBQs"alt="ReactLogo">'),
			'The provided JSX element is rendered as is to the DOM node with id \'challenge-node\'.'
		);
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;
	}	

	return {
		passed,
		testResults,
	}
	
}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const exportScript = `;\n export default JSX`
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = eval(es5);
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}