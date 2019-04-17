# Statamic (by Official Docs)

This part of the guide will _not_ tell you about any alterations Parallax developers have made to Statamic to make it work better with our flow. It is just intended as an intro to the CMS as a comparison to Expose – how it differs, which bits are comparable etc.

I'm writing (Andy F) this as a bit of a running commentary to my learning/introduction to Statamic to help myself as much as anyone else, but thought I'd share.

All the main Statamic docs are available here: [Statamic Docs](https://docs.statamic.com/)

If you want to learn how Parallax have adapted Statamic to suit our own workflow, please see [Statamic by Parallax](/guides/statamic/by-parallax/)

## Setup

1. Unzip
2. Rename to `<site>`
3. cd into `<site>`
4. valet link
5. `<site>`.site
6. `php please clear:site`
7. `<site>`.site/installer
8. Locales - change URL to `/`
9. Create user
10. Remove unnecessary sample files, keep & rename .env & .gitignore
11. Commit initial
12. `php please make:theme <theme>`, agree to make active

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

The following would allow you to use `{{ slug }}` in your template:
```
routes:
  /news-articles/{slug}: template2
```

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
| Assets | Files | Images | `/site/content/assets/ |
| Users | Admin users | Site admin, client | `/site/users` |

[Please edit if not correct]: We appear (on LBA, Distill) to be using Pages, Assets & Globals.

## Managing layouts / views

```
{{ template_content }}
```

instead of

```
echo $content_for_layout;
```

```
site/content/pages/index.md
```

to set which page it uses for home

## Partials

Out of the box, Statamic uses this notation for partials:

```
{{ partial:nav }}
```

Expose Cake uses:

```
echo $this->element('nav')
```

Expose Laravel uses:

```
@include('elements.some-element')
```

To make it more familiar, Parallax has [created a helper](/guides/statamic/by-parallax/#partials) for this

## Page Title and Description

```
<title>{{ meta_title or title }}</title>
```

```
<meta name="description" content="{{ meta_description or description }}">
```

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

```
{{ theme:output src="img/something.svg" }}
```

### Image

```
{{ theme:img src="img/something.svg" }}"
```

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