var toShow = null;
var shown = true;

function whichShow(what){
	shown = false;
	toShow = null;
	switch(what){
		default:
		case "about": changeActive("about"); showAbout();
			break;
		case "weather": changeActive("weather"); showWeather();
			break;
		case "contact": changeActive("contact"); showContact();
			break;
	}
}
//ANTI BUG SYSTEM
function checkIfChanged(){
	if(toShow){
		$('#content').stop().fadeOut(300,function(){
			whichShow(toShow);
		});
	}
}

function capitalize(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Change menu active div and document title
function changeActive(div){
	 document.title = 'Smart4Aviation - ' + capitalize(div);
	$('.menuItem').removeClass('active');
	$('.arrow').removeClass('arrow_active');

	$('#'+div).addClass('active');
	$('#'+div+' .arrow').addClass('arrow_active');
}

//Jquery ready
$(document).ready(function(){

	//MENU CLICK
	var menuClick = function(e){
		var id =$(this).attr('id');	
			location.hash = id;
			changeActive(id);
		
	};
	$('.menuItem').click(menuClick);

	//Routing
	$(window).on('hashchange',function(){
		var loc = location.hash.replace(/#/g,"");
		if(shown){
			$('#content').stop().fadeOut(300,function(){
				whichShow(loc);
			});
		}else{
			toShow = loc;
		}
	});

	
	//Show when site loaded
	whichShow(location.hash.replace(/#/g,""));
	
});//jquery.ready-end