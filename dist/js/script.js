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
    valideForms('#more form'),
   


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
    
})

