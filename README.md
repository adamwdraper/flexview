# Flexview

An HTML/CSS layout strategy for single page apps using Flexbox.

After building several large single page apps, I wanted to share the layout concepts that have worked very well for me.

View `index.html` for a full example of the HTML.  The styles are written in SCSS in `css/sass/uis`.

## Layout Overview

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

The main container of the layout. It's styles include:

```
display: flex;
flex-direction: column;
height: 100vh;
width: 100%;
```

### .ui-menu
This is a horizontal menu bar at the top of the layout. It's styles include:

```
flex: 0 0;
```
### .ui-views

This contains the "pages" of the app. It fills the rest of the page so there is no vertical scrolling. It's styles include:

```
flex: 1;
```

### .view
A `.view` goes inside `.ui-views`.  It is hidden by default and fades in when it has a class of `active`. It's styles include:

```
display: flex;
flex-direction: row;
transition: opacity 0.3s;
opacity: 0;
```

It has two types of children and can contain any number of them that it will display side by side:

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

`.view-main` and `.view-aside` share the same base flex styles (the only difference is there flex value):

```
display: flex;
flex-direction: column;
```

`.view-main` and `.view-aside` have several types of children:

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
  <div class="view-status">
    ...
  </div>
</div>
```
