//var domain = "http://matthewjdaigle.com/";
var domain = "./";


function highlight(o) {
	document.getElementById(o).style.color='#FFFFFF';
}
function unhighlight(o) {
	document.getElementById(o).style.color='#FFC670';
}

function borderlight(o) {
	document.getElementById(o).style.borderColor='#FFFFFF';
}
function unborderlight(o) {
	document.getElementById(o).style.borderColor='#FFC670';
}

function absLight(o) {
	document.getElementById(o).style.color='#FFFFFF';
}
function unabsLight(o) {
	document.getElementById(o).style.color='#FFC670';
}

var xmlHttp;
var pubList;

function showPage(page,name) {
	document.getElementById(page).innerHTML='['+name+']';
	if (page!="home") {
		document.getElementById("home").innerHTML="Home";
	}
	if (page!="experience") {
		document.getElementById("experience").innerHTML="Experience";
	}
	if (page!="software") {
		document.getElementById("software").innerHTML="Software";
	}
	if (page!="publications") {
		document.getElementById("publications").innerHTML="Publications";
	}
	document.getElementById("content").innerHTML="<br><br>loading...";
	document.getElementById('submenu').style.display='none';
	getPage(page+".html");
}

function getPage(url) {
	currentUrl = url;
	if (url=='publications.html') {
		xmlHttp=GetXmlHttpObject(loadPubPage);
	}
	else xmlHttp=GetXmlHttpObject(loadPage);
	xmlHttp.open("GET", domain+url , true);
	xmlHttp.send(null);
}

function showPubs() {
	containerId = arguments[0];
	buttonId = containerId+'Button';
	container = document.getElementById(containerId);
	button = document.getElementById(buttonId);
	if (button.innerHTML == 'show related publications') {
		//then show
		container.style.display = 'block';
		button.innerHTML = 'hide related publications';
		if (container.innerHTML == '') {
			container.innerHTML = '<br><br>loading...';
			loadPubs2(fillPubs,arguments);
		}
	}
	else {
		//hide
		container.style.display = 'none';
		button.innerHTML = 'show related publications';
	}
}

function fillPubs(argList) {
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete") {
		if (pubList==null) pubList = xmlHttp.responseXML.documentElement;
		container = argList[0];
		var content = '<ul>';
		papers = pubList.getElementsByTagName('paper');
		for (i=0; i<papers.length; i++) {
			paper = papers.item(i);
			id = paper.getAttribute('id');
			for (j=0; j<argList.length; j++) {
				if (argList[j]==id)	content += writePub(paper,container);
			}
		}
		content += '</ul>';
		document.getElementById(container).innerHTML = content;
	}
}

function loadPage() {
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete") {
		document.getElementById("content").innerHTML=xmlHttp.responseText;
	}
}

function loadPubPage() {
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete") {
		document.getElementById("content").innerHTML=xmlHttp.responseText;
		document.getElementById('pub-list').innerHTML = "<br><br>loading...";
		loadPubs();
		document.getElementById('submenu').style.display='block';
	}
}

function loadPubs() {
	if (pubList==null) {
		xmlHttp=GetXmlHttpObject(listPubs);
		xmlHttp.open("GET", domain+"pubs/publications.xml" , true);
		xmlHttp.send(null);
	}
	else listPubsByYear();
}

function loadPubs2(handler,argList) {
	if (pubList==null) {
		xmlHttp=GetXmlHttpObject(function () {handler(argList);});
		xmlHttp.open("GET", domain+"pubs/publications.xml" , true);
		xmlHttp.send(null);
	}
	else {
		handler(argList);
	}
}

function getXml(o,url) {
	//o.innerHTML = "loading...";
	//o.style.display='block';
	xmlHttp=GetXmlHttpObject(function () {stateChanged(o);});
	xmlHttp.open("GET", domain+url , true);
	xmlHttp.send(null);
}

function writePub(paper,prefix) {
	var content = '<li>';
	authors = paper.getElementsByTagName('author');
	for (j=0; j<authors.length; j++) {
		author = authors.item(j).firstChild.data;
		if (j==authors.length-1 && authors.length>1) {
			content += "and ";
		}
		if (author=="M. Daigle") {
			content += "<span class=name>"+author+"</span>";
		}
		else content += author;
		if (authors.length==2 && j==0) {
			content += " ";
		}
		else {
			content += ", ";
		}
	}
	url = paper.getAttribute('url');
	if (url!=null) {
		content += '"<a href="'+paper.getAttribute('url')+'">' + paper.getAttribute('title') + '</a>," ';
	}
	else {
		content += '"'+paper.getAttribute('title')+'," ';
	}
	type = paper.getAttribute('type');
	if (type=="dissertation") {
		content += "PhD Dissertation, ";
	}
	book = paper.getAttribute('book');
	if (book!=null) {
		content += "<i>"+book+"</i>, ";
	}
	school = paper.getAttribute('school');
	if (school!=null) {
		content += school+", ";
	}
	year = paper.getAttribute('year');
	if (year!="") {
		volume = paper.getAttribute('volume');
		number = paper.getAttribute('number');
		place = paper.getAttribute('location');
		if (volume!=null && volume!="") content += "vol. "+volume+", ";
		if (number!=null && number!="") content += "no. "+number+", ";
		pages = paper.getAttribute('pages');
		if (pages!=null && pages!='') {
			content += "pp. "+pages+", ";
		}
		if (place!=null) content += place+", ";
		content += paper.getAttribute('month')+" ";
		content += paper.getAttribute('year')+". ";
	}
	else content+="to appear. ";
	notes = paper.getAttribute('notes');
	if (notes!=null && notes!='') content += ' ('+notes+')';
	abstractItems = paper.getElementsByTagName('abstract');
	if (abstractItems.length!=0) {
		id = prefix+paper.getAttribute('id')+'-Abstract';
		buttonId = id+'Button';
		content += ' [<span class="absButton" id="'+buttonId
			+'" onClick="handleAbstract(\''+id+'\');" onmouseover="absLight(\''+buttonId
			+'\');" onmouseout="unabsLight(\''+buttonId+'\');">show abstract</span>]';
		content += '<div class="abstract" id="'+id+'">';
		content += '<b>Abstract:</b> '+abstractItems.item(0).firstChild.data;
		content += '</div>';
	}
	content += '</li>';
	return content;
}

function handleAbstract(abstractId) {
	button = document.getElementById(abstractId+'Button');
	abstractDiv = document.getElementById(abstractId);
	if (button.innerHTML == 'show abstract') {
		//then show it
		button.innerHTML = 'hide abstract';
		abstractDiv.style.display='block';
	}
	else {
		//then hide it
		button.innerHTML = 'show abstract';
		abstractDiv.style.display='none';
	}
}

function listPubsByType() {
	contentUnref = '';
	contentTechReport = '';
	contentConference = '';
	contentJournal = '';
	contentTheses = '';
	countUnref = 0;
	countTechReport = 0;
	countConference = 0;
	countJournal = 0;
	countTheses = 0;
	papers = pubList.getElementsByTagName('paper');
	for (i=0; i<papers.length; i++) {
		paper = papers.item(i);
		type = paper.getAttribute('type');
		pub = writePub(paper,'');
		if (type=='unrefereed') {
			contentUnref += pub;
			countUnref++;
		}
		else if (type=='technical report') {
			contentTechReport += pub;
			countTechReport++;
		}
		else if (type=='conference') {
			contentConference += pub;
			countConference++;
		}
		else if (type=='journal') {
			contentJournal += pub;
			countJournal++;
		}
		else if (type=='dissertation') {
			contentTheses += pub;
			countTheses++;
		}
	}
	var content = '';
	//content += '<div class="heading">Journal (' + countJournal + ')</div><ul>'+contentJournal+'</ul>';
	//content += '<div class="heading">Refereed Proceedings (' + countConference + ')</div><ul>'+contentConference+'</ul>';
	//content += '<div class="heading">Unrefereed Proceedings (' + countUnref + ')</div><ul>'+contentUnref+'</ul>';
	//content += '<div class="heading">Theses (' + countTheses + ')</div><ul>'+contentTheses+'</ul>';
	//content += '<div class="heading">Technical Reports (' + countTechReport + ')</div><ul>'+contentTechReport+'</ul>';
	content += '<div class="heading">Journal</div><ul>'+contentJournal+'</ul>';
	content += '<div class="heading">Refereed Proceedings</div><ul>'+contentConference+'</ul>';
	content += '<div class="heading">Unrefereed Proceedings</div><ul>'+contentUnref+'</ul>';
	content += '<div class="heading">Theses</div><ul>'+contentTheses+'</ul>';
	content += '<div class="heading">Technical Reports</div><ul>'+contentTechReport+'</ul>';
	document.getElementById('pub-list').innerHTML = content;
}

function listPubsByArea() {
	contentDiagnosis = '';
	contentPrognosis = '';
	contentPhysics = '';
	contentSim = '';
	contentMisc = '';
	countDiagnosis = 0;
	countPrognosis = 0;
	countPhysics = 0;
	countSim = 0;
	countMisc = 0;
	papers = pubList.getElementsByTagName('paper');
	for (i=0; i<papers.length; i++) {
		paper = papers.item(i);
		area = paper.getAttribute('area');
		pub = writePub(paper,'');
		if (area=='diagnosis') {
			contentDiagnosis += pub;
			countDiagnosis++;
		}
		if (area=='prognosis') {
			contentPrognosis += pub;
			countPrognosis++;
		}
		else if (area=='physics') {
			contentPhysics += pub;
			countPhysics++;
		}
		else if (area=='simulation') {
			contentSim += pub;
			countSim++;
		}
		else if (area=='miscellaneous') {
			contentMisc += pub;
			countMisc++;
		}
	}
	var content = '';
	//content += '<div class="heading">Diagnosis (' + countDiagnosis + ')</div><ul>'+contentDiagnosis+'</ul>';
	//content += '<div class="heading">Prognosis (' + countPrognosis + ')</div><ul>'+contentPrognosis+'</ul>';
	//content += '<div class="heading">Simulation (' + countSim + ')</div><ul>'+contentSim+'</ul>';
	//content += '<div class="heading">Physics (' + countPhysics + ')</div><ul>'+contentPhysics+'</ul>';
	//content += '<div class="heading">Miscellaneous (' + countMisc + ')</div><ul>'+contentMisc+'</ul>';
	content += '<div class="heading">Diagnosis</div><ul>'+contentDiagnosis+'</ul>';
	content += '<div class="heading">Prognosis</div><ul>'+contentPrognosis+'</ul>';
	content += '<div class="heading">Simulation</div><ul>'+contentSim+'</ul>';
	content += '<div class="heading">Physics</div><ul>'+contentPhysics+'</ul>';
	content += '<div class="heading">Miscellaneous</div><ul>'+contentMisc+'</ul>';
	document.getElementById('pub-list').innerHTML = content;
}

function listPubsByYear() {
	contentFC = '';
	content2016 = '';
	content2015 = '';
	content2014 = '';
	content2013 = '';
	content2012 = '';
	content2011 = '';
	content2010 = '';
	content2009 = '';
	content2008 = '';
	content2007 = '';
	content2006 = '';
	content2005 = '';
	countFC = 0;
	count2016 = 0;
	count2015 = 0;
	count2014 = 0;
	count2013 = 0;
	count2012 = 0;
	count2011 = 0;
	count2010 = 0;
	count2009 = 0;
	count2008 = 0;
	count2007 = 0;
	count2006 = 0;
	count2005 = 0;
	papers = pubList.getElementsByTagName('paper');
	for (i=0; i<papers.length; i++) {
		paper = papers.item(i);
		year = paper.getAttribute('year');
		pub = writePub(paper,'');
		if (year=='2016') {
			content2016 += pub;
			count2016++;
		}
		else if (year=='2015') {
			content2015 += pub;
			count2015++;
		}
		else if (year=='2014') {
			content2014 += pub;
			count2014++;
		}
		else if (year=='2013') {
			content2013 += pub;
			count2013++;
		}
		else if (year=='2012') {
			content2012 += pub;
			count2012++;
		}
		else if (year=='2011') {
			content2011 += pub;
			count2011++;
		}
		else if (year=='2010') {
			content2010 += pub;
			count2010++;
		}
		else if (year=='2009') {
			content2009 += pub;
			count2009++;
		}
		else if (year=='2008') {
			content2008 += pub;
			count2008++;
		}
		else if (year=='2007') {
			content2007 += pub;
			count2007++;
		}
		else if (year=='2006') {
			content2006 += pub;
			count2006++;
		}
		else if (year=='2005') {
			content2005 += pub;
			count2005++;
		}
		else if (year=='') {
			contentFC += pub;
			countFC++;
		}
	}
	var content = '';
	//content += '<div class="heading">Forthcoming (' + countFC + ')</div><ul>'+contentFC+'</ul>';
	//content += '<div class="heading">2015 (' + count2015 + ')</div><ul>'+content2015+'</ul>';
	//content += '<div class="heading">2014 (' + count2014 + ')</div><ul>'+content2014+'</ul>';
	//content += '<div class="heading">2013 (' + count2013 + ')</div><ul>'+content2013+'</ul>';
	//content += '<div class="heading">2012 (' + count2012 + ')</div><ul>'+content2012+'</ul>';
	//content += '<div class="heading">2011 (' + count2011 + ')</div><ul>'+content2011+'</ul>';
	//content += '<div class="heading">2010 (' + count2010 + ')</div><ul>'+content2010+'</ul>';
	//content += '<div class="heading">2009 (' + count2009 + ')</div><ul>'+content2009+'</ul>';
	//content += '<div class="heading">2008 (' + count2008 + ')</div><ul>'+content2008+'</ul>';
	//content += '<div class="heading">2007 (' + count2007 + ')</div><ul>'+content2007+'</ul>';
	//content += '<div class="heading">2006 (' + count2006 + ')</div><ul>'+content2006+'</ul>';
	//content += '<div class="heading">2005 (' + count2005 + ')</div><ul>'+content2005+'</ul>';
	if (countFC>0) {
		content += '<div class="heading">Forthcoming</div><ul>'+contentFC+'</ul>';
	}
	content += '<div class="heading">2016</div><ul>'+content2016+'</ul>';
	content += '<div class="heading">2015</div><ul>'+content2015+'</ul>';
	content += '<div class="heading">2014</div><ul>'+content2014+'</ul>';
	content += '<div class="heading">2013</div><ul>'+content2013+'</ul>';
	content += '<div class="heading">2012</div><ul>'+content2012+'</ul>';
	content += '<div class="heading">2011</div><ul>'+content2011+'</ul>';
	content += '<div class="heading">2010</div><ul>'+content2010+'</ul>';
	content += '<div class="heading">2009</div><ul>'+content2009+'</ul>';
	content += '<div class="heading">2008</div><ul>'+content2008+'</ul>';
	content += '<div class="heading">2007</div><ul>'+content2007+'</ul>';
	content += '<div class="heading">2006</div><ul>'+content2006+'</ul>';
	content += '<div class="heading">2005</div><ul>'+content2005+'</ul>';
	
	document.getElementById('pub-list').innerHTML = content;
}

function listPubsAll() {
	papers = pubList.getElementsByTagName('paper');
	var content = '<div class="heading">All Publications (' + papers.length + ')</div>';
	content += '<ul>';
	for (i=0; i<papers.length; i++) {
		paper = papers.item(i);
		content += writePub(paper,'');
	}
	content += '</ul>'
	document.getElementById('pub-list').innerHTML = content;
}

function listPubs() {
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete") {
		pubList = xmlHttp.responseXML.documentElement;
		listPubsByYear();
	}
}

function GetXmlHttpObject(handler) { 
	var httpRequest=null;
	if (window.XMLHttpRequest) { // Mozilla, Safari, IE7...
    		httpRequest = new XMLHttpRequest();
		//httpRequest.onload=handler;
		//httpRequest.onerror=handler;
		httpRequest.onreadystatechange=handler;
	} else if (window.ActiveXObject) { // stinky old IE
    		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		httpRequest.onreadystatechange=handler;
	}
	return httpRequest;
}
