---
layout: page
title: Home
---

# Buttons

Buttons are used for **actions**, like in forms, while textual hyperlinks are used for **destinations**, or moving from one page to another.

## Default buttons

Use the standard—yet classy—`.btn` for form actions and primary page actions. These are used extensively around the site.

When using a `<button>` element, **always specify a `type`**. When using a `<a>` element, **always add `role="button"` for accessibility**.

{% example html %}
<button class="btn btn-default" type="button">Button button</button>
<a class="btn btn-default" href="#" role="button">Link button</a>
{% endexample %}

## Sizes

Buttons are availables in multiples sizes: Large, Normal, Small and Extra-Small.

{% example html %}
<button class="btn btn-default btn-lg" type="button">Large Button</button>
<button class="btn btn-default" type="button">Button</button>
<button class="btn btn-default btn-sm" type="button">Small button</button>
<button class="btn btn-default btn-xs" type="button">Extra Small button</button>
{% endexample %}
