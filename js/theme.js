/*
  Theme Name: Agency - OnePage Responsive HTML5 Template
  Theme URL: http://themewar.com/html/agencylanding
  Author: ThemeWar
  Author URI: http://themewar.com
  Description: OnePage Responsive HTML5 Template
  Version: 1.0.0
*/


(function ($) {
    'use strict';
    
    //========================
    // Full Height Banner
    //========================
    getWidthAndHeight();
    $(window).resize(function () {
        getWidthAndHeight();
    });
    function getWidthAndHeight() {
        var winWidth = $(window).width();
        var headerHeight = $(".header").height();
        var winHeight = ( $(window).height() - headerHeight);
        
        var ban_items = $('.ban_items').height();
        var slcontents = $('.slcontents').height();
        var b1desc = $('.bdescs').height();
        
        var banPad = (winHeight - ban_items) / 2;
        var slcontentsPad = (winHeight - slcontents) / 2;
        var b1descPad = (winHeight - b1desc) / 2;

        $('.ban_items').css({'padding-top': banPad});
        $('.slcontents').css({'padding-top': slcontentsPad});
        $('.bdescs').css({'padding-top': b1descPad});
        $('.bannersa').css({'height': winHeight});
        $('.bannerSix').css({'height': winHeight});
        $('.bannerSeven').css({'height': winHeight});

    }
    
    //=======================================================
    // Background Video
    //=======================================================
    var vid = document.getElementById("myVideo");
    function playPause() {
        if (vid.paused) {
            vid.play();
        }
        else {
            vid.pause();
        }
    }
    if ($('#myVideo').length > 0) {
        $('#playVideo').on('click', function (e) {
            e.preventDefault();
            playPause();
            if ($(this).hasClass('playing'))
            {
                $(this).removeClass('playing').html('<i class="fa fa-play"></i>');
                vid.pause();
            }
            else
            {
                $(this).addClass('playing').html('<i class="fa fa-pause"></i>');
                vid.play();
            }
        });
    }
    
    
    //========================
    // WOW INIT
    //========================
    if($(window).width() > 766)
    {
         var wow = new WOW({
             mobile: false 
         });
         wow.init();
    }
    
    
    //========================
    // Loader 
    //========================
    $(window).load(function() {
        if($(".loaderWrap").length > 0)
        {
            $(".loaderWrap").delay(500).fadeOut("slow");
        }
    });
    
    
    //========================================================
    // Fun Fact
    //========================================================
    $('.funfactsection').appear(function () {
        $('.mycounter').each(function () {
            var $this = $(this);
            jQuery({Counter: 0}).animate({Counter: $this.attr('data-counter')}, {
                duration: 6000,
                easing: 'swing',
                step: function () {
                    var num = Math.ceil(this.Counter).toString();
                    if (Number(num) > 999) {
                        while (/(\d+)(\d{3})/.test(num)) {
                            num = num.replace(/(\d+)(\d{3})/, '<span>' + '$1' + '</span>' + '$2');
                        }
                    }
                    $this.html(num);
                }
            });
        });
    });
    
    
    //========================================================
    // Portfolio Mixing
    //========================================================
    if($("#Grid").length > 0)
    {
        $('#Grid').mixIt({
	    targetSelector: '.mix',
	    filterSelector: '.filter'
	});
    }
    
    //========================
    // Pretty Photo
    //========================
    if ($("a[data-rel^='prettyPhoto']").length > 0) {
        $("a[data-rel^='prettyPhoto']").prettyPhoto({
            social_tools: false
        });
    }
    
    //=======================================================
    // Circle Bar
    //=======================================================
    var coun = true;
    if ($('.skillArea').length > 0) {
        $('.skillArea').appear(function () {
            $(".singleSkill").each(function () {
                var datacount = $(this).attr("data-limit");
                $(".skillMain", this).animate({'width': datacount + '%'}, 2000);
                if (coun)
                {
                    $(this).find('.skilPercent').each(function () {
                        var $this = $(this);
                        $({Counter: 0}).animate({Counter: datacount}, {
                            duration: 2000,
                            easing: 'swing',
                            step: function () {
                                $this.text(Math.ceil(this.Counter) + '%');
                            }
                        });
                    });

                }
            });
            coun = false;
        });
    }
    
    
    /***************************************
     *  Contact Map
     ***************************************/
    var mapopen = true;
    if($("#toggleMap").length > 0)
    {
        $("#toggleMap").on('click', function(e){
            e.preventDefault();
            if(mapopen)
            {
                $(".mapArea").animate({'height': '450px'}, 1000, function(){
                    var map;
                    map = new GMaps({
                            el: '#map',
                            lat: 45.494447,
                            lng: -73.5697587,
                            scrollwheel:false,
                            zoom: 16,
                            zoomControl : true,
                            panControl : false,
                            streetViewControl : false,
                            mapTypeControl: false,
                            overviewMapControl: false,
                            clickable: false
                    });

                    var image = '';
                    map.addMarker({
                            lat: 45.494447,
                            lng: -73.5697587,
                            icon: 'images/marker.png',
                            animation: google.maps.Animation.DROP,
                            verticalAlign: 'bottom',
                            horizontalAlign: 'center',
                            backgroundColor: '#d3cfcf',
                    });




                });
                $(this).addClass('active');
                mapopen = false;
            }
            else
            {
                $(".mapArea").animate({'height': '0px'}, 1000);
                $(this).removeClass('active');
                mapopen = true;
            }
            
        });
    }
    
    //========================
    // Back To Top
    //========================
    $("body, html").on("click", "#backToTop", function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    });
    
    //========================
    // Contact Submit
    //========================
    if($("#contactForm").length > 0)
    {
        $("#contactForm").on('submit', function(e){
            e.preventDefault();
            $("#con_submit").html('Wait..');
            var con_name = $("#f_name").val();
            var con_email = $("#f_email").val();
            var con_message = $("#con_message").val();
            
            var required = 0;
	    $(".required", this).each(function() {
		if ($(this).val() == '')
		{
		    $(this).addClass('reqError');
		    required += 1;
		}
		else
		{
		    if ($(this).hasClass('reqError'))
		    {
			$(this).removeClass('reqError');
			if (required > 0)
			{
			    required -= 1;
			}
		    }
		}
	    });
            if (required === 0)
            {
                $.ajax({
                    type: "POST",
                    url: 'mail.php',
                    data: {con_name:con_name, con_email:con_email, con_message:con_message}, 
                    success: function(data)
                    {
                        $("#con_submit").html('Done!');
                        $("#contactForm #f_name").val('');
                        $("#contactForm #f_email").val('');
                        $("#contactForm #con_message").val('');
                    }
                });
            }
            else
            {
                $("#con_submit").html('failed!');
            }
            
        });
    }
    
    
    //========================
    // Feature Click
    //========================
    if($(".singleFeatureDetails").length > 0)
    {
        $(".sF2con").on('click', function(e){
            e.preventDefault();
            var id = $('a', this).attr('href');
            $(".sF2con").removeClass('active');
            $(this).addClass('active');
            
            $(".sF2DHolder .singleFeatureDetails").fadeOut('slow');
            $(id).fadeIn('slow');
        });
    }
    
    //========================
    // Slider One
    //========================
    if($(".slderHeading").length > 0)
    {
        $(".slderHeading").typed({
            strings: ["We are creative", "we are professional", "We are honest"],
            typeSpeed: 150,
            backSpeed: 75,
            loop: true,
            showCursor: false,
            cursorChar: "|"
        });
    }
    
    
    //========================
    // Menu Setup
    //========================
    
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 40)
        {
            $("#header").addClass('fixedHeader');
        }
        else
        {
            $("#header").removeClass('fixedHeader');
        }

        /************ Menu Active on Scroll **********************/
        Scroll();

    });
    
    $("#menuToggle a").on('click', function(e){
        e.preventDefault();
        $(".mainMenu > ul").slideToggle('slow');
        $(this).toggleClass('active');
    });
    
    $('.mainMenu ul li.scroll > a').on('click', function () {
        if($(window).width() > 766)
        {
            $('html, body').animate({scrollTop: $(this.hash).offset().top - 68}, 1000);
        }
        else
        {
            $('html, body').animate({scrollTop: $(this.hash).offset().top - 68}, 1000);
            $(".mainMenu > ul").slideUp('slow');
            $("#menuToggle").removeClass('active');
        }
        return false;
    });
    
    $('.mainMenu ul li.hasChildren span.expandbutton').on('click', function(){
        $(this).next('ul.dropMenu').slideToggle('slow');
        $(this).toggleClass('active');
    });
    
    function Scroll() {

        var contentTop = [];
        var contentBottom = [];
        var winTop = $(window).scrollTop();
        var rangeTop = 70;
        var rangeBottom = 500;

        $('.mainMenu').find('.scroll > a').each(function () {
            var atr = $(this).attr('href');
            if ($(atr).length > 0)
            {
                contentTop.push($($(this).attr('href')).offset().top);
                contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
            }

        });

        $.each(contentTop, function (i) {

            if (winTop > contentTop[i] - rangeTop) {

                $('.mainMenu li.scroll')
                        .removeClass('active')
                        .eq(i).addClass('active');
            }
        });

    }
    
    if($(".colorPreset").length > 0)
    {
        $(".colorPreset a").on('click', function(e){
            e.preventDefault();
            var cs = $(this).attr('href');
            $(".colorPreset a").removeClass('active');
            $(this).addClass('active');
            $("#colorPreset").attr('href', 'css/colors/'+cs+'.css');
        });
    }
    

})(jQuery);