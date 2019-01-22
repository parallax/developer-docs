# Javascript

Maintaining a consistent coding style between multiple developers, all working on different editors and with different style preferences helps keep our Javascript code both maintainable and easy to read.

## EditorConfig

The EditorConfig project consists of a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles. Most editors will automatically adapt things like tab size and indent style, just by having an `.editorconfig` file present in the project.

Our typical `.editorconfig` file looks like so:

```makefile
# top-most EditorConfig file
root = true

# Unix-style newlines, 4 spaces for indentation and default charset of utf-8
[*]
charset = utf-8
end_of_line = lf
indent_style = spacess
indent_size = 4
insert_final_newline = true

[*.{js,jsx,vue,json}]
indent_size = 2

# Tab indentation for makefile (no size specified, defaults to indent_size)
[Makefile]
indent_style = tab
```

## Prettier

We use the Prettier code formatter for our Javascript. This is a much more opinionated, yet still configurable code formatter. You can install Prettier globally using:

```sh
yarn global add prettier
```

or if you're using NPM:

```sh
npm i -g prettier
```

The following are the config options we use, you can add them to a `.prettierrc` file, or add them to a `"prettier"` object in your `package.json`.

```json
{
  "trailingComma": "none",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true
}
```

### Editor Plugins

There are Prettier plugins for [Atom](https://github.com/prettier/prettier-atom), [VSCode](https://github.com/prettier/prettier-vscode), and [Sublime](https://packagecontrol.io/packages/JsPrettier). These all have some way of being able to format your code automatically on save, which is incredibly useful.

:::tip
The VSCode plugin for Prettier does not read prettier settings from your `package.json`. To get around this you can either add a `.prettierrc` file to your project, or use the following settings in VSCode:

```json
{
  "prettier.trailingComma": "none",
  "prettier.tabWidth": 2,
  "prettier.semi": false,
  "prettier.singleQuote": true
}
```

:::

### Prettier & Husky

We like to ensure the code we commit is automatically checked before it is pushed. We can achieve this using Prettier in conjunction with Husky. To get started, install the following packages:

```sh
yarn add pretty-quick husky --dev
```

Or if you're using NPM:

```sh
npm i pretty-quick husky --save-dev
```

The simplest way to get set up is to add the following to your `package.json`:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged"
    }
  }
}
```

This will automatically run prettier against your Javascript files every time you try and commit, and automatically fix any issues. This is, of course, a basic configuration, and you will most likely want to expand your configuration to run things like unit tests and linters.
