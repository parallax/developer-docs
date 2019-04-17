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

## Referencing images

### SVG
```
{{ theme:output src="img/something.svg" }}
```

### Image
```
{{ theme:img src="img/something.svg" }}"
```

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

```
{{ partial:nav }}
```


instead of

```
echo $this->element('nav')
```

```
<title>{{ meta_title or title }}</title>
```

```
<meta name="description" content="{{ meta_description or description }}">
```

### Content types

| Type | Description | Example | Lives in |
| ---- | ----------- | ------- | -------- |
| Pages | Obvious | Homepage | `/site/content/pages` |
| Collections | Things you might have an index page to collect | News articles | `/site/content/collections` |
| Taxonomies | A system of classifying data | Categories/Tags | `/site/content/taxonomies` |
| Globals | Global editables | company_phone_number | `/site/content/globals` |
| Assets | Files | Images | `/site/content/assets/ |
| Users | Admin users | Site admin, client | `/site/users` |

[Please edit if not correct]: We appear (on LBA, Distill) to be using Pages, Assets & Globals.

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