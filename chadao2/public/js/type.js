'use strict';

$(function () {
    var tbody = $('#tbody');
    $.ajax({
        url: '/index.php/hthome/querytype',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            render(tbody, data);
        }
    });
    function render(obj, data) {
        obj.empty();

        var _loop = function _loop(i) {
            var str = '\n                <tr id="' + data[i]['tid'] + '">\n                    <td type="tid">\n                        ' + data[i]['tid'] + '\n                    </td>\n                    <td type="tname">\n                        <input type="text" value="' + data[i]['tname'] + '">\n                    </td>\n                    <td type="tenglish">\n                        <input type="text" value="' + data[i]['tenglish'] + '">\n                    </td>\n                    <td type="tdescription">\n                        <input type="text" value="' + data[i]['tdescription'] + '">\n                    </td>\n                    <td style="width: 150px">\n                        <div class="button-group">\n                            <a class="button border-red" href="javascript:void(0)" id="del"><span\n                            class="icon-trash-o"></span>\u5220\u9664</a>\n                        </div>\n                    </td>\n                </tr>\n            ';
            obj.html(function (i, value) {
                return value + str;
            });
        };

        for (var i = 0; i < data.length; i++) {
            _loop(i);
        }
    }
    tbody.on('click', '#del', function () {
        var tr = $(this).closest('tr');
        var ids = tr.attr('id');
        $.ajax({
            url: '/index.php/hthome/deletetype',
            data: { id: ids },
            success: function success(data) {
                if (data == 'ok') {
                    tr.remove();
                } else if (data == 'error') {
                    alert('fail');
                }
            }
        });
    });
    //////////////////////////修改///////////////////////////
    tbody.on('blur', 'input', function () {
        var value = $(this).val();
        var type = $(this).closest('td').attr('type');
        var ids = $(this).closest('tr').attr('id');
        $.ajax({
            url: '/index.php/hthome/updatetype',
            data: { id: ids, type: type, value: value },
            success: function success(data) {
                if (data == 'ok') {
                    alert('修改成功');
                } else if (data == 'error') {
                    alert('修改失败');
                }
            }
        });
    });
});