# Statamic (by Official Docs)

This part of the guide will _not_ tell you about any alterations Parallax developers have made to Statamic to make it work better with our flow. It is just intended as an intro to the CMS as a comparison to Expose – how it differs, which bits are comparable etc.

I'm writing (Andy F) this as a bit of a running commentary to my learning/introduction to Statamic to help myself as much as anyone else, but thought I'd share.

All the main Statamic docs are available here: [Statamic Docs](https://docs.statamic.com/)

If you want to learn how Parallax have adapted Statamic to suit our own workflow, please see [Statamic by Parallax](/guides/statamic/by-parallax/)

## Setup

*Please follow* [these instructions](/guides/statamic/by-parallax/#setup) for the Parallax-modified version of Statamic created by Brad Cornes in early 2019.

That will have created a gulpfile with elixir configured

## Dependencies & build tools

1. `cd site/themes/<theme>`
2. `yarn`
3. `gulp` to compile assets

## .gitignore

```
local/cache/*
local/storage/*
local/temp/*
installer.php
site/themes/<theme>/css/*
```

## Routes

[Read more](https://docs.statamic.com/routing)

Expose handled routes via the SEO Panel (creating seo_titles and seo_urls entries in the DB), and manually via `config/routes.php` (Cake) or `routes/web.php` (Laravel)
Statamic handles routes in 2 ways, via the natural hierarchy Pages are set up in the Control Panel, and manually in `site/settings/routes.yaml`:

e.g.
```
/search:
  template: search-results
  title: Look What I Found!
  layout: my-layout
  show_sidebar: false
```

### Wildcard routes

```
routes:
  /news-articles/*: template2
```

### Creating variables from URLs

```
routes:
  /news-articles/{slug}: template2
```

The above would allow you to use
::: v-pre
`{{ slug }}`
:::
in your template

### Routing to controller logic

```
routes:
  /complicated/stuff: ComplicatedController@stuff
```

### Redirects

```
redirect:
  /old-location: /my-new/location
```

## Scope

[Read more](https://docs.statamic.com/cascade)

Variables are scoped into:
- Global – similar to `$global_page['something']` in Expose Cake,
- Page – similar to `$current_page['PageElement']['something']` and `$current_page['Page']['something']` in Expose Cake
- Tags – scoped parts of a page, such as `Taxonomies` e.g. News Category tags on a News Article, or `Collections` e.g. showing related News Articles on a News Article

To give you more control over the scope of your data, each URL's variables are aliased into the page scope. This means that you can access your page’s title with `page:title` and `title`, if it hasn’t be overridden in the local scope with another tag.

## Content types

| Type | Description | Example | Lives in |
| ---- | ----------- | ------- | -------- |
| Pages | Obvious | Homepage | `/site/content/pages` |
| Collections | Things you might have an index page to collect | News articles | `/site/content/collections` |
| Taxonomies | A system of classifying data | Categories/Tags | `/site/content/taxonomies` |
| Globals | Global editables | company_phone_number | `/site/content/globals` |
| Assets | Files | Images | `/site/content/assets/` |
| Users | Admin users | Site admin, client | `/site/users` |

[Please edit if not correct]: We appear (on LBA, Distill) to be using Pages, Assets & Globals.

## Page Title and Description

::: v-pre
`<title>{{ meta_title or title }}</title>`
:::

::: v-pre
`<meta name="description" content="{{ meta_description or description }}">`
:::

## Editables - Globals

- `site/content/globals` to add a .yaml file for referencing global editables

e.g.
```
phone: 01133226477
email: info@parall.ax
```

Then in the .html
```
{{ phone }}
```

```
{{ yield:footer }}
```
inside footer.html to allow to inject things into the footer on specific pages

```
{{ section:footer }}
    <h2>Something</h2>
{{ /section:footer }}
```

## Referencing images

### SVG

::: v-pre
`{{ theme:output src="img/something.svg" }}`
:::

### Image

::: v-pre
`{{ theme:img src="img/something.svg" }}"`
:::

## Custom Fields

Custom Fields are bits of data that can be made available on a page

## Fieldsets

Fieldsets are groups of Custom Fields

```
blocks:
  -
    set: hero
    photo: /assets/img/fireplace.jpg
    content: >
      # Heading

      Some content paragraph
  -
    set: panel
    header: Another heading
    content: >
    Here is some more text

    Here is some more text
```

etc.

- Fieldsets reside in `/settings/fieldsets`

## Themes

[Read more](https://docs.statamic.com/theming)

A theme is a collection of files and resources that dictate the look and feel for a Statamic site. Templates, CSS, JavaScript, images, and so on. These files are organized into a specific folder structure to ensure portability and compatibility.

Note: Parallax has [changed this a little](/guides/statamic/by-parallax/#themes) so assets are separated from markup

## Managing layouts / views

::: v-pre
`{{ template_content }}`
:::

instead of

::: v-pre
`echo $content_for_layout;`
:::

### Home template

::: v-pre
`site/content/pages/index.md`
:::

to set which page it uses for home

## Partials

Out of the box, Statamic uses this notation for partials:

::: v-pre
`{{ partial:nav }}`
:::

Expose Cake uses:

::: v-pre
`echo $this->element('nav')`
:::

Expose Laravel uses:

::: v-pre
`@include('elements.nav')`
:::

To make it more familiar, Parallax has [created a helper](/guides/statamic/by-parallax/#partials) for this

# Tags

Tags are dynamic template elements that give you the ability to fetch, filter, and display content from anywhere in your site, enhance and simplify your markup, and empower your users with dynamic features.

This is best [read on the official docs](https://docs.statamic.com/tags)

# Variables & Modifiers

Globals:

csrf_field, csrf_token, current_uri, current_url, environment, get, get_post, homepage, last_segment, locale, locale_full, locale_name, locale_url, now, old, post, response_code, segment_x, site_url, template, xml_header

View [full list of Variables here](https://docs.statamic.com/variables)

Modifiers give you the ability to manipulate the data of your variables on the fly. They can manipulate strings, filter arrays and lists, help you compare things, do basic math, simplify your markup, and even help you debug.

View [full list of Modifiers here](https://docs.statamic.com/modifiers)

# Content modelling

[Video tutorial](https://www.youtube.com/watch?v=N0d_V6RyGFo&list=PLVZTm2PNrzMwIRNH0h7CKEfALR25mUCqb&index=9)

Once you have some static HTML, we can make it dynamic through content modelling.

In Statamic there are a few ways to approach this:

1. Use the Control Panel's (web interface) fieldset builders to create the fields first, move the content/markup into it, or use the YAML file
2. Model the content, pick the appropriate field types later