# Dropdowns

Dropdown menu can be added to `.btn-group`.

{% example html %}
<div class="btn-group dropdown">
    <button class="btn btn-default" type="button">Toggle Dropdown <span class="dropdown-caret"></span></button>
    <ul class="dropdown-menu open">
        <li><a href="#">Entry 1</a></li>
        <li class="active">
            <a href="#">Entry 2 (active)</a>
            <ul class="dropdown-menu open">
                <li>
                    <a href="#">Entry 2.1 (hover me)</a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Entry 2.1.1</a></li>
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
    <button class="btn btn-default" type="button">Left</button>
    <ul class="dropdown-menu open">
        <li><a href="#">This is a long entry</a></li>
    </ul>
</div>
<div class="btn-group pull-right dropdown">
    <button class="btn btn-default" type="button">Right</button>
    <ul class="dropdown-menu open">
        <li><a href="#">This is a long entry</a></li>
    </ul>
</div>
{% endexample %}
