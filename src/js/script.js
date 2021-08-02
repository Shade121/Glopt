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
            })
        })
    }); 

    // Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('[data-modal=more_ship]').on('click', function() {
        $('.overlay, #more_ship').fadeIn('slow');
     });
     $('[data-modal=more_truck]').on('click', function() {
        $('.overlay, #more_truck').fadeIn('slow');
     });
     $('[data-modal=more_train]').on('click', function() {
        $('.overlay, #more_train').fadeIn('slow');
     });
     $('[data-modal=more_plane]').on('click', function() {
        $('.overlay, #more_plane').fadeIn('slow');
     });
    $('.modal_close').on('click', function(){
        $('.overlay, #consultation, #more, #thanks').fadeOut('slow');
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
            required: "Пожалуйста, введите своё имя",
            minlength: jQuery.validator.format("Введите минимум {0} символа!")
        },
        phone: {
            required: "Пожалуйста, введите свой номер телефона",
        },
        email: {
            required: "Пожалуйста, введите свой email",
            email: "Ваш email должен быть формата name@domain.com"
        }
        }
    });
    };
    
    valideForms('#consultation-form'),
    valideForms('#consultation form'),   


    $('input[name=phone]').mask("+38 (999) 999-99-99");

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #more').fadeOut();
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
                // slidesToShow: 1,
                // variableWidth: false,
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
    
})

