// Load MAIN

$.ajaxSetup({cache: false});

let user_data = {};

let cache_data = {};

$(document).ready(function() {

    // -------------------------- Core Script -------------------------------

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
            load_page('app_core/pages/auth_profile.html', true, true, true);
        } else {
            load_page('app_core/pages/auth_login.html', true, true, true);
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
            load_page('app_core/pages/auth_profile.html', true, true, true);
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

function load_page(path, loader = false, scripts = false, waiting_for_scripts = false) {

    close_all_before_page_load(this);

    $('#page_center').html('');
    $('#scripts_block').html('');

    if (loader) $('#loader_div').show();

    $.ajaxSetup({async:false});
    $.get(path+'?_=' + new Date().getTime(), function(data){ $('#page_center').html(data);});

    if (waiting_for_scripts) {
        $('#page_center').hide();
    } else {
        $('#loader_div').hide();
    }

    if (scripts) {
        let path_scripts = path.replace('.html','_scripts.html');
        $.get(path_scripts+'?_=' + new Date().getTime(), function(data){
            $('#scripts_block').html(data);
        });
    }
    $.ajaxSetup({async:true});
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
    let out = "";
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
    let out = "";
    if(obj && typeof(obj) == "object"){
        for (var i in obj) {
            out += i + ": " + obj[i] + "\n";
        }
    } else {
        out = obj;
    }
    console.log(out);
};