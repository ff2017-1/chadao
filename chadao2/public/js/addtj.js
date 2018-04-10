'use strict';

$(function () {
    var select = $('#select');
    $.ajax({
        url: '/index.php/hthome/queryshop',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            console.log(data);
            render(select, data);
        }
    });
    function render(obj, data) {
        obj.empty();

        var _loop = function _loop(i) {
            var str = '\n               <option value="' + data[i]['sid'] + '">' + data[i]['sname'] + '</option>\n            ';
            obj.html(function (i, value) {
                return value + str;
            });
        };

        for (var i = 0; i < data.length; i++) {
            _loop(i);
        }
    }
    ////////////////添加页面//////////////////////////
    var submit = $('#sub');
    submit.on('click', function () {
        var data = new FormData($('form')[0]);
        $.ajax({
            url: '/index.php/hthome/addtjs',
            data: data,
            processData: false,
            contentType: false,
            method: 'post',
            success: function success(data) {
                if (data == 'ok') {
                    location.href = '/index.php/hthome/tj';
                } else if (data == 'error') {
                    alert('添加失败');
                }
            }
        });
        return false;
    });
});