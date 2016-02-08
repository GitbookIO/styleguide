---
layout: default
title: Modals
order: 10
---

# Modals

Modal (`.modal`) can be used in 3 sizes: medium (default), small (`.modal-sm`) and large (`.modal-lg`). `.modal-backdrop` can be use to set a fixed backdrop for modals.

{% example html %}
<div class="modal">
    <div class="modal-heading">
        <h4>Title</h4>
        <a href="#" class="modal-close">&times;</a>
    </div>
    <div class="modal-body">
        Body of the modal
    </div>
    <div class="modal-footer">
        <button class="btn">Close</button>
    </div>
</div>
{% endexample %}
