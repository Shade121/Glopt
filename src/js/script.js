$(document).ready(function() {
    window.addEventListener('DOMContentLoaded', () => {
        const menu = document.querySelector('.menu'),
        menuItem = document.querySelectorAll('.menu_item'),
        hamburger = document.querySelector('.hamburger');
    
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        });
    
        menuItem.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.toggle('hamburger_active');
                menu.classList.toggle('menu_active');
            });
        });
    }); 

    // Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    
    $('.modal_close').on('click', function(){
        $('.overlay, #consultation, #thanks').fadeOut('slow');
    });

    $('#more_ship').click(function(){
        $(".pop-up, .price_ship").fadeIn('slow');
    }); 

    $('#more_train').click(function(){
        $(".pop-up, .price_train").fadeIn('slow');
    });

    $('#more_truck').click(function(){
        $(".pop-up, .price_truck").fadeIn('slow');
    });

    $('#more_plane').click(function(){
        $(".pop-up, .price_plane").fadeIn('slow');
    });

    $('.pop-up_close').on('click', function(){
        $('.pop-up, .price_ship, .price_train, .price_truck, .price_plane').fadeOut('slow');
    });

    
 
    
    function valideForms(form){
            
        $(form).validate({
            rules: {
            name: {
                required: true,
                minlength: 2
            },       
            phone: {
                required: true
            },            
            email: {
                required: true,
                email:true
            }
            },
            messages: {
            name: {
                required: "Введите своё имя",
                minlength: jQuery.validator.format("Введите минимум {0} символа!")
            },
            phone: {
                required: "Введите свой номер телефона",
            },
            email: {
                required: "Введите свой email",
                email: "Ваш email должен быть формата name@domain.com",
            },
            text: {
                required: "Введите свое сообщение"
            },
            }
        });
    }
    
    valideForms('#consultation-form'),
    valideForms('#consultation form'),
    valideForms('#question-form'),   


    $('input[name=phone]').mask("+38 (999) 999-99-99");

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #question').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    $(".slider").slick({
        centerMode: true,
        slidesToShow: 3,
        initialSlide: 1,
        variableWidth: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/prev.png"></img></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/next.png"></button>',
        responsive: [
            {
              breakpoint: 991,
              settings: {
                arrows: false,
                dots: true,
                dotsClass: "dots-castom"
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                variableWidth: false,
                arrows: false,
                dots: true,
                dotsClass: "dots-castom"
              }
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 1,
                variableWidth: false,
                arrows: false,
                dots: true,
                dotsClass: "dots-castom"
              }
            },
            {
              breakpoint: 320,
              settings: {
                slidesToShow: 1,
                variableWidth: false,
                arrows: false,
                dots: true,
                dotsClass: "dots-castom"
              }
            }
          ]
    });
    
	// Smooth scroll and pageup

    $(window).scroll(function(){
        if ($(this).scrollTop() > 1600){
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
  
    $("a[href=#up]").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });
  
    new WOW().init();
    
    const latlng = new google.maps.LatLng("55.7482", "37.6272");
    const myOptions = {
    zoom: 17,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(document.getElementById("map"),myOptions);
    map.setOptions({ 
        mapTypeControl: false,
        draggable: false,
        scaleControl: false,
        scrollwheel: false,
        navigationControl: false,
        streetViewControl: false,
    });
    
    const marker = new google.maps.Marker({
        position: {lat: 55.7479, lng: 37.62725},
        map: map,
        title: 'Global Opt г. Москва, ул. Садовническая, дом 5, офис 4-6, 700 от м. Новокузнецкая Тел: +7 (926) 423 01 00',
        icon: {
            url: "icons/map.png",
            scaledSize: new google.maps.Size(63, 63)
	}
    });

    
    
});


