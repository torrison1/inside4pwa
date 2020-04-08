$(function(){

    // Requests JQuery System
    // -------------------------------------- # 1 =======================================
    //
    $('.request_btn').on('click', function(){

        if (!$(this).hasClass('disabled')) {
            $(this).addClass('disabled');
            var that = $(this);

            var request_container = $(this).attr('request_container');
            var request_target = $(this).attr('request_target');

            var name_contacts_input = $('#'+request_container).find('.name_contacts');
            var name_contacts = name_contacts_input.val();

            var message_input = $('#'+request_container).find('.message');
            var message = message_input.val();

            var message_div = $('#'+request_container).find('.callback_message');

            var message_full = message+"   <br>   "+' (From : '+request_target+' )';

            var main_block = $('#'+request_container).find('.modal-body');
            var sucess_block = $('#'+request_container).find('.modal-body-success');
            var footer_block = $('#'+request_container).find('.modal-footer');

            message_div.html('');
            // ------------------------ Easy Validation ------------------------
            var validation_ok = true;
            main_block.find('.validation_block').remove();


            if (name_contacts == '') {
                name_contacts_input.parent().append('<div class="validation_block invalid-feedback">This field cannot be empty.</div>');
                validation_ok = false;
            }
            if (message == '') {
                message_input.parent().append('<div class="validation_block invalid-feedback">This field cannot be empty.</div>');

                validation_ok = false;
            }

            if (!validation_ok) {
                main_block.find('.validation_block').show();
                that.removeClass('disabled');
            }
            // ------------------------ ----------------- ------------------------
            else {
                $.post('/ajax_api/add_request', {

                    name_contacts : name_contacts,
                    message : message_full,
                    url : '' // In this version Forms do not have URL field

                }, function(data){

                    var obj = JSON.parse(data);
                    // alert(obj.status);

                    if (obj.status == 'success') {

                        // Example (When Success Block NOT Used)
                        message_div.html('<span class="text-success">Request Saved!</span>');

                        main_block.addClass('d-none');
                        footer_block.addClass('d-none');
                        sucess_block.removeClass('d-none');
                    }

                    that.removeClass('disabled');
                });
            }

        }

    });

    $('.modal_request .close, .modal_request .refresh_form').on('click', function(){

        var request_container = $(this).attr('request_container');

        var main_block = $('#'+request_container).find('.modal-body');
        var sucess_block = $('#'+request_container).find('.modal-body-success');
        var footer_block = $('#'+request_container).find('.modal-footer');
        var message_div = $('#'+request_container).find('.callback_message');

        var name_contacts = $('#'+request_container).find('.name_contacts');
        var message = $('#'+request_container).find('.message');

        main_block.removeClass('d-none');
        footer_block.removeClass('d-none');
        sucess_block.addClass('d-none');
        message_div.html('');

        name_contacts.val('');
        message.val('');

    });
    // -------------------------------------- # x1 =======================================

});