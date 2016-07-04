---
layout: default
title: Navigation
order: 10
---

# Page head

`.pagehead` can be used to display a horrizontal navigation bar before main content.

The bar can contains some heading content, a menu or a search form.

{% example html %}
<div class="pagehead">
    <div class="container">
        <h1 class="head-heading">Explore GitBook</h1>

        <form class="search-bar hidden-xs hidden-sm pull-right" method="get" action="/search">
            <i class="octicon octicon-search"></i><input type="text" name="q" value="" class="form-control" placeholder="Search Books">
        </form>
    </div>
</div>
{% endexample %}

### With menu bar

By default the menu is centered, it can be position on the left or right by adding the classes `.pull-left` or `.pull-right`.

{% example html %}
<div class="pagehead">
    <div class="container">
        <ul class="head-menu pull-right">
            <li>
                <a href="#about">
                    About
                </a>
            </li>
            <li class="active">
                <a href="#contact">
                    Contact
                </a>
            </li>
            <li>
                <a href="#terms">
                    Terms of service
                </a>
            </li>
        </ul>
    </div>
</div>
{% endexample %}


### With an introduction and a menu

{% example html %}
<div class="pagehead">
    <div class="head-intro">
      <div class="container">
        <h1>Contact Us</h1>
        <p class="lead">Send us an email and receive a response.</p>
      </div>
    </div>
    <div class="container">
        <ul class="head-menu pull-left">
            <li>
                <a href="#about">
                    About
                </a>
            </li>
            <li class="active">
                <a href="#contact">
                    Contact
                </a>
            </li>
            <li>
                <a href="#terms">
                    Terms of service
                </a>
            </li>
        </ul>
    </div>
</div>
{% endexample %}

# List Groups

{% example html %}
<div class="list-group">
    <a href="#" class="list-group-item">Item 1</a>
    <a href="#" class="list-group-item active">Item 2</a>
    <a href="#" class="list-group-item">Item 3</a>
</div>
{% endexample %}

Icons, badges and images can also be added to list items:

{% example html %}
<div class="list-group">
    <a href="#" class="list-group-item"><img class="list-image" src="https://avatars2.githubusercontent.com/u/845425?v=3&s=460" /> Image</a>
    <a href="#" class="list-group-item active"><i class="octicon octicon-book"></i> Icon on the left</a>
    <a href="#" class="list-group-item"><i class="octicon octicon-book pull-right"></i> Icon on the right</a>
    <a href="#" class="list-group-item"><span class="badge">10</span> Badge</a>
</div>
{% endexample %}

# Filter List

A vertical list of filters.

{% example html %}
<ul class="filter-list">
  <li>
    <a href="#" class="filter-item selected">
      <span class="count">21</span>
      First filter
    </a>
  </li>
  <li>
    <a href="#" class="filter-item">
      <span class="count">3</span>
      Second filter
    </a>
  </li>
  <li>
    <a href="#" class="filter-item">
      Third filter
    </a>
  </li>
</ul>
{% endexample %}

# Tabs

{% example html %}
<div class="tabs">
    <ul class="tabs-nav">
        <li>
            <a href="#github" data-toggle="tab">My Books</a>
        </li>
        <li class="active">
            <a href="#followers" data-toggle="tab">Followers</a>
        </li>
    </ul>
    <div class="tabs-content">
        <div class="tab-pane" id="books">...</div>
        <div class="tab-pane active" id="followers">...</div>
    </div>
</div>
{% endexample %}

Justified navigation:

{% example html %}
<div class="tabs">
    <ul class="tabs-nav justified">
        <li>
            <a href="#github" data-toggle="tab">My Books</a>
        </li>
        <li class="active">
            <a href="#followers" data-toggle="tab">Followers</a>
        </li>
    </ul>
</div>
{% endexample %}

