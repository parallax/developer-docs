# React

## Introduction

React is a fantastic library for building dynamic web apps with JavaScript. Instead of using PHP and an MVC model for site architecture, each page is made up of multiple "components" which can be anything from a button to a full page layout.

## Installation

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

At this point I usually cleanse the codebase by removing things that I don't want / isn't needed.
- Delete:
  - `App.css`
  - `App.test.js`
  - `logo.svg`
  - `serviceWorker.js`

WIP

<!-- [**Jigsaw**](https://jigsaw.tighten.co/docs/installation/) is a framework for rapidly building static sites using Laravel, the
same modern tooling that powers our web applications.

:::tip Notes

- Gatsby and Gridsome essentially do the same thing, just depends on whether you’d prefer to use Vue or React. The same is true when comparing Next / Nuxt.
- If the framework has a CLI use that instead of a repo. Jigsaw has an init command but nothing setup by default for our tailwind/postcss config.
- Most CLI tools have an option for using Tailwind.

:::
 -->
