---
layout: default
title: Utilities & Markdown
order: 14
---

# Utilities

For faster mobile-friendly development, use these utility classes for showing and hiding content by device via media query. Also included are utility classes for toggling content when printed.

|  | Extra small devices(<768px) | Small devices (≥768px) | Medium devices (≥992px) | Large devices (≥1200px) |
| `.hidden` | Hidden | Hidden | Hidden | Hidden |
| `.hidden-xs` |  Hidden | **Visible** | **Visible** | **Visible** |
| `.hidden-sm` | **Visible** | Hidden | **Visible** | **Visible** |
| `.hidden-md` | **Visible** | **Visible** | Hidden | **Visible** |
| `.hidden-lg` | **Visible** | **Visible**| **Visible** | Hidden |

# Links

When you need a hyperlink to not be @gb-brand-primary, use a `.muted-link` or `.underlined-link`.

{% example html %}
Here is some example text. <a class="muted-link" href="#">A muted link. </a><a class="underlined-link" href="#">And an underlined link.</a>
{% endexample %}

# Markdown

HTML from Markdown following [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/) syntax can be styled easily using `.gb-markdown`.

{% example html %}
<div class="gb-markdown">
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
</div>
{% endexample %}

