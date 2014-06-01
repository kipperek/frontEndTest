var contactModal = "Message sent successfully<br /><span>(click anywhere to continue)</span>";
var loadGif = "<div id='load_div'></div>";
function hideFormErrors(){
	$('.errorWraper').fadeOut(300);
	$('.formWrap').removeClass('error');
}

function validateMail(mail){
	return mail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*))@(([a-zA-Z\-_0-9]+\.)+[a-zA-Z]{2,})$/i) ? false : true;
}

function placeModal(){
	$('#modal').css('height',0).css('width',0);
	$('#modalContent').css('top',0).css('left',0);


	var height = $(document).height();
	var width = $(document).width();
	var modalTop = height/2 - $('#modalContent').height()/2;
	var modalLeft = width/2 - $('#modalContent').width()/2;

	$('#modal').css('height',height).css('width',width);
	$('#modalContent').css('top',modalTop).css('left',modalLeft);
}
function resizeModal(w,h, func){
	var top = $(document).height()/2 - h/2;
	var left = $(document).width()/2 - w/2;
	$('#modalContent').animate({width: w, height: h,"top": top, "left": left},300,func);
}

function hideModal(){
	$('#modal').fadeOut(300);
	$('#modalContent').fadeOut(300);
}

function showMessage(){
	$('#modalWraper').fadeOut(300,function(){
		$('#modalContent').css('display','block');
		resizeModal(350,100, function(){
			$('#modalContent').css('display','table');
			$('#modalWraper').html(contactModal).fadeIn(200,function(){
				$('#modal').click(hideModal);
				$('#modalContent').click(hideModal);
			});
		});
	});
}

function showLoadModal(){
	$('#modalContent').css('width',60).css('height',60);
	placeModal();
	$('#modalWraper').html(loadGif);
	$('#modalContent').fadeIn(300).css('display','table');
	$('#modal').fadeIn(300);
	$(window).unbind( "resize" ).resize(function(){
			placeModal();
	});
}

function showValidationError(field,errorField,msg){
	$(errorField).stop().fadeIn(300).css('display','inline-block');
	$(errorField+' .errorDiv').text(msg);
	$(field).addClass('error');
}

function showContact(){
	$('#content').load("contents/contact.html",function(){
		shown = true;
		checkIfChanged();

		$('#content').fadeIn(300);

		//FORM SUBMITION - > VALIDATION AND SEND
		$('#contactForm').submit(function(e){
			e.preventDefault();
			hideFormErrors();
			var ifok = true;

			//Name empty
			if(!$('input[name=name]').val()){
				showValidationError('#nameWrap','#errorName','Value is required');
				ifok = false;
			}
			//Error empty
			if(!$('input[name=email]').val()){
				showValidationError('#mailWrap','#errorMail','Value is required');
				ifok = false;
			}else if(validateMail($('input[name=email]').val())){
				showValidationError('#mailWrap','#errorMail','E-mail must be in valid format');
				ifok = false;
			}

			if(ifok){
				showLoadModal();
				$('#contactForm')[0].reset();

				/* There should be $.ajax({});, but timeout for simulation */
				setTimeout(showMessage,1000);
			}
		});
	});
}