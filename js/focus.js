/**
 * @package     Joomla.Site
 * @subpackage  Templates.protostar
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 * @since       3.2
 */

(function($)
{
	
	var wheight;
	var menutoggled=false;
	$(document).ready(function(){
		
		
		windowResized();
		setTimeout(function() {
		 	windowResized();
		}, 200);
		$( window ).resize(function() {
			windowResized();
		});
		
		
		
		
		
		
		/* fExpand */
		$(document).on('click','.fExpand .fExpandTitle',function(){
			if($(this).parents('.fExpandItems')[0]){
				if(!$(this).closest('.fExpand').hasClass('active')){
					$(this).parents('.fExpandItems').find('.fExpand').removeClass('active');
				}
			}
			
			$(this).closest('.fExpand').toggleClass('active');
		});
		
		
		//------------------
		// Info icon
		//------------------
		// Popup info. HTML:
		/*
		<span class="infoIcon">
        	<div class="iconRound">i</div>
			<div class="infoContent">
				Tekstballon met info
			</div>
        </span>
		*/
		$('.infoIcon').hover(function(){
			//auto fix the position of the infoContent based on position to window
			var offset = $(this).offset();
			var closetotop = offset.top - $(window).scrollTop();
			if(closetotop < $(this).find('.infoContent').outerHeight()){
				console.log('te dicht bij top');
				
				$(this).addClass('infoBottom');
			} else {
				$(this).removeClass('infoBottom');
			}
			
			if(offset.left < $(this).find('.infoContent').outerWidth()){
				console.log('te dicht bij linkerkant');
				
				$(this).addClass('infoRight');
			} else {
				$(this).removeClass('infoRight');
			}
		});
		
		//---
		
		
		
		
		
		//------------------
		// Pop-up
		//------------------
		// Add a modal for a click. HTML:
		/*
		<span class="popup-btn">
        	<div class="btn">Popup</div>
			<div class="popup">
				<span class="btn-close popup-close"><span class="fa fa-close"></span></span>
				Popup inhoud
			</div>
        </span>
		*/
		jQuery(document).on("click",".popup-btn:not('.poppedup')",function(e){
			console.log('do popup');
			if(jQuery(this).find(".popup")[0]){
				console.log('popup inside');
				
				jQuery(this).find(".popup").show();
				jQuery(this).find(".popup").addClass('opened');
				jQuery(this).addClass('poppedup');
			} else {
				console.log('search popup by attr');
				
				var attrname = jQuery(this).attr("data-popupname");
				jQuery('.popup.popup-'+attrname).show();
				jQuery('.popup.popup-'+attrname).addClass('opened');
				
			}
			
			
			
		});
		jQuery(document).on("click",".popup-close",function(e){
			closePopup(jQuery(this));		
		});
		//---
		
		
		
		
		
		//------------------
		// Scrollto
		//------------------
		// add data-scrollto=".classname" to an element, to smooth scroll to the element with that class
		// Options:
		// data-scrolltoadd="-50" -> add (or substract) a value to the scrollto position of element
		$(document).on('click','[data-scrollto]',function(e){
			
			e.preventDefault();
			
			
			
			var scrollto=$(this).attr('data-scrollto');
			if(scrollto=='parent'){
				scrollto=$(this).parents('div');
			} else {
				scrollto=$(''+scrollto);
			}
			
			var scrolltop= $(scrollto).offset().top;
			
			var addscroll=$(this).attr('data-scrolltoadd');
            if(typeof addscroll !== typeof undefined && addscroll !== false){
            	addscroll=parseFloat(addscroll);
            	scrolltop+=addscroll;
            }
            var addscrollbottom=$(this).attr('data-scrolltobottom');
            if(typeof addscrollbottom !== typeof undefined && addscrollbottom !== false){
            	scrolltop+=$(scrollto).outerHeight();
            }
            
			$('html, body').animate({scrollTop:scrolltop}, '500', 'swing', function() {});
		});
		//---
		
		
		
		
		
		
		
		//------------------
		// Scrollto top btn
		//------------------
		// 
		
		$(document).scroll(function(){
			var currentScrollTop = $(document).scrollTop();
			
			
			if(currentScrollTop>0){
				jQuery('#scrollDown').addClass("inv");
			} else {
				jQuery('#scrollDown').removeClass("inv");
			}
				
			if(currentScrollTop>wheight && $('.scrollToTop').hasClass('hidden')){
				$('.scrollToTop').removeClass('hidden');
				$('.scrollToTop').addClass('show');
				console.log('show btn');
			} else if(currentScrollTop<=wheight && $('.scrollToTop').hasClass('show')) {
				$('.scrollToTop').removeClass('show');
				$('.scrollToTop').addClass('hidden');
				console.log('hide btn');
			}
		});
		
		
		
		jQuery('#scrollDown').click(function(){
			$('html, body').animate({scrollTop:(wheight-74)}, '500', 'swing', function() {});
		});
		
		//---
		
		
		
		
		//------------------
		// Stickme
		//------------------
		// Add class stickme to items you want to stick (position fixed) when on top of screen
		// Options: 
		// data-topoffset="50" -> offset of 50px to top
		// data-fixheight="fixedTop" -> unique class to prevent height to bounce; just make up a unique classname
		setTimeout(function() {
		 	focusStickInit();
		}, 500);
		//---
		
		
		//------------------
		// triggerclick
		//------------------
		// Trigger a click on another element
		// <div data-triggerclick="#otherdiv"></div>
		
		$('[data-triggerclick]').each(function(){
			
			$(this).click(function(){
				var clickelement = jQuery(this).attr('data-triggerclick');
				$(''+clickelement).trigger('click');
			});
		});
		
		//---
		
		
		
		
		
		
		
		//------------------
		// Paralax
		//------------------
		// Add a paralax bg: <div class='paralax' data-depth='1.5'><div class='paralaxBg'></div></div>
		
		$(window).scroll(function (e) {
			paralaxScroll();
		});
		paralaxScroll();
		
		//---
		
		
		
		//------------------
		// Scrollmenu
		//------------------
		// Add a one page auto menu:
		// <ul class='scrollMenu'></ul>
		// <div id="uniekid" data-scrollmenu="Menu titel"></div>
		// Opties;
		// Zet data-scrolltoadd="-50" op het element met de class scrollMenu wanneer je bijvoorbeeld een vaste bovenkant hebt
		var scrollitemcount=0;
		$('[data-scrollmenu]').each(function(){
			scrollitemcount++;
			var menutitle = jQuery(this).attr('data-scrollmenu');
			var menuid=jQuery(this).attr('id');
			var scrollToAdd=0;
			
			if($('.scrollMenu').attr('data-scrolltoadd')!=undefined){
				scrollToAdd=$('.scrollMenu').attr('data-scrolltoadd');
			}
			
			$('.scrollMenu').append('<li class="nr'+scrollitemcount+'"><a href="#" data-scrollto="#'+menuid+'" data-scrolltoadd="'+scrollToAdd+'">'+menutitle+'</a></li>');
			
		});
		//highlight active on scrolling
		$(window).scroll(function (e) {
			highlightScrollMenu();
		});
		highlightScrollMenu();
		
		//---
		
		
		//------------------
		// Responsive menu
		//------------------
		// Adds functions for responsive menu
		
		$('#mobMenuBtn').click(function(){
			$('#mobmenu').toggleClass('menuopen');
			$('#container').toggleClass('menuopen');
			$(this).toggleClass('menuopen');
			$('body').toggleClass('menuopen');
			menutoggled=true;
		});
		
		$(document).on('click','.mobMenuOverlay',function(){
			$('body').removeClass('menuopen');
		});

		
		//---
		
		
	});
	
	
	function paralaxScroll(){
		
		var scrolltop = $(window).scrollTop();
		
		
		$('.paralax').each(function(){
			var objy1 = $(this).offset().top;
			var objy2 = objy1 + $(this).outerHeight();
			
			var wwidth = $(window).width();
			if(objy1<=110){
				objy1=0;
			}
			var flip=false;
			if(jQuery(this).hasClass('flip')){
				flip=true;
			}
			
			
			var factor = 3;
			if(jQuery(this).attr('data-depth')!=undefined){
				factor = parseFloat(jQuery(this).attr('data-depth'));
			}
			
			
			if(objy1 <= (scrolltop+wheight) && objy2>=scrolltop){
				
				$(this).find('.layer').each(function(){
					
					
					if(jQuery(this).attr('data-depth')!=undefined){
						factor = parseFloat(jQuery(this).attr('data-depth'));
					}
					
					
					
					if(flip){
						//$(this).css('width',(0-((scrolltop-objy1)/factor))+'px');
						//var grade= 0-(((scrolltop-objy1)/factor)/(wheight+(objy2-objy1)))*90;
						
						//var grade= (0)-(((scrolltop-objy1)/factor)/(wheight+(objy2-objy1)))*60;
						var grade= (-60)+(((scrolltop-objy1)/factor)/(wheight+(objy2-objy1)))*90;
						
						if(jQuery(this).hasClass('flip-x')){
						$(this).css('transform','rotateX('+grade+'deg)');
						} else {
						$(this).css('transform','rotateY('+grade+'deg)');
						}
						
						
						//hoogte = wheight+(objy2-objy1)
						
						
					} else {
						$(this).css('transform','translate3d(0px, '+((scrolltop-objy1)/factor)+'px, 0px)');
					
					}
				});
				
			} else {
				
			}
			
		});
		
	}
	
	
	function highlightScrollMenu(){
		var scrollcount=0;
		
		var scroll = $(window).scrollTop();
		var docheight = $(document).height();
		if((scroll+wheight) >= (docheight-(wheight / 6)) ){
			//last is active
			
			var nrmenus = $('[data-scrollmenu]').length;
			
			$('.scrollMenu li.active').removeClass('active');
			$('.scrollMenu li.nr'+nrmenus).addClass('active');
			
			
		} else {
			//not last is active
		
			
			$('[data-scrollmenu]').each(function(){
				scrollcount++;
				
				
				
				var objoffsettop = $(this).offset().top;
				
				if(objoffsettop > (scroll+(wheight/2)) ){
					//vorig item is actief
					if(scrollcount>1){
						scrollcount--;
					}
					
					if($('.scrollMenu li.nr'+scrollcount).hasClass('active')){
						//is al actief
						
					} else {
					
						$('.scrollMenu li.active').removeClass('active');
						$('.scrollMenu li.nr'+scrollcount).addClass('active');
						
					}
					
					
					return false;
				}
				
			});
			
		}
		
	}
	
	
	function closePopup(obj){
		jQuery(obj).parents(".popup").hide();
		jQuery(obj).parents(".popup").removeClass('opened');
		if(jQuery(obj).parents(".popup-btn")[0]){
			jQuery(obj).parents(".popup-btn").removeClass('poppedup');
		}
	
	}
	
	function focusStickInit(){
		// your code
	 	jQuery('.stickme').each(function(){
		
			var toppos=$(this).offset().top;
			
			
			if($(this).attr('data-topoffset')!=undefined){
				toppos-=parseInt($(this).attr('data-topoffset'));
			}
			
			
			jQuery(this).attr('data-top',toppos);
			
			focusStick();
			
		});
		
		
		$(window).scroll(function (e) {
			if($(window).width()>680){
				focusStick();
			}
		});
		
	}
	
	function focusStick(){
		
		var scroll = $(window).scrollTop();
		
		$('.stickme').each(function(){
			if($(this).attr('data-top')!=undefined && $(this).height() < $(window).height()){
				var toppos=$(this).attr('data-top');
				
				if(scroll>toppos){
					if($(this).hasClass('sticked')){
						//allready sticked
					} else {
						if($(this).attr('data-fixheight')!=undefined){
							var classname=$(this).attr('data-fixheight');
							
							$(this).before('<div class=\"fixheight'+classname+'\">&nbsp;</div>');
							$('.fixheight'+classname).height($(this).outerHeight(true));
						}
						
						$(this).addClass('sticked');
						
						if($(this).attr('data-topoffset')!=undefined){
							//$(this).css('top',$(this).attr('data-topoffset')+'px');
						}
					}
				} else {
					if($(this).hasClass('sticked')){
						if($(this).attr('data-fixheight')!=undefined){
							var classname=$(this).attr('data-fixheight');
							$('.fixheight'+classname).remove();
						}
						
						if($(this).attr('data-topoffset')!=undefined){
							//$(this).css('top','');
						}
						
						$(this).removeClass('sticked');
					}
				}
			} 
		});
	}
	
	
	
	
	
	
	function windowResized(){
		wheight = $(window).height();
		var scroll = $(window).scrollTop();
		
		if(scroll>0){
			jQuery('#scrollDown').addClass("inv");
		} else {
			jQuery('#scrollDown').removeClass("inv");
		}
		
		
	}
	
	
	
})(jQuery);