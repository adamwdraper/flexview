# Flexview

An HTML/CSS layout strategy for single page apps using Flexbox.

After building several large single page apps, I wanted to share the layout concepts that have worked very well for me. It's fairly simple but versatile enough to cover many different layout possibilities.

Check out the [example demo](https://adamwdraper.github.io/flexview/).

View `docs/index.html` for a full example of the HTML. The styles are written in SCSS in `docs/css/sass/uis`. If you just want the CSS `flexview.css` is what you're looking for.

## Layout Overview

The basic components of the layout:

```
.ui-app
  .ui-menu
  .ui-views
    .view
      .view-status
      .view-main / .view-aside
        .view-header / .view-content / .view-footer
```

## HTML

```
<body>
  <div class="ui-app">
    <div class="ui-menu">
    ...
    </div>
    <div class="ui-views">
      <div class="view">...</div>
      ...
    </div>
  </div>
</body>
```

### .ui-app

The main container of the layout.

### .ui-menu
This is a horizontal menu bar at the top of the layout.

### .ui-views

This contains the "pages" (`.view`'s) of the app. It fills the rest of the page so there is no vertical scrolling.


### .view
This is the meat of the layout. A `.view` goes inside `.ui-views`, and each one represents a "page" of the app. It is hidden by default and fades in when it has a class of `active`.

A `.view` has two types of children. All children added to the view will display side by side:

```
<div class="view">
  <div class="view-main">
    ...
  </div>
  <div class="view-aside">
    ...
  </div>
</div>
```

`.view-main` and `.view-aside` have three types of children:

```
<div class="view-main">
  <div class="view-header">
    ...
  </div>
  <div class="view-content">
    ...
  </div>
  <div class="view-footer">
    ...
  </div>
</div>
```

`.view-header` and `.view-footer` share the same flex styles and sit at the top and bottom respectively:


`.view-content` expands to the size of the view and scrolls, so this is where the main information goes:


A `.view` also has a special type of child for loaders and other messges.  `.view-status` is hidden by default, but covers the entire view when the `.view` has a class of `.has-status`

```
<div class="view">
  <div class="view-main">
    ...
  </div>
  <div class="view-status">
    Loading...
  </div>
</div>
```

## Browser Support

As this uses Flexbox the browser support can be found at [caniuse.com](http://caniuse.com/#search=flex).
