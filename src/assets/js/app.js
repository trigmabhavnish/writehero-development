$(document).ready(function() {

  //Change navbar style on scroll
  $(window).scroll(function(){
    $('#customnavbar').toggleClass('scrolledsmooth', $(this).scrollTop() > 50);
  });


//additional starts


//accordion js starts

	// Add minus icon for collapse element which is open by default
	$(".collapse.show").each(function(){
		$(this).prev(".card-header").find(".fapm").addClass("fa-minus-square-o").removeClass("fa-plus-square-o");
	});
	
	// Toggle plus minus icon on show hide of collapse element
	$(".collapse").on('show.bs.collapse', function(){
		$(this).prev(".card-header").find(".fapm").removeClass("fa-plus-square-o").addClass("fa-minus-square-o");
	}).on('hide.bs.collapse', function(){
		$(this).prev(".card-header").find(".fapm").removeClass("fa-minus-square-o").addClass("fa-plus-square-o");
	});


  $(window).scroll(function(){
    $('.scrolling-on').toggleClass('scrolledsmooth', $(this).scrollTop() > 50);
  });


//adding class to body
var removeClass = true;
$(".overflow-toggler").click(function () {
	console.log('hello');
    $("body").toggleClass('overflow-hiding');
    removeClass = false;
});

$(".body").click(function() {
    removeClass = false;
});

$("html").click(function () {
    if (removeClass) {
        $("body").removeClass('overflow-hiding');
    }
    removeClass = true;
});

//remove class from nav
$(".list-group-item").click(function(){
	$(".navbar-collapse").removeClass("show");
  });


//addtional ends

//scroll to top animation
	$(window).scroll(function() {
		if ($(this).scrollTop() > 50 ) {
			$('.scrolltop:hidden').stop(true, true).fadeIn();
		} else {
			$('.scrolltop').stop(true, true).fadeOut();
		}
	});
	$(function(){$(".scroll").click(function(){$("html,body").animate({scrollTop:$(".thetop").offset().top},"1000"); return false;})})

	//counter-js initialization
	$(function() {
	  $(".counter").countimator();
	});

  //Owl initialization
	var owl = $('.abc');
	var owl1 = $('.abc1');
	/* owl1.owlCarousel({		
		margin:20,
		  nav: true,
		  loop: true,
		  responsiveClass:true,
	   responsive: {
			0: {
			  items: 1
			},
			600: {
			  items: 2
	   
			},
			1000: {
			  items: 3
			}
		  }
    }) */
});