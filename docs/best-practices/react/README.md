# React Best Practices

[[toc]]

## Global State

Global state is tricky, often unnessecery. If you're writing a standard, content driven website, you **probably** shouldn't be using global state at all (if you're using content in multiple places, maybe consider using [markdown](https://hmsk.github.io/frontmatter-markdown-loader/react.html)). Depending on the scale and complexity of your project, you may want to consider several different options.

### Redux

Redux is the one-stop shop for global state management. It is a _large_ package with a lot of boilerplate that handles everything you could ever need from global state. It has a large ecosytem of add-ons and plugins and even has it's own Chrome extension. Redux works great for large apps.

| **Pros**                                                                                                                                         | **Cons**                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| :thumbsup: Works well on large scale apps                                                                                                        | :thumbsdown: Lots of boilerplate |
| :thumbsup: Access previous states                                                                                                                | :thumbsdown: Lots of jargon      |
| :thumbsup: Easy to debug ([Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related)) | :thumbsdown: Large library       |
| :thumbsup: Large ecosystem of add-ons                                                                                                            |                                  |

[Read more](https://redux.js.org/)

### Unstated

Unstated is a tiny, 200 bytes super high performance global state solution. It's super simple to learn and contains no boilerplate, but is very minimalistic. Unstated is great for small apps.

| **Pros**                                | **Cons**                                       |
| --------------------------------------- | ---------------------------------------------- |
| :thumbsup: 40x smaller than Redux       | :thumbsdown: Less features than Redux          |
| :thumbsup: Easy to learn api            | :thumbsdown: No Chrome extension               |
| :thumbsup: No boilerplate               | :thumbsdown: Hooks makes it slightly redundant |
| :thumbsup: Easy to add to existing apps |                                                |

[Read more](https://github.com/jamiebuilds/unstated-next)

### Zustand

Zustand is a very small, 650 bytes unopinionated global state solution. It uses hooks for stores and requires no boilerplate code. While not as feature-packed as redux, it does offer many impressive features for it's size including memoization, async actions, transient updates and middleware. Zustand is a great solution for medium sized apps.

| **Pros**                      | **Cons**                                                        |
| ----------------------------- | --------------------------------------------------------------- |
| :thumbsup: No boilerplate     | :thumbsdown: Bigger than Unstated, but less features than Redux |
| :thumbsup: Hook based stores  |                                                                 |
| :thumbsup: Middleware support |                                                                 |
| :thumbsup: Async actions      |                                                                 |

[Read more](https://github.com/jamiebuilds/unstated-next)
