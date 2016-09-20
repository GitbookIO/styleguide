---
layout: default
title: Buttons
order: 10
---

# Buttons

Buttons are used for **actions**, like in forms, while textual hyperlinks are used for **destinations**, or moving from one page to another.

### Default buttons

Use the standard—yet classy—`.btn` for form actions and primary page actions. These are used extensively around the site.

When using a `<button>` element, **always specify a `type`**. When using a `<a>` element, **always add `role="button"` for accessibility**.

{% example html %}
<button class="btn" type="button">Button button</button>
<a class="btn" href="#" role="button">Link button</a>
{% endexample %}

### Sizes

Buttons are availables in multiples sizes: Large, Normal, Small and Extra-Small.

{% example html %}
<button class="btn btn-lg" type="button">Large Button</button>
<button class="btn" type="button">Button</button>
<button class="btn btn-sm" type="button">Small button</button>
<button class="btn btn-xs" type="button">Extra Small button</button>
{% endexample %}

### Styles

Buttons can be filled to indicate a more important action:

{% example html %}
<button class="btn btn-primary" type="button">Primary button</button>
<button class="btn btn-success" type="button">Success button</button>
<button class="btn btn-danger" type="button">Danger button</button>
{% endexample %}

### Colored Text

Different styles of buttons are available to indicate different kind of actions.

{% example html %}
<button class="btn btn-text-primary" type="button">Primary button</button>
<button class="btn btn-text-success" type="button">Success button</button>
<button class="btn btn-text-danger" type="button">Danger button</button>
<button class="btn btn-link" type="button">Link button</button>
<button class="btn btn-text-link" type="button">Text Link button</button>
{% endexample %}

### Block Buttons

Create block level buttons—those that span the full width of a parent— by adding `.btn-block`.

{% example html %}
<button type="button" class="btn btn-primary btn-lg btn-block">Block level button</button>
<button type="button" class="btn btn-lg btn-block">Block level button</button>
{% endexample %}

### Outline

Outline buttons downplay an action as they appear like boxy links. Just add `.btn-outline` and go.

{% example html %}
<button class="btn btn-count" type="button">Default button</button>
<button class="btn btn-primary btn-outline" type="button">Primary button</button>
<button class="btn btn-success btn-outline" type="button">Success button</button>
<button class="btn btn-danger btn-outline" type="button">Danger button</button>
{% endexample %}

### States

Buttons can have different states:

{% example html %}
<div class="btn-toolbar">
    <button class="btn" type="button">Default</button>
    <button class="btn active" type="button">:active or .active</button>
    <button class="btn" disabled type="button">:disabled or .disabled</button>
</div>
<div class="btn-toolbar">
    <button class="btn btn-primary" type="button">Default</button>
    <button class="btn btn-primary active" type="button">:active or .active</button>
    <button class="btn btn-primary" disabled type="button">:disabled or .disabled</button>
</div>
{% endexample %}

### Buttons Labels

Buttons can contains a new-line label:

{% example html %}
<button class="btn btn-primary btn-block" type="button">
    Download for OS X
    <span class="btn-label">OS X 10.9 or later</span>
</button>
{% endexample %}

# Button Groups

Button groups and toolbars are used to group actions together.

{% example html %}
<div class="btn-group">
    <button class="btn" type="button">Button button</button>
    <a class="btn" href="#" role="button">Link button</a>
</div>
{% endexample %}

Toolbars can contain multiple group of buttons:

{% example html %}
<div class="btn-toolbar">
    <div class="btn-group">
        <button class="btn" type="button">Button button</button>
        <a class="btn" href="#" role="button">Link button</a>
    </div>
    <div class="btn-group">
        <button class="btn btn-danger" type="button">Danger button</button>
        <a class="btn btn-success" href="#" role="button">Success button</a>
    </div>
    <div class="btn-group">
        <button class="btn" type="button">Star</button>
        <a class="btn btn-count" href="#" role="button">0</a>
    </div>
</div>
{% endexample %}


Button groups can be justified, to make a group of buttons stretch at equal sizes to span the entire width of its parent. Also works with button dropdowns within the button group.

{% example html %}
<div class="btn-group btn-group-justified">
    <a class="btn" href="#" role="button">Button 1</a>
    <a class="btn" href="#" role="button">Button 2</a>
</div>
{% endexample %}

# Dropdowns

Dropdown menu can be added to `.btn-group`.

{% example html %}
<div class="btn-group dropdown">
    <button class="btn" type="button">Toggle Dropdown <span class="dropdown-caret"></span></button>
    <ul class="dropdown-menu open">
        <li class="dropdown-header">This is an header</li>
        <li><a href="#">Entry 1</a></li>
        <li class="active">
            <a href="#">Entry 2 (active)</a>
            <ul class="dropdown-menu open">
                <li>
                    <a href="#">Entry 2.1 (hover me)</a>
                    <ul class="dropdown-menu">
                        <li class="disabled"><a href="#">Entry 2.1.1</a></li>
                        <li><a href="#">Entry 2.1.2</a></li>
                    </ul>
                </li>
                <li><a href="#">Entry 2.2</a></li>
            </ul>
        </li>
        <li><a href="#">Entry 3</a></li>
    </ul>
</div>
{% endexample %}

`.pull-right` and `.pull-left` classes can be used to change the direction of the dropdown:

{% example html %}
<div class="btn-group pull-left dropdown">
    <button class="btn" type="button">Left</button>
    <ul class="dropdown-menu open">
        <li><a href="#">This is a long entry</a></li>
    </ul>
</div>
<div class="btn-group pull-right dropdown">
    <button class="btn" type="button">Right</button>
    <ul class="dropdown-menu open">
        <li><a href="#">This is a long entry <span class="help-label">Help Text</span></a></li>
    </ul>
</div>
{% endexample %}

# Hidden text button

Use `.hidden-text-expander` to indicate and toggle hidden text.

{% example html %}
<span class="hidden-text-expander">
  <button type="button" class="ellipsis-expander">&hellip;</button>
</span>
{% endexample %}


