//Set conteiner in the center of content
function centerContainer(){
	var padding = parseFloat($('#content').css('padding-top'));
	var left = $('#content').width() / 2 - ($('#container').width()/2) + padding;
	var top  = $('#content').height() / 2 - ($('#container').height()/2) + padding; 
	$('#container').css('top',top).css('left',left);
}

function showAbout(){
	$('#content').load("contents/about.html",function(){
		shown = true;
		checkIfChanged();
		//Center container and center when window is resized.
		centerContainer();
		$(window).unbind( "resize" ).resize(centerContainer);

		$('#content').fadeIn(300);
	});
}

