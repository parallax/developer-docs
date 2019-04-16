# Accessibility

Accessibility is something often disregarded in modern web development, but it is crucial to delivering the best experience to all of your users.

:::tip
This Chrome & Firefox extension will give you a report of your website’s accessibility issues in a sidebar.
http://wave.webaim.org/extension/ Alternatively, Chrome Lighthouse audits include an accessibility test which can be incredibly useful.

Also:
- [headingsMap](https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi?hl=en)
- [accessibilityInsights](https://accessibilityinsights.io/)
- [Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [WUHCAG Checklist](https://www.wuhcag.com/wcag-checklist/)
:::

## Minimum Accessibility Guidelines

At the very minimum every website should meet the following guidlines:

- **You should be able to tab through your site**<br>Radio buttons that are hidden in favour of nicely styled labels with sibling selectors should be positioned off screen rather than display: none; as this prevents them being tabbed through<br>tabindex=”-1” on inputs that need to be skipped, such as honeytraps.<br>Skip to content – use a hidden `<a href=”#content”>Skip to content</a>`  anchor. Alternatively use: [http://paypal.github.io/skipto/](http://paypal.github.io/skipto/)<br><br>
- **Any interactive elements (eg. carousels with keyboard controls) should be focusable (`tabindex="0"`)**<br><br>
- **All images should have an `alt` tag (even if it’s content is empty)**<br>Use alt text on all images except: spacers, icons, purely decorative, tests and CAPTCHA images.<br>
If labels contain an `<svg>` instead of text you can use aria-labelledby to describe what the label should say.<br><br>
- **All controls should have a label**<br>[Jump to 'Fifth rule of ARIA' for more](#fifth-rule-of-aria-use)<br><br>
- **Custom controls should have a `role` attribute**<br><br>
- **Custom controls should properly convey their state**<br><br>
- **The flow of DOM elements should make sense if you use CSS to reorder content**<br><br>
- **Heading hierarchy (`h1`-`h6`) should be used properly**<br>No more than a single `h1` on a page<br>No jumps in hierarchy (eg. `h1` to `h3`)**<br><br>
- **Colour contrasts should be WCAG AA compliant**<br>[Colour Contract Checker](https://webaim.org/resources/contrastchecker/)<br><br>
- **Focus styling should not be removed, unless it is for mouse interaction exclusively**<br>Consider using :focus-visible if you’re considering using `outline: none;` on `:focus`.<br>

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

## Landmark roles
Adding ARIA landmarks to your existing site, or to a site you are developing, provides useful global navigation features and aids understanding of content structure for users. Over time the necessity of explicitly assigning landmarks will lessen as browsers build in ARIA landmark roles to newer HTML element semantics. There is widespread support for ARIA landmarks in browsers and screen readers.
[https://developer.paciellogroup.com/blog/2013/02/using-wai-aria-landmarks-2013/#tablex](https://developer.paciellogroup.com/blog/2013/02/using-wai-aria-landmarks-2013/#tablex)

| ARIA Landmark Role | Description | HTML5 Sectioning Element |
|:-----------|:-----------|:-----------|
| role="banner" | A region that contains the prime heading or internal title of a page. Most of the content of a banner is site-oriented, rather than being page-specific. Site-oriented content typically includes things such as the logo of the site sponsor, the main heading for the page, and site-specific search tool. Typically this appears at the top of the page spanning the full width.<br><br>Note: Within any document or application, the author SHOULD mark no more than one element with the banner role. | No HTML5 element equivalent.<br><br>Recommended to be used on one header element per page if the header element is used as described for role=”banner”. |
| role="complementary" | A supporting section of the document that remains meaningful even when separated from the main content.There are various types of content that would appropriately have this role. For example, in the case of a portal, this may include but not be limited to show times, current weather, related articles, or stocks to watch. The content should be relevant to the main content; if it is completely separable, a more general role should be used instead. | `<aside>` The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography. |
| role="contentinfo" | Metadata that applies to the parent document.For example, footnotes, copyrights, and links to privacy statements would belong here.Note: Within any document or application, the author SHOULD mark no more than one element with the contentinfo role. | No HTML5 element equivalent. Recommended to be used on one footer element per page if the footer element is used as described for role=”contentinfo”. |
| role="form" | A region of the document that represents a collection of form-associated elements, some of which can represent editable values that can be submitted to a server for processing.	| Recommend using on a semantically neutral element such as a div not on a form element, as the element already has default role semantics exposed. |
| role="main" | The main content of a document. This marks the content that is directly related to or expands upon the central topic of the document. Within any document or application, the author SHOULD mark no more than one element with the main role.<br><br>Note: Within any document or application, the author SHOULD mark no more than one element with the main role. | The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application. |
| role="navigation" | A collection of navigational elements (usually links) for navigating the document or related documents. | The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links. |
| role="search" | The search tool of a web document. This is typically a form used to submit search requests about the site or to a more general Internet search service. | No HTML5 element equivalent.<br><br>Recommend using on a semantically neutral element such as a div or on a form element, if the form contains only search related controls and instructions. |


## ARIA
Accessible Rich Internet Applications (ARIA) is a set of attributes that define ways to make web content and web applications (especially those developed with JavaScript) more accessible to people with disabilities.

It supplements HTML so that interactions and widgets commonly used in applications can be passed to Assistive Technologies when there is not otherwise a mechanism. For example, ARIA enables accessible navigation landmarks in HTML4, JavaScript widgets, form hints and error messages, live content updates, and more.

### First Rule of ARIA Use
If you can use a native HTML element or attribute with the semantics and behavior you require already built in, instead of re-purposing an element and adding an ARIA role, state or property to make it accessible, then do so.

### Second Rule of ARIA Use
Do not change native semantics, unless you really have to. For example: Developer wants to build a heading that's a tab.

### Third Rule of ARIA Use
All interactive ARIA controls must be usable with the keyboard.
If you create a widget that a user can click or tap or drag or drop or slide or scroll, a user must also be able to navigate to the widget and perform an equivalent action using the keyboard.
All interactive widgets must be scripted to respond to standard keystrokes or keystroke combinations where applicable.
For example, if using role=button the element must be able to receive focus and a user must be able to activate the action associated with the element using both the enter (on WIN OS) or return (MAC OS) and the space key.

### Fourth Rule of ARIA Use
Do not use `role="presentation"` or `aria-hidden="true"` on a focusable element.
Using either of these on a focusable element will result in some users focusing on 'nothing'.

### Fifth Rule of ARIA Use
All interactive elements must have an accessible name.
An interactive element only has an accessible name when its Accessibility API accessible name (or equivalent) property has a value.

```html
<label for="userName">User Name</label>
<input type="text" id="userName" />
```

or

```html
<input type="text" aria-label="User Name" />
```

or

```html
<span id="p1">user name</span>
<input type="text" aria-labelledby="p1" />
```

## Common ARIA attributes

| Attribute | Description | Useful links |
| ------------- |-------------| -----|
| `aria-hidden` | Indicates that the element and all of its descendants are not visible or perceivable to any user as implemented by the author.| [1](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-hidden) |
| `aria-disabled` | Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.|   [1](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-disabled) |
| `aria-readonly` | Indicates that the element is not editable, but is otherwise operable. | [1](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-readonly) |
| `aria-label` | The aria-label attribute is used to define a string that labels the current element. Use it in cases where a text label is not visible on the screen. | [1](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) |
| `aria-labelledby` | If there is visible text labeling the element, use aria-labelledby instead of aria-label, link to an id on the element being used as a label. | [1](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute) |
| `aria-expanded` | When authors use collapsible content, for example, to hide navigation menus or lists of content, the triggering link or button should indicate to screen reader users whether the collapsable content below is in the expanded or in the collapsed state. The `aria-expanded` attribute is used for this purpose. | [1](https://developer.paciellogroup.com/blog/2012/05/html5-accessibility-chops-hidden-and-aria-hidden/) |