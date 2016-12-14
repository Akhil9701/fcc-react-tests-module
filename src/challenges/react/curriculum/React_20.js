/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Using Props with Stateless Functional Components`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>So far, all the components you've been working with have rendered
a view based on some props data that we pass to them. They are, in fact, stateless functional components, just like the stateless
functional JSX elements we introduced earlier in this series. These components accept props as input, and, like pure functions, predictably
return the same view every time they are passed the same props. This behavior is very useful when we have applications with complex state
management. Now, you may be wondering what all the talk of state is about. Don't worry, we'll take a deep dive into state in the next challenge.
Before that, however, let's practice by reviewing everything we've learned about props.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've defined a <code>Campsite</code> component
for you which is currently rendering a <code>Camper</code> component as a child. However, this <code>Camper</code> component has not
been defined. Define <code>Camper</code> and assign it default props of <code>{ name: 'CamperBot' }</code>. Inside the <code>Camper</code>
component render whatever you want, but be sure to include a <code>p</code> element which includes only the <code>name</code> value passed
in as a <code>prop</code>. Finally, also define <code>propTypes</code> on the <code>Camper</code> component that expect <code>name</code>
to be a required <code>string</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper/>
      </div>
    );
  }
};
// change code below this line`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper/>
      </div>
    );
  }
};
// change code below this line

class Camper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
   return (
     <div>
       <p>{this.props.name}</p>
     </div>
   )
  }
};

Camper.propTypes = {
	name: React.PropTypes.string.isRequired
};

Camper.defaultProps = {
  name: 'CamperBot'
};
`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The component CampSite is rendered.';
	const error_2 = 'The component Camper is rendered.';
	const error_3 = 'The Camper component includes default props which assign the string \'Camperbot\' to the key name.';
	const error_4 = 'The Camper component includes prop types which require the name prop to be of type string.';
	const error_5 = 'The Camper component contains a p element with just the text from the name prop.';

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
		},
		{
			test: 5,
			status: false,
			condition: error_5
		}
	];

	let es5, mockedComponent, passed = true;

	const exportScript = '\n export default CampSite'
	const modifiedCode = code.concat(exportScript);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}

	// now we will try to shallow render the component with Enzyme's shallow method
	// you can also use mount to perform a full render to the DOM environment
	// to do this you must import mount above; i.e. import { shallow, mount } from enzyme
	try {
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.find('CampSite').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.find('Camper').length, 1, error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		// propTypes unavailable in production and throw warnings anyway
		// this was the only way I could devise to check that propTypes are included
		const noWhiteSpace = modifiedCode.replace(/\s/g, '');
		const verifyPropTypes = 'Camper.defaultProps={name:\'CamperBot\'}';
		assert.strictEqual(noWhiteSpace.includes(verifyPropTypes), true, error_3);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}	

		// test 4:
	try {
		const noWhiteSpace = modifiedCode.replace(/\s/g, '');
		const verifyDefaultProps = 'Camper.propTypes={name:React.PropTypes.string.isRequired';
		assert.strictEqual(noWhiteSpace.includes(verifyDefaultProps), true, error_4);
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;
	}

	// test 5:
	try {
		assert.strictEqual(mockedComponent.contains(<p>CamperBot</p>), true, error_5);
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
		const exportScript = '\n export default CampSite'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}