---
layout: default
title: Popovers
order: 10
---

# Popovers

Add small overlay content, like those found in iOS, to any element for housing secondary information.

{% example html %}
<div class="popover popover-bottom">
    <div class="popover-arrow"></div>
    <div class="popover-heading">
        <h4>Title</h4>
    </div>
    <div class="popover-body">
        Body of the popover
    </div>
</div>
{% endexample %}

### Positionning

{% example html %}
<div class="popover popover-top">
    <div class="popover-arrow"></div>
    <div class="popover-heading">
        <h4>Title</h4>
    </div>
    <div class="popover-body">
        Body of the popover
    </div>
</div>
{% endexample %}

### Container

{% example html %}
<div class="popover-container">
    <button class="btn">Hello World</button>
    <div class="popover popover-top">
        <div class="popover-arrow"></div>
        <div class="popover-heading">
            <h4>Title</h4>
        </div>
        <div class="popover-body">
            Body of the popover
        </div>
    </div>
</div>

<div class="popover-container">
    <button class="btn">Hello World</button>
    <div class="popover popover-bottom">
        <div class="popover-arrow"></div>
        <div class="popover-heading">
            <h4>Title</h4>
        </div>
        <div class="popover-body">
            Body of the popover
        </div>
    </div>
</div>
{% endexample %}
