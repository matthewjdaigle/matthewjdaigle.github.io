---
layout: home
---


{% for group in site.data.publications %}
## {{group.year}}
{% for publication in group.publications %}
- {% for author in publication.authors %}
{% if forloop.last and publication.authors.size>1 %}and {% endif %}{% if author=='M. Daigle' %}<span class="name">{{author}}</span>{% else %}{{author}}{% endif %}{% if publication.authors.size>2 %}, {% endif %}{% if publication.authors.size<=2 and forloop.last %}, {% endif %}{% endfor %}
"{% if publication.url %}<a href="{{publication.url}}">{{publication.title}}</a>{% else %}{{publication.title}}{% endif %}," {% if publication.type=='Dissertation' %}PhD Dissertation, {% endif %}{% if publication.book != "" %}*{{publication.book}}*,{% endif %} {% if publication.volume %}vol. {{publication.volume}},{% endif %} {% if publication.number %}no. {{publication.number}},{% endif %} {% if publication.pages %}pp. {{publication.pages}},{% endif %} {% if publication.location %}{{publication.location}},{% endif %} {% if publication.year %}{{publication.month}} {{publication.year}}.{% else %}to appear.{% endif %}{% endfor %}
{% endfor %}
