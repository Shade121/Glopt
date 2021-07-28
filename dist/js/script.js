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
    $('[data-modal=more]').on('click', function() {
        $('.overlay, #more').fadeIn('slow');
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

    $num = $('.my-card').length;
    $even = $num / 2;
    $odd = ($num + 1) / 2;

    if ($num % 2 == 0) {
        $('.my-card:nth-child(' + $even + ')').addClass('active');
        $('.my-card:nth-child(' + $even + ')').prev().addClass('prev');
        $('.my-card:nth-child(' + $even + ')').next().addClass('next');
        } else {
        $('.my-card:nth-child(' + $odd + ')').addClass('active');
        $('.my-card:nth-child(' + $odd + ')').prev().addClass('prev');
        $('.my-card:nth-child(' + $odd + ')').next().addClass('next');
        }

    $('.my-card').click(function() {
        $slide = $('.active').width();
    console.log($('.active').position().left);
    
    if ($(this).hasClass('next')) {
        $('.card-carousel').stop(false, true).animate({left: '-=' + $slide});
    } else if ($(this).hasClass('prev')) {
        $('.card-carousel').stop(false, true).animate({left: '+=' + $slide});
    }
    
        $(this).removeClass('prev next');
        $(this).siblings().removeClass('prev active next');
        
        $(this).addClass('active');
        $(this).prev().addClass('prev');
        $(this).next().addClass('next');
        
    });


    // Keyboard nav
    $('html body').keydown(function(e) {
    if (e.keyCode == 37) { // left
        $('.active').prev().trigger('click');
    }
    else if (e.keyCode == 39) { // right
        $('.active').next().trigger('click');
    }
    });
})

