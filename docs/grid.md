---
layout: default
title: Grid
order: 10
---

# Grid System

Grid systems are used for creating page layouts through a series of rows and columns that house your content.

* There are 12 columns per row
* Rows must be placed within a `.container`
* Use `.row` to create horizontal groups of columns.
* Content should be placed within columns, and only columns may be immediate children of rows.

{% example html %}
<div class="row">
    <div class="col-md-8">.col-md-8</div>
    <div class="col-md-4">.col-md-4</div>
</div>
{% endexample %}

{% example html %}
<div class="row">
    <div class="col-md-4">.col-md-4</div>
    <div class="col-md-4">.col-md-4</div>
    <div class="col-md-4">.col-md-4</div>
</div>
{% endexample %}

{% example html %}
<div class="row">
    <div class="col-md-6">.col-md-6</div>
    <div class="col-md-6">.col-md-6</div>
</div>
{% endexample %}

### Offsetting columns

Move columns to the right using `.col-md-offset-*` classes. These classes increase the left margin of a column by * columns. For example, `.col-md-offset-4` moves `.col-md-4` over four columns.

{% example html %}
<div class="row">
    <div class="col-md-4">.col-md-4</div>
    <div class="col-md-4 col-md-offset-4">.col-md-4 .col-md-offset-4</div>
</div>
<div class="row">
    <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
    <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
</div>
<div class="row">
    <div class="col-md-6 col-md-offset-3">.col-md-6 .col-md-offset-3</div>
</div>
{% endexample %}
