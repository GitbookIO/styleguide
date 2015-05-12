# Tooltips

Add tooltips built entirely in CSS to nearly any element. Just add a few classes and an `aria-label` attribute.

Remember, `aria-label` and tooltip classes must go directly on `<button>` and `<a>` elements. Tooltip classes also conflict with icon classes, and as such, must go on a parent element instead of the icon.

{% example html %}
<button class="btn btn-default tooltipped tooltipped-o" aria-label="Bottom, right (default)" type="button">Button</button>
<button class="btn btn-default tooltipped tooltipped-nw tooltipped-o" aria-label="Top, left" type="button">.tooltipped-nw</button>
<button class="btn btn-default tooltipped tooltipped-w tooltipped-o" aria-label="Bottom, left" type="button">.tooltipped-w</button>
<button class="btn btn-default tooltipped tooltipped-ne tooltipped-o" aria-label="Top, right" type="button">.tooltipped-ne</button>
{% endexample %}

