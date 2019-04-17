# Statamic (by Parallax)

This part of the guide will tell you about any alterations Parallax developers have made to Statamic to make it work better with our flow. You should first read [Statamic by Official Docs](/guides/statamic/by-official-docs/) and ideally before that view the [Statamic Docs](https://docs.statamic.com/), learning either by text or video.


## Partials

Out of the box, Statamic uses this notation for partials:

```
{{ partial:nav }}
```

Parallax has created a helper for this, to make it more familiar to Expose Laravel:

```
@include('elements.some-element')
```