---
layout: default
title: Miscellaneous
order: 15
---

# Pagination

{% example html %}
<div class="pagination">
    <ul class="pagination-pages">
        <li class="active"><a href="?page=0">0</a></li>
        <li><a href="?page=1">1</a></li>
        <li><a href="?page=2">2</a></li>
        <li><span class="separator">...</span></li>
        <li><a href="?page=3">3</a></li>
    </ul>
    <ul class="pagination-nav">
        <li><a href="?page=1">next page »</a></li>
    </ul>
</div>
{% endexample %}

# Labels

{% example html %}
<h1>Warning Label <span class="label label-warning">Warning !</span></h1>
<h1>Danger Label <span class="label label-danger">Danger !</span></h1>
<h1>Success Label <span class="label label-success">Success !</span></h1>
<h1>Info Label <span class="label label-info">Info !</span></h1>
{% endexample %}

# Badges

{% example html %}
<button class="btn" type="button">
    Default <span class="badge">10</span>
</button>
<button class="btn" type="button">
    Warning <span class="badge badge-warning">10</span>
</button>
<button class="btn" type="button">
    Danger <span class="badge badge-danger">10</span>
</button>
<button class="btn" type="button">
    Success <span class="badge badge-success">10</span>
</button>
<button class="btn" type="button">
    Info <span class="badge badge-info">10</span>
</button>
{% endexample %}

# Spinner

Spinner can be use to indicate a loading operation.

{% example html %}
<div class="gb-spinner spinner-sm"></div>
<div class="gb-spinner"></div>
<div class="gb-spinner spinner-lg"></div>
<div class="gb-spinner spinner-centered"></div>
{% endexample %}

