
if ($('.child-cources')) {
	$('#main .news').prepend('<div class="child-cources">'+$('.child-cources').html()+'</div>')
}

$(window).load(function(){

	/* fixed menu */

	sizeSite();

	var top;
	var menuBtn = $('.menu-button').html();
	$('#wrapper').prepend('<div class="menu-button-fixed">'+menuBtn+'</div>');

	function slickMenu(){
		$('.menu-button-container').css({minHeight:0});
		$('.menu-button').removeClass('fixed')
		$('.menu-button-fixed').removeClass('fixed')
		$('.menu-button-container').css({minHeight:$('.menu-button-container').height()});
		top = $('.menu-button').offset().top;
	}
	function fixedMenu(){
		if ($(window).scrollTop() >= top) {
			$('.menu-button').addClass('fixed');
			$('.menu-button-fixed').addClass('fixed');
		} else {
			$('.menu-button').removeClass('fixed');
			$('.menu-button-fixed').removeClass('fixed');
		}
	}

	slickMenu();
	fixedMenu();
	$(window).scroll(fixedMenu);
	$(window).resize(slickMenu);
	$(window).resize(fixedMenu);	
	

	$('body, html').on("click touchstart", function (event) {
		if ($(event.target).closest("#menu-sidebar, .menu-icon").length) return;
		$('body').removeClass('menu-open');
		$('html').removeClass('menu-open');
	})

	$('.menu-icon').on("click touchstart", function(){
		if ($('body').hasClass('menu-open')) {
			$('body').removeClass('menu-open');
			$('html').removeClass('menu-open');
		} else {
			$('body').addClass('menu-open');
			$('html').addClass('menu-open');
		}
		return false;
	})

	$('body, html').on("click touchstart", function (event) {
		if ($(event.target).closest(".dropdown-toogle").length) return;
		$('.dropdown-toogle').removeClass('open');
	})

	$('.dropdown-btn').on("click touchstart", function(){
		if ($('.dropdown-toogle').hasClass('open')) {
			$('.dropdown-toogle').removeClass('open');
		} else {
			$('.dropdown-toogle').addClass('open');
		}
		return false;
	})

	$('.filters-toogle a').on("click touchstart", function(){	
		var filter = "."+$(this).attr('href');
		if ($(this).hasClass('remove')) {
			$(this).removeClass('remove');
			$('.timetable').find(filter).removeClass('disabled');
		} else {
			if (!$(this).parents('ul').find('a').hasClass('remove')) {
				$(this).addClass('remove');
				$('.timetable').find(filter).addClass('disabled');
			}
		}
		return false;
	})

	/* cources slider */

	if ($('.slider').length) {
		if ($('.slider ul').height()<$('.slider').height()) {
			$('.slider ul').append($('.slider ul').html()).append($('.slider ul').html());
		} else {
			$('.slider ul').append($('.slider ul').html())
		}	
		
		function animateSlider(){
			var h = $('.slider ul').height();	
			$('.slider ul').animate({top:-h/2},h/2*50, 'linear' , function(){
				$('.slider ul').css({top:0});
				animateSlider();
			});
		}
		animateSlider();
		$(window).resize(animateSlider);
	}

	
	/* slick sliders */

	if ($('.slider-top').length) {
		$('.slider-top').slick({
		  speed: 500,
		  arrows: false,
		  fade:true,
		  slidesToShow: 1,
		  asNavFor: '.thumb'
		});
		$('.thumb').slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  asNavFor: '.slider-top',
		  arrows: false,
		  focusOnSelect: true
		});
	}

	if ($('.slider-top-wide').length) {
		$('.slider-top-wide').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
		  dots: false,
		  centerMode: true,
		  autoplay: true,
		  infinite: true,
		  variableWidth: true,
		  focusOnSelect: true
		});
	}

	if ($('.courses-carousel').length) {
		$slick_slider = $('.courses-carousel');
		var slickSettings = {
		    dots: false,
			responsive: [
			    {
			      breakpoint: 660,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll: 2
			      }
			    },
			    {
			      breakpoint: 420,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1
			      }
			    }
			]
		  }
		  $slick_slider.slick(slickSettings);

		  if ($(window).width() > 640) {
		  		$slick_slider.slick('unslick');
		  }

		  // reslick only if it's not slick()
		  $(window).on('resize', function() {
		    if ($(window).width() > 640) {
		      if ($slick_slider.hasClass('slick-initialized')) {
		        $slick_slider.slick('unslick');
		      }
		      return
		    }

		    if (!$slick_slider.hasClass('slick-initialized')) {
		      return $slick_slider.slick(slickSettings);
		    }
		  });
	}

	if ($('.course').length) {
		$('.course').each(function(num){
			var th = $(this);
			if (th.find('.slider-course').length) {
				th.find('.thumb-course').addClass('thumb-course'+num);
				th.find('.slider-course').addClass('slider-course'+num);
				th.find('.slider-course'+num).slick({
				  speed: 500,
				  arrows: false,
				  fade:true,
				  slidesToShow: 1,
				  asNavFor: '.thumb-course'+num
				});
				th.find('.thumb-course'+num).slick({
				  slidesToShow: 5,
				  slidesToScroll: 1,
				  asNavFor: '.slider-course'+num,
				  arrows: false,
				  focusOnSelect: true,
				  responsive: [
				    {
				      breakpoint: 479,
				      settings: {
				        slidesToShow: 3,
				        slidesToScroll: 1
				      }
				    }
				  ]
				});
			}
		})
	}

	$('.js-take-course').on('click', function() {
		var checkedCourse = $('.request-variant-list > .item.checked');

		$('.modal-course-item').addClass('hidden');

		if (checkedCourse.data("course-name") === 'full-course') {
		    $('.modal-full-course').removeClass('hidden');
		} else if (checkedCourse.data("course-name") === 'single-lesson') {
		    $('.modal-single-lesson').removeClass('hidden');
		} else if (checkedCourse.data("course-name") === 'free-application') {
		    $('.modal-free-application').removeClass('hidden');
		}
	});

	$('.modal-back-button').on('click', function() {
		$('.modal-course-item').addClass('hidden');
		$('.modal-request-selector').removeClass('hidden');
	});

	$('.js-course-payment').on('click', function() {
		$('.modal-course-item').addClass('hidden');
		$('.modal-payment-send').removeClass('hidden');
	});

	$('.js-course-application-send').on('click', function() {
		$('.modal-course-item').addClass('hidden');
		$('.modal-application-send').removeClass('hidden');
	});

	$('.js-show-modal').on('click', function() {
		$('.js-modal-main .modal-course-item').addClass('hidden');
		$('.js-modal-main .modal-request-selector').removeClass('hidden');
	});

	$('.js-show-modal-aside').on('click', function() {
		$('.js-modal-aside .modal-course-item').addClass('hidden');
		$('.js-modal-aside .modal-single-lesson').removeClass('hidden');
	});

	/* form */

	if ($('select').length){
		$('select').styler();
	}

	/* setsize site */

	sizeSite();
	$(window).resize(sizeSite);
	
	function sizeSite(){
		//$("meta[name='viewport']").attr("content", 'width=device-width, initial-scale=1');
		$(".scale-site").css({width:'100%', transform:'scale(1,1)'});
		$('#wrapper').css({height:'auto'});
		var width = $(window).width();
		if (width <= 640) {
			$('body').addClass('mobile');
		} else {				
			$('body').removeClass('mobile');
		}
		if (width <= 960 && width > 640) {
			$(".scale-site").css({width:'960px', transform:'scale('+width/960+')'});
			$('#wrapper').css({height:$('#wrapper').height()*width/960})
		}
		if (width <= 640 && width > 480) {
			//$("meta[name='viewport']").attr("content", 'width=480, initial-scale='+width/480);
			$(".scale-site").css({width:'480px', transform:'scale('+width/480+')'});
			$('#wrapper').css({height:$('#wrapper').height()*width/480})
		}
		if (width <= 480 || width > 960) {
			//$("meta[name='viewport']").attr("content", 'width=device-width, initial-scale=1');
			$(".scale-site").css({width:'100%', transform:'scale(1,1)'});
			$('#wrapper').css({height:'auto'});
			
		}
	}


	// popup

	$('.modal').mousemove(function(event){
		if (!$('body').hasClass('mobile')) {
			$($(this).attr('data-modal')).addClass('open');
			$('.popup .content-popup').css({top:event.pageY+"px", left:event.pageX+"px", marginTop:"30px", marginLeft:"0px"});
			if (event.pageX+466 > $(window).width()) {
				$('.popup .content-popup').css({left:$(window).width()-466+"px"});
			}
		}
	}).mouseout(function(){
		if (!$('body').hasClass('mobile')) {
			$('.popup').removeClass('open');
		}
	})

	$('.mobile .modal').on("touchstart", function (event) {
		if ($(event.target).closest(".content-popup").length) return;
		$('.popup').removeClass('open');
		$($(this).attr('data-modal')).addClass('open');
		var th = $(this).parent();
		$('.popup .content-popup').css({left:"inherit", marginLeft:"30px", top:th.offset().top+th.height()+"px", marginTop:"-16px"});
	}).blur(function(){
		$($(this).attr('data-modal')).removeClass('open');
		$(this).removeClass('clicked')
	})

	$('.mobile .modal').click(function(){
		if (!$(this).hasClass('clicked')) { 
			$(this).addClass('clicked');
			$('.popup').removeClass('open');
			$($(this).attr('data-modal')).addClass('open');
			var th = $(this).parent();
			$('.popup .content-popup').css({left:"inherit", marginLeft:"30px", top:th.offset().top+th.height()+"px", marginTop:"-16px"});
			return false; 
		}
	})

	$('.request-variant-list > .item').on('click', function() {
		$('.request-variant-list > .item').find('.modal-btn').text('Выбрать');
		$(this).find('.modal-btn').text('Выбрано').end().addClass('checked').siblings().removeClass('checked');
	});

	/*
	$('.mobile').on("touchstart", function (event) {
		if ($(event.target).closest(".content-popup, .modal").length) return;
		$('.popup').removeClass('open');
	})
	*/

	/*
	$('.mobile').on("click touchstart", function (event) {
		if ($(event.target).closest(".content-popup").length) return;
		$('.popup').removeClass('open');
	})*/

})

