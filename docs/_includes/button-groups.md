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
