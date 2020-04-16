// Load MAIN
$(document).ready(function() {

    // -------------------------- Core Script -------------------------------
    let inside_path = 'app_core/inside_front/';
    // let inside_path = ''; // from this file
    // alert(inside_path+'/loader1.gif');

    let loader_div = '<div class="loader_div"><img src="'+inside_path+'img/loading2.gif" alt="loading..." title="by loading.io" class="loader"></div>';

    $('#page_center').html(loader_div);

    setTimeout(function(){
        $.get('app_core/pages/main.html', function(data){

            $('#page_center').html(data);

        });
    }, 800);

    // -------------------------- Contacts Page -------------------------------
    $('.contacts_page_click').on('click', function(){
        close_all_before_page_load(this);

        $.get('app_core/pages/contacts.html', function(data){

            $('#page_center').html(data);

        });
    });


    // -------------------------- Main Page Back Clicks -------------------------------
    $('.main_page_click').on('click', function(){
        close_all_before_page_load(this);
        $.get('app_core/pages/main.html', function(data){

            $('#page_center').html(data);

        });
    });

    // -------------------------- Blog List -------------------------------
    $('.blog_list_click').on('click', function(){
        close_all_before_page_load(this);
        $.get('app_core/pages/blog.html', function(data){

            $('#page_center').html(data);

        });
    });

    // -------------------------- Auth Click -------------------------------
    $('.auth_click').on('click', function(){
        close_all_before_page_load(this);
        $.get('app_core/pages/auth.html', function(data){
            $('#page_center').html(loader_div);
            $('#page_center').html(data);

        });
    });


});

function close_all_before_page_load(click_obj) {

    setTimeout(touchSideSwipe.tssClose(), 300);

    // ------------- OLD Menu (TO DEL) ---------------
    /*
    $(click_obj).css('background', '#efe');
    setTimeout(function(){
        $(click_obj).css('background', '#eee');
    }, 200);
    $('.navbar-collapse').collapse('hide');

    */
}
