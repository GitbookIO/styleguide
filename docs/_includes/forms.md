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
        <label for="exampleInputSelect">Type</label>
        <select class="form-control" id="exampleInputSelect">
            <option>User</option>
            <option>Organization</option>
        </select>
    </div>
    <div class="form-group">
        <label for="exampleInputFile">File input</label>
        <input type="file" id="exampleInputFile">
        <p class="help-block">Example block-level help text here.</p>
    </div>
    <div class="checkbox">
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
    <input type="text" class="form-control" disabled value="Disabled state">
</div>
<div class="form-group">
    <input type="text" class="form-control focus" value="Focus state">
</div>
<div class="form-group has-error">
    <input type="text" class="form-control focus" value="Error state">
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

Extend form controls by adding text or buttons before, after, or on both sides of any text-based `<input>`. Use `.input-group` with an `.input-group-addon` to prepend or append elements to a single `.form-control`.

{% example html %}
<div class="form-group">
    <div class="input-group">
        <span class="input-group-addon" id="basic-addon1">@</span>
        <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
    </div>
</div>
<div class="form-group">
    <div class="input-group">
        <input type="text" class="form-control" placeholder="Recipient's username" aria-describedby="basic-addon2">
        <span class="input-group-addon" id="basic-addon2">@example.com</span>
    </div>
</div>
<div class="form-group">
    <div class="input-group">
        <span class="input-group-addon">$</span>
        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <span class="input-group-addon">.00</span>
    </div>
</div>
{% endexample %}
