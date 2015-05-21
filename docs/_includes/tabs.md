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