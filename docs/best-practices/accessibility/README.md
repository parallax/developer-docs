# Accessibility

Accessibility is something often disregarded in modern web development, but it is crucial to delivering the best experience to all of your users.

:::tip
A great way to test your accessibility is using [Wave](http://wave.webaim.org). Alternatively, Chrome Lighthouse audits include an accessibility test which can be incredibly useful.
:::

## Minimum Accessibility Guidelines

At the very minimum every website should meet the following guidlines:

- You should be able to tab through your site
- Any interactive elements (eg. carousels with keyboard controls) should be focusable (`tabindex="0"`)
- All images should have an `alt` tag (even if it’s content is empty)
- All controls should have a label
- Custom controls should have a `role` attribute
- Custom controls should properly convey their state
- The flow of DOM elements should make sense if you use CSS to reorder content
- Heading hierarchy (`h1`-`h6`) should be used properly
- No more than a single `h1` on a page
- No jumps in hierarchy (eg. `h1` to `h3`)
- Colour contrasts should be WCAG AA compliant
- Focus styling should not be removed, unless it is for mouse interaction exclusively
- 'Skip to content' link

## Additional Accessibility Best Practises

The following are some ideal best practises that are not critical, but will vastly increase the UX for a lot of users:

- Keyboard functionality / shortcuts should be implemented wherever possible / logical
- Toggle the ability to focus content based on its visibility (eg expanding navigation)
- SVGs and other non-image tag icons should have a label visible to a screen reader (Maybe use title, as it offers a hover for those who can’t determine the message of the icon)
- Interactive elements like links and buttons should indicate their purpose and state, ideally, every interactive button should have a hover state
- Use landmark elements and roles so users can bypass repetitive content
- Use `aria-describedby` in forms on information related to specific fields (eg. "Password must contain a special character")
- Use `aria-live` for updates and notification boxes so screen reader users will automatically be read out updates without having to focus them
- Colour contrasts should be WCAG AAA compliant
- Additional skip links
