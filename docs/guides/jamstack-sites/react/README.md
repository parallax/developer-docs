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

***Delete:***
- `/src/App.css`
- `/src/App.test.js`
- `/src/logo.svg`
- `/src/serviceWorker.js`
- `/public/logo512.png`
- `/public/favicon.ico` (to be replaced)
- Comments in `/public/index.html`
- Lines 5, 8-12 in `/src/index.js` relating to service workers

The last step here is to simply wipe the `/src/App.js` file with some starter boilerplate:

```
import React from "react"

const App = () => (
  <div>App</div>
)

export default App

```

At this point your app should be running on `http://localhost:3000/`, simply displaying "App" in plain text.

## Components

Most of your app code will be written in component files. They can be any size, from as small as a Button to as large as a full page layout, and you include these in a big tree to create an app.

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

```
import React from "react"

const MyButton = () => {
  return (
    <button>Click me</button>
  )
}

export default Button

```
This simply returns a `button` element that does nothing and has some default text inside. To make this show up in our app, we need to use import the component inside `/src/App.js`:
```
import React from "react"
import MyButton from "./components/MyButton"

const App = () => (
  <div>
    App
    <MyButton />
  </div>
)

export default App

```

WIP

<!-- [**Jigsaw**](https://jigsaw.tighten.co/docs/installation/) is a framework for rapidly building static sites using Laravel, the
same modern tooling that powers our web applications.

:::tip Notes

- Gatsby and Gridsome essentially do the same thing, just depends on whether you’d prefer to use Vue or React. The same is true when comparing Next / Nuxt.
- If the framework has a CLI use that instead of a repo. Jigsaw has an init command but nothing setup by default for our tailwind/postcss config.
- Most CLI tools have an option for using Tailwind.

:::
 -->
