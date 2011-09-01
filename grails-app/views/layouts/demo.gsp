<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	
	<title><g:layoutTitle default="Grails Rest API Example" /></title>
	<meta name="author" content="The IDEA Center">
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
	<link rel="stylesheet" href="${resource(dir:'css',file:'style.css?v=2')}" />
	
	<g:layoutHead />
</head>
<body>

	<g:layoutBody />
    	
    <g:pageProperty name="page.theEnd" default=""/>
    
	<script src="js/json2.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
	<script>!window.jQuery && document.write(unescape('%3Cscript src="${resource(dir:'js',file:'libs/jquery-1.5.1.min.js')}"%3E%3C/script%3E'))</script>
	<script src="${resource(dir:'js',file:'libs/underscore-min.js')}"></script>
    <script src="${resource(dir:'js',file:'libs/backbone-min.js')}"></script>
	
    <script src="js/GrailsCollection.js"></script>
    <script src="js/GrailsModel.js"></script>
    <script src="js/Person.js"></script>
    <script src="js/Task.js"></script>
	
	<script src="${resource(dir:'js',file:'script.js')}"></script>

	<g:pageProperty name="page.footerScript" default=""/>
	
</body>
</html>