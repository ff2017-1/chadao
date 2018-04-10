'use strict';

$(function () {
    var tbody = $('#tbody');
    $.ajax({
        url: '/index.php/hthome/queryservice',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            render(tbody, data);
        }
    });
    function render(obj, data) {
        obj.empty();

        var _loop = function _loop(i) {
            var str = '\n                <tr id="' + data[i]['vid'] + '">\n                    <td type="vid">\n                        ' + data[i]['vid'] + '\n                    </td>\n                     <td width="10%" type="vimg"><img src="' + data[i]['vimg'] + '" alt="" width="70" height="50" /></td>\n                    <td type="vtitle">\n                        <input type="text" value="' + data[i]['vtitle'] + '"></td>\n                    <td type="vcontent">\n                        <input type="text" value="' + data[i]['vcontent'] + '"></td>\n                    </td>\n                    <td type="venglish">\n                        <input type="text" value="' + data[i]['venglish'] + '"></td>\n                    </td>\n                    <td width="10%" type="vimg1"><img src="' + data[i]['vimg1'] + '" alt="" width="70" height="50" /></td>\n                    <td>\n                        <div class="button-group">\n                            <a class="button border-red" href="javascript:void(0)" id="del"><span\n                            class="icon-trash-o"></span> \u5220\u9664</a>\n                        </div>\n                    </td>\n                </tr>\n            ';
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
            url: '/index.php/hthome/deleteservice',
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
            url: '/index.php/hthome/updateservice',
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