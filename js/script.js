$(document).ready(function(){
	
	/* tooltip */
	$('.hasTooltip').tooltip();
	
	
	/*----------------------------
	SIDEMENU */
	$(".mobMenuBtn").click(function(){
		
		var windowWidth=$(window).width();
		var sideMenuWidth=$("#sideMenu").outerWidth();
		
		var windowHeight=$(window).height();
		var percentagescale=1/windowWidth*(windowWidth-sideMenuWidth);
		
		
		//animate in menu items
		var animatemenu=true;
		if(animatemenu){
			$("#sideMenu ul.menu li").css('opacity',0);
			$("#sideMenu ul.menu li").css('left','50px');
			$("#sideMenu ul.menu li").css('position','relative');
			var fdelay=0;
			$("#sideMenu ul.menu li").each(function(){
				
				$(this).transition({ opacity:1, left:0, delay:fdelay });
				
				fdelay+=150;
			});
		}
		//--
		
		$("#sideMenu").transition({ x: '-'+sideMenuWidth+'px' });
		
		if((windowWidth-sideMenuWidth)<250){
			$("#container").transition({ x: '-'+(sideMenuWidth/2)+'px' });
		} else {
			$("#container").transition({ scale: percentagescale });
		}
		
		$("body").height(windowHeight+'px');
		
		$("#containerOverlay").show();
		$("#containerOverlay").transition({ opacity: 0.6 });
		
	});
	
	$("#containerOverlay, #sideMenuHide").click(function(){
		var windowWidth=$(window).width();
		var sideMenuWidth=$("#sideMenu").outerWidth();
		
		if((windowWidth-sideMenuWidth)<150){
			$("#sideMenu,#container").transition({ x: '0px' });
		
		} else {
			$("#sideMenu").transition({ x: '0px' });
			$("#container").transition({ scale: 1 });
		}
		
		
		
		/* hide overlay */
		$("#containerOverlay").transition({ opacity: 0 },function(){
			$("#containerOverlay").hide();
		});
		
		$("body").height('');
	});
	
	
	
	
	
	
});