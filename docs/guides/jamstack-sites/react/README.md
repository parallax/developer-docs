# React

## Introduction

React is a fantastic library for building dynamic web apps with JavaScript. Instead of using PHP and an MVC model for site architecture, each page is made up of multiple "components" which can be anything from a button to a full page layout.

## Prerequisites

While you can probably get around React if you know basic JS, it's probably a good idea to **have a proper handle on ES6 features**. A lot of things you'll be doing in React, such as destructuring, spreading values, mapping content etc is all ES6, not actually React code.

[This is a good place to start](http://es6-features.org/#Constants) (despite how ugly it looks) as it gives clear examples of what the different from "old" js is compared to new ES6 features. I think the main things to get your head around are:

- Back-tick strings and new string interpolation (dropping variables in strings)
- Pointer functions and how they differ from `function`, how they return values etc
- `let` and `const` and their best practices, to replace `var`
- Destructuring of arrays and objects
- The spread operator and how it's used to manipulate arrays / objects
- Computed property names are also very handy

You should also be aware of what [JSX](https://reactjs.org/docs/introducing-jsx.html) is. It is basically JS that looks like HTML but it has some behavioural / attribute differences.


## Installation / Setup

In this guide I'll talk through how to set up a new project based on Create React App (CRA). This will allow for learning / experimentation without getting mixed up about which features are from React and which are from a framework (such as Next or Gatsby).

1. Open terminal and navigate to your code directory:
```
cd path/to/code/directory
```
2. Run the installation command:
```
npx create-react-app my-project
```
3. Move into your new project:
```
cd my-project
```
4. Start up local dev:
```
npm run start
```
::: warning Doesn't run?
If this doesn't run, you should make sure you're on a recent version of node.
:::

At this point I usually cleanse the codebase by removing things that I don't want / isn't needed.

**Delete:**
- `/src/App.css`
- `/src/App.test.js`
- `/src/logo.svg`
- `/src/serviceWorker.js`
- `/public/logo512.png`
- `/public/favicon.ico` (to be replaced)
- Comments in `/public/index.html`
- Lines 5, 8-12 in `/src/index.js` relating to service workers

The last step here is to simply wipe the `/src/App.js` file with some starter boilerplate:

```jsx
import React from "react"

const App = () => (
  <div>App</div>
)

export default App

```

At this point your app should be running on `http://localhost:3000/`, simply displaying "App" in plain text.

# Components

## Basics

Most of your app code will be written in component files. They can be any size, from as small as a Button to as large as a full page layout, and you include these in a big tree to create an app.

### Folder Structure

How these are stored in your project is up to you, but I usually make a folder for each category that I think makes sense:

- `/src/components/` for most loose page elements
- `/src/components/forms/` if you have a bunch of related components (eg. form elements)
- `/src/layouts/` for broad level page structure / layout
- `/src/pages/` for each page of the app

In a basic CRA environment these folders mean nothing, but in frameworks such as [Next](https://nextjs.org/) they have built in routing and other magical things based on this structure.

### Creating a Component

Creating a component is as simple as adding a new `.js` file to your components folder, then following these steps:

1. Import React so it knows that this is a component file
2. Create a pointer function with an UpperCamelCase name
3. Return some JSX
4. Export the component so it's available for import in other files.

First lets create `/src/components/MyButton.js`:

```jsx
import React from "react"

const MyButton = () => {
  return (
    <button>Click me</button>
  )
}

export default Button

```
This simply returns a `button` element that does nothing and has some default text inside. To make this show up in our app, we need to use import the component inside `/src/App.js`:
```jsx
import React from "react"
import MyButton from "./components/MyButton"

const App = () => (
  <main>
    App
    <MyButton />
  </main>
)

export default App

```

::: warning Single Root Element Rule

React (and Vue for that matter) don't know how to deal with multiple loose JSX elements directly inside of your return value.

```jsx
import React from "react"

const Component = () => (
  <div>1</div>
  <div>2</div>
)

// Parsing error: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?
```

To solve this, you can either wrap your elements in another JSX element, or you can wrap them in a Fragment.

**Element Approach:** (renders as returned)

```jsx
import React from "react"

const Component = () => (
  <div>
    <div>1</div>
    <div>2</div>
  </div>
)
```

**Fragment Approach:** (renders as two loose divs)

```jsx
import React, { Fragment } from "react"

const Component = () => (
  <Fragment>
    <div>1</div>
    <div>2</div>
  </Fragment>
)
```

**Shorthand Fragment Approach:** (renders as two loose divs)

```jsx
import React from "react"

const Component = () => (
  <>
    <div>1</div>
    <div>2</div>
  </>
)
```

I tend to use the `<Fragment></Fragment>` approach as the `<></>` way borks most text editor's highlighting.
:::

### Displaying Values

To output a variable's value, simply wrap it in braces like so:

```jsx
const title = "Main Heading"
...
<h1>title</h1> // outputs "title" plain text
<h1>{ title }</h1> // outputs "Main Heading" value
```

You can also conditionally output data in your app, for example:

```jsx
<header>
  <h1>Hello World</h1>
  { hasSubtitle ? <h2>{ subtitle }</h2> : null }
</header>
```

## Props

Properties (props) are what you pass into your components - they are essentialy function arguments. These can be anything, but usually they will end up being Strings, Arrays, Objects or other Functions. These values can be passed both up and down your component tree.

### Passing Props Down

To pass a label prop into our MyButton component, we do the following:

```jsx
const App = () => (
  <div>
    <MyButton label="Press me" />
  </div>
)

const MyButton = props => (
  <button>{ props.label }</button>
)

```

Any number of properties can be passed into a component:

```jsx
const App = () => (
  const listItems = [ "Apple", "Raddish", "Ostrich" ]
  <section>
    <SomeList
      heading="My Favourite Snacks"
      items={ listItems }
    />
  </section>
)

const SomeList = props => (
  <>
    <h2>{ props.heading }</h2>
    <ul>
    {
      props.items.map((item, i) =>
        <li key={ `snack-${ item }-${ i }` }>{ item }</li>
      )
    }
    </ul>
  </>
)
```

::: tip Tip: Destructure and set defaults on props

We can avoid having to do `props.x`, `props.y`, `props.z` everywhere in this component by extracting values as they come in:

```jsx
const MyButton = ({ label }) => <button>{ label }</button>
```
A step ahead of this would be to supply defaults, in case there is an instance where this component isn't passed a value:

```jsx
const MyButton = ({ label = "Click here" }) => <button>{ label }</button>
```
This last example will contain "Click here" text, but if a `label` prop is passed in, it will overwrite it.

:::

::: warning Keys when mapping
  When you map through items in React, you need to add a key prop which has a unique value. This isn't accessible like props usually are, but it's needed to help React keep track of things.

  In a pinch you can use an array index for this (`key={ i }`), but some form of ID or unique string is much preferable (`key={ 'item-${ id }-${ i }' }`).
:::

## Events

Interacting with your components is simple in React, just use the appropriate event name and pass it a handler function (which is usually defined within the component as well).

**Click example:**

```jsx
const Button = () => {
  const handleClick = e => alert(`Clicked ${ e.target.innerText }!`)
  return (
    <button onClick={ handleClick }>Mr. Buttons</button>
  )
}
```
We can optionally perform this inside of an anonymous function - this approach is mostly used for simple functions:

```jsx
const Button = () => (
  <button onClick={ e => alert(`Clicked ${ e.target.innerText }!`) }>
    Mr. Buttons
  </button>
)
```

React supports most (if not all) JS events, and returns the same `event` object. You can typically guess the names for them with onEventName (eg. onMouseOver).

::: tip Comprehensive Events List
[You can find a full list of React events here](https://reactjs.org/docs/events.html)
:::

## Hooks

React hooks are basically a bunch of built-in functionality that you can use in your components. Hooks are at the heart of why most people choose to use and develop in React. I'll cover the usage of the main ones below.

### State (useState)

The concept of "state" is what makes React, reactive (hence the name). It's also React's biggest feature.

See the following example:

```jsx
import React from "react"

const Counter = () => {
  let count = 10
  return (
    <>
      <span>Current count: { count }</span>
      <button onClick={ () => count++ }>Increment</button>
      <button onClick={ () => count-- }>Decrement</button>
    </>
  )
}

export default Counter
```
Even though we are updating the value of `count`, the displayed value doesn't change. In traditional JS, we might fix this by adding an event listener to the buttons, selecting the span and updating the value manually in the listener. In react, we do this automatically by using state:

```jsx
import React, { useState } from "react"

const Counter = () => {
  const [ count, setCount ] = useState(10)
  return (
    <>
      <span>Current count: { count }</span>
      <button onClick={ () => setCount(count + 1) }>Increment</button>
      <button onClick={ () => setCount(count - 1) }>Decrement</button>
    </>
  )
}

export default Counter
```

Let's break down what we've done:

1. We imported `useState` from React
2. We replaced our regular variable with a variable and setter function, destructured from `useState`, and set the initial value to `10`
3. We updated the anonymous function call inside of `onClick` to use `setCount`, passing in a modifier, which updates a value of `count`

Because `count` is in state, the app knows that it needs to re-render to show the new changes to the user. On top of this, it knows *which* part to re-render, meaning that it only actually updates the areas where values have changed, **not** the full page.

We can mix this functionality with props too. Here's a more involved example:

```js
import React, { useState } from "react"

const ShoppingList = () => {
  const [ list, setList ] = useState([])
  const addItem = () => setList([ ...list, `Item ${ list.length }` ])
  return (
    <div>
      <ul>
        { list.map(item => <ShoppingListItem label={ item } key={ item } />) }
      </ul>
      <button onClick={ () => addItem() }>
        Add Item
      </button>
    </div>
  )
}

const ShoppingListItem = ({ label }) => {
  const [ bought, setBought ] = useState(false)
  return (
    <li
      onClick={ () => setBought(!bought) }
      style={{ textDecoration: bought ? "line-through" : "none" }}
    >
      { label }
    </li>
  )
}

export default ShoppingList

```
Here's a breakdown of what's happening here:

**ShoppingList:**
- An array called `list` is initialised in state to hold the shopping list
- We create a helper function that calls `setList()`, which:
  - Spreads the existing items, letting us keep existing data
  - Adds a new string to the end of the array, which will be 'Item 0', 'Item 1' etc.
- In the return, we:
  - Map through the list, sending the current item value into the `ShoppingListItem` component as a props called `label`
  - Create a button, which calls our helper function to add a new shopping list item when clicked

**ShoppingListItem:**
- We destructure the label value from props
- We set a `bought` state, which initialised as `false`
- In the return we output an `li`, and:
  - Add a click event which toggles the `bought` state via `setBought`
  - Conditionally add line-through styling based on if `bought` is true or false

Of course this example can be improved by having an input that can be used to set the name of the item and so on, but hopefully this shows how you can start to compose more dynamic components with very little code.

::: tip Re-renders

  React will **only** re-render when state updates. This is useful to know if you're trying to work out why something is / isn't updating.

:::

### Updates (useEffect)

WIP

### DOM References (useRef)

WIP

::: tip Comprehensive Hooks List
[You can find a full list of React hooks here](https://reactjs.org/docs/hooks-reference.html)
:::
