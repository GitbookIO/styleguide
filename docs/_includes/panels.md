# Panels

{% example html %}
<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">Title</h3>
    </div>
    <div class="panel-body">
        Body of the panel
    </div>
    <div class="panel-footer">
        Optional footer of the panel
    </div>
</div>
{% endexample %}

Panels can also include a `.list-group`.

{% example html %}
<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">Title</h3>
    </div>
    <div class="list-group">
        <a href="#" class="list-group-item">Item 1</a>
        <a href="#" class="list-group-item active">Item 2</a>
        <a href="#" class="list-group-item">Item 3</a>
    </div>
</div>
{% endexample %}

And have different styles:

{% example html %}
<div class="panel panel-danger">
    <div class="panel-heading">
        <h3 class="panel-title">Title</h3>
    </div>
    <div class="panel-body">
        Body of the panel
    </div>
</div>
<div class="panel panel-warning">
    <div class="panel-heading">
        <h3 class="panel-title">Title</h3>
    </div>
    <div class="panel-body">
        Body of the panel
    </div>
</div>
<div class="panel panel-success">
    <div class="panel-heading">
        <h3 class="panel-title">Title</h3>
    </div>
    <div class="panel-body">
        Body of the panel
    </div>
</div>
<div class="panel panel-info">
    <div class="panel-heading">
        <h3 class="panel-title">Title</h3>
    </div>
    <div class="panel-body">
        Body of the panel
    </div>
</div>
{% endexample %}

Include a table in a panel:

{% example html %}
<div class="panel panel-default">
    <div class="panel-heading">
        <b>Title</b>
    </div>
    <div class="panel-body">
        Body
    </div>
    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>ID</th>
                <th>Updated</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td>PHP</td>
                <td>php</td>
                <td>1 month ago</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Javascript</td>
                <td>js</td>
                <td>1 month ago</td>
            </tr>
        </tbody>
    </table>
</div>
{% endexample %}

