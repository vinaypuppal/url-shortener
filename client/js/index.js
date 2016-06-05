$(document).ready(function(){
	var Root_Url = window.location.href;
	var originalLink = Root_Url+"new/http://www.google.com";
	$("#original-link").text(originalLink);
	var links = '<a target="_blank" href="'+originalLink+'">Try This link</a>'
	$("#try-it").append(links);
});