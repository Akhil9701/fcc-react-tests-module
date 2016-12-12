#Free Code Camp React/Redux Challenge Development#

###This is an in-browser test module for developing the React/Redux challenges for the Free Code Camp Curriculum Expansion.###

[See this project live here and try out the challenges now](http://hysterical-amusement.surge.sh/)

**We need help QA'ing these!** [See here to contribute](https://github.com/bonham000/fcc-react-tests-module/blob/master/CONTRIBUTING.md)

*View [`CHALLENGE_MAP.md`](https://github.com/bonham000/fcc-react-tests-module/blob/master/CHALLENGE_MAP.md) to see an overview of the challenge curriculum*

---

To run this project locally clone the repository, install the dependencies, make sure the `src/index.js` file is rendering
`App` and not `DevApp`, and run `npm start`. Now you can view all the finished challenges live in the browser.

We're conducting tests on React components using [Enzyme documentation](http://airbnb.io/enzyme/) which look like this:

```javascript
assert.strictEqual(shallowRender.type(), 'div', 'The component renders a div element');
```

**Note:** *For development, we are using a `src/DevApp.js` file that is being git-ignored which allows us to just load the challenge we are working on into the app. You can create this file from the example `src/DevAppExample.js`. Be sure `src/index.js` is rendering the `DevApp` now if it isn't already.*

***

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).