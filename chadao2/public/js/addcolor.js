'use strict';

$(function () {
    ////////////////添加页面//////////////////////////
    var submit = $('#sub');
    submit.on('click', function () {
        var data = new FormData($('form')[0]);
        $.ajax({
            url: '/index.php/hthome/addcolors',
            data: data,
            processData: false,
            contentType: false,
            method: 'post',
            success: function success(data) {
                if (data == 'ok') {
                    location.href = '/index.php/hthome/color';
                } else if (data == 'error') {
                    alert('添加失败');
                }
            }
        });
        return false;
    });
});