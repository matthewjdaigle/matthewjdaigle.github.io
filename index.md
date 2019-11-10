---
layout: home
permalink: /
title: Matthew J. Daigle
---

## About

<img id="profile" width="200" src="/images/profile.jpeg">

I am a research scientist working in the areas of artificial intelligence, machine learning,
and data science. While I have worked in diverse application domains and topics such as electric cars and aircraft, robotics, cryogenic propellant systems, simulation, and airspace safety, my main research emphasis is in systems health management, that is, I develop algorithms through which machines can self-diagnose their condition and predict their future failures.

Currently, I am a Principal AI Scientist at [NIO USA, Inc.](https://www.nio.io). Prior to joining NIO, I was a Research Computer Scientist and Lead of the [Prognostics &amp; Diagnostics Group](http://prognostics.nasa.gov) at [NASA Ames Research Center](http://www.nasa.gov/centers/ames/home/index.html). Prior to that, I was an Associate
Scientist with the [University of California, Santa Cruz](http://ucsc.edu) at NASA Ames.

I received the B.S. degree in Computer Science and Computer and Systems Engineering from [Rensselaer Polytechnic Institute](http://rpi.edu), Troy, NY, in 2004, and the M.S. and Ph.D. degrees in Computer Science from [Vanderbilt University](http://vanderbilt.edu), Nashville, TN, in 2006 and 2008, respectively. From September 2004 to May 2008, I was a Graduate Research Assistant with the [Institute for Software Integrated Systems](http://www.isis.vanderbilt.edu/) and Department of Electrical Engineering and Computer Science, Vanderbilt University, Nashville, TN.

**Fun Fact**: I have an Erd&ouml;s number of 6, and a Bacon number of 4, resulting in an Erd&ouml;s-Bacon number of 10.

**Email**: me at matthewjdaigle.com

## Recent Publications
{% assign j = 0 %}
{% for group in site.data.publications %}
{% for publication in group.publications %}
{% if j<10 %}
- {% for author in publication.authors %}
{% if forloop.last and publication.authors.size>1 %}and {% endif %}{% if author=='M. Daigle' %}<span class="name">{{author}}</span>{% else %}{{author}}{% endif %}{% if publication.authors.size>2 %}, {% endif %}{% if publication.authors.size<=2 and forloop.last %}, {% endif %}{% endfor %}
"{% if publication.url %}<a href="{{publication.url}}">{{publication.title}}</a>{% else %}{{publication.title}}{% endif %}," {% if publication.type=='Dissertation' %}PhD Dissertation, {% endif %}{% if publication.book != "" %}*{{publication.book}}*,{% endif %} {% if publication.volume %}vol. {{publication.volume}},{% endif %} {% if publication.number %}no. {{publication.number}},{% endif %} {% if publication.pages %}pp. {{publication.pages}},{% endif %} {% if publication.location %}{{publication.location}},{% endif %} {% if publication.year %}{{publication.month}} {{publication.year}}.{% else %}to appear.{% endif %} [<span class="absButton" id="{{publication.id}}-AbstractButton" onclick="handleAbstract('{{publication.id}}-Abstract');" onmouseover="absLight('{{publication.id}}-AbstractButton');" onmouseout="unabsLight('{{publication.id}}-AbstractButton');">show abstract</span>]
<div class="abstract" id="{{publication.id}}-Abstract"> <b>Abstract:</b> {{publication.abstract}} </div>
{% endif %}
{% assign j = j | plus: 1 %}
{% endfor %}
{% endfor %}
