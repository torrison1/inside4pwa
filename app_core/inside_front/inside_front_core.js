// Load MAIN

let inside_path = 'app_core/inside_front/';
let loader_div = '<div class="loader_div"><img src="'+inside_path+'img/loading2.gif" alt="loading..." title="by loading.io" class="loader"></div>';

let user_data = {};

$(document).ready(function() {

    // -------------------------- Core Script -------------------------------

    $('#page_center').html(loader_div);

    check_user_row();

    // -------------------------- Bind Clicks ------------------------------------------

    // -------------------------- Contacts Page -------------------------------
    $('.contacts_page_click').on('click', function(){ load_page('app_core/pages/contacts.html', true); });


    // -------------------------- Main Page Back Clicks -------------------------------
    $('.main_page_click').on('click', function(){ load_page('app_core/pages/main.html', true); });

    // -------------------------- Blog List -------------------------------
    $('.blog_list_click').on('click', function(){ load_page('app_core/pages/blog.html', true); });


    // -------------------------- Auth Click -------------------------------
    $('.auth_click').on('click', function(){

        if (typeof user_data.username !== 'undefined') {
            load_page('app_core/pages/profile.html', true);
        } else {
            load_page('app_core/pages/auth.html', true);
        }

    });

    $('.logout_click').on('click', function(){ log_out(); });


});

function check_user_row() {

    api_call('/auth_api/user_row_json', 'GET', function(data){

        user_data = data;
        localStorage.setItem('user_data', data);
        dump_log(data);
        if (typeof data.username !== 'undefined') {
            load_page('app_core/pages/profile.html', true);
        } else {
            load_page('app_core/pages/main.html', true);
        }
    });


}


function log_out() {

    // alert(111);
    load_page('app_core/pages/main.html', true);
    user_data = {};
    localStorage.setItem('user_data', '');
    localStorage.setItem('ci_session', '');
    $.cookie("ci_session", null, { path: '/' });

}

function api_call(url, method, callback_function, post_array = {}) {

    var ci_session = encodeURIComponent(localStorage.getItem('ci_session'));

    if (method === 'GET') {

        if (url.indexOf('?') > -1)
        {
            url += url+'&ci_session='+ci_session;
        } else {
            url += url+'?ci_session='+ci_session;
        }

        $.get(url, function(data) {

            console.log(data.ci_session);
            if (typeof data.ci_session !== 'undefined') {
                localStorage.setItem('ci_session', data.ci_session)
            }
            callback_function(data);
        });
    } else if (method === 'POST') {

        post_array.ci_session = localStorage.getItem('ci_session');

        $.post(url, post_array, function(data) {

            console.log(data.ci_session);
            if (typeof data.ci_session !== 'undefined') {
                localStorage.setItem('ci_session', data.ci_session)
            }
            callback_function(data);
        });
    }


}

function load_page(path, loader = false) {

    close_all_before_page_load(this);
    $.get(path+'?_=' + new Date().getTime(), function(data){
        if (loader) $('#page_center').html(loader_div);
        $('#page_center').html(data);

    });
}

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

// Debug Function
function dump_alert(obj) {
    var out = "";
    if(obj && typeof(obj) == "object"){
        for (var i in obj) {
            out += i + ": " + obj[i] + "\n";
        }
    } else {
        out = obj;
    }
    alert(out);
};
function dump_log(obj) {
    var out = "";
    if(obj && typeof(obj) == "object"){
        for (var i in obj) {
            out += i + ": " + obj[i] + "\n";
        }
    } else {
        out = obj;
    }
    console.log(out);
};