# Button Groups

Button groups and toolbars are used to group actions together.

{% example html %}
<div class="btn-group">
    <button class="btn btn-default" type="button">Button button</button>
    <a class="btn btn-default" href="#" role="button">Link button</a>
</div>
{% endexample %}

Toolbars can contain multiple group of buttons:

{% example html %}
<div class="btn-toolbar">
    <div class="btn-group">
        <button class="btn btn-default" type="button">Button button</button>
        <a class="btn btn-default" href="#" role="button">Link button</a>
    </div>
    <div class="btn-group">
        <button class="btn btn-danger" type="button">Danger button</button>
        <a class="btn btn-success" href="#" role="button">Success button</a>
    </div>
</div>
{% endexample %}
