# Forms

{% example html %}
<form>
    <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    </div>
    <div class="form-group">
        <label for="exampleInputFile">File input</label>
        <input type="file" id="exampleInputFile">
        <p class="help-block">Example block-level help text here.</p>
    </div>
    <div class="form-group">
        <label>
            <input type="checkbox"> Check me out
        </label>
    </div>
    <button type="submit" class="btn btn-default">Submit</button>
</form>
{% endexample %}

Input can have different states:

{% example html %}
<div class="form-group">
    <input type="text" class="form-control" value="Normal state">
</div>
<div class="form-group">
    <input type="text" class="form-control" value="Disabled state">
</div>
<div class="form-group">
    <input type="text" class="form-control focus" value="Focus state">
</div>
{% endexample %}

And different sizes

{% example html %}
<div class="form-group">
    <input type="text" class="form-control input-lg" placeholder=".form-control.input-lg">
</div>
<div class="form-group">
    <input type="text" class="form-control" placeholder=".form-control">
</div>
<div class="form-group">
    <input type="text" class="form-control input-sm" placeholder=".form-control.input-sm">
</div>
<div class="form-group">
    <input type="text" class="form-control input-xs" placeholder=".form-control.input-xs">
</div>
{% endexample %}
