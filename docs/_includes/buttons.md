# Buttons

Buttons are used for **actions**, like in forms, while textual hyperlinks are used for **destinations**, or moving from one page to another.

### Default buttons

Use the standard—yet classy—`.btn` for form actions and primary page actions. These are used extensively around the site.

When using a `<button>` element, **always specify a `type`**. When using a `<a>` element, **always add `role="button"` for accessibility**.

{% example html %}
<button class="btn btn-default" type="button">Button button</button>
<a class="btn btn-default" href="#" role="button">Link button</a>
{% endexample %}

### Sizes

Buttons are availables in multiples sizes: Large, Normal, Small and Extra-Small.

{% example html %}
<button class="btn btn-default btn-lg" type="button">Large Button</button>
<button class="btn btn-default" type="button">Button</button>
<button class="btn btn-default btn-sm" type="button">Small button</button>
<button class="btn btn-default btn-xs" type="button">Extra Small button</button>
{% endexample %}

### Styles

Different styles of buttons are available to indicate different kind of actions.

{% example html %}
<button class="btn btn-primary" type="button">Primary button</button>
<button class="btn btn-success" type="button">Success button</button>
<button class="btn btn-danger" type="button">Danger button</button>
<button class="btn btn-warning" type="button">Warning button</button>
<button class="btn btn-link" type="button">Link button</button>
{% endexample %}

### Filled Buttons

Buttons can be filled to indicate a more important action, using `.btn-fill`.

{% example html %}
<button class="btn btn-primary btn-fill" type="button">Primary button</button>
<button class="btn btn-success btn-fill" type="button">Success button</button>
<button class="btn btn-danger btn-fill" type="button">Danger button</button>
<button class="btn btn-warning btn-fill" type="button">Warning button</button>
{% endexample %}

### States

Buttons can have different states:

{% example html %}
<div class="btn-toolbar">
    <button class="btn btn-default" type="button">Default</button>
    <button class="btn btn-default active" type="button">:active or .active</button>
    <button class="btn btn-default" disabled type="button">:disabled or .disabled</button>
</div>
<div class="btn-toolbar">
    <button class="btn btn-primary btn-fill" type="button">Default</button>
    <button class="btn btn-primary btn-fill active" type="button">:active or .active</button>
    <button class="btn btn-primary btn-fill" disabled type="button">:disabled or .disabled</button>
</div>
{% endexample %}
