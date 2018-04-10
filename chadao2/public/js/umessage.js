'use strict';

$(function () {
    var tbody = $('#tbody');
    $.ajax({
        url: '/index.php/hthome/queryUmessage',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            render(tbody, data);
        }
    });
    function render(obj, data) {
        obj.empty();

        var _loop = function _loop(i) {
            var str = '\n                <tr id="' + data[i]['mid'] + '">\n                    <td type="mid">\n                        ' + data[i]['mid'] + '\n                    </td>\n                    <td type="uname">\n                        <input type="text" value="' + data[i]['uname'] + '" style="width: 80px">\n                    </td>\n                    <td type="maddress">\n                        <input type="text" value="' + data[i]['maddress'] + '">\n                    </td>\n                    <td type="myb">\n                        <input type="text" value="' + data[i]['myb'] + '" style="width: 50px">\n                    </td>\n                    <td type="mname">\n                        <input type="text" value="' + data[i]['mname'] + '" style="width: 80px">\n                    </td>\n                    <td type="mphone">\n                        <input type="text" value="' + data[i]['mphone'] + '" style="width: 90px">\n                    </td>\n                    <td type="mdh">\n                        <input type="text" value="' + data[i]['mdh'] + '" style="width: 90px">\n                    </td>\n                    <td type="mtype">\n                        <input type="text" value="' + data[i]['mtype'] + '" style="width: 55px">\n                    </td>\n                    <td style="width: 150px">\n                        <div class="button-group">\n                            <a class="button border-red" href="javascript:void(0)" id="del"><span\n                            class="icon-trash-o"></span> \u5220\u9664</a>\n                        </div>\n                    </td>\n                </tr>\n            ';
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
            url: '/index.php/hthome/deleteUmessage',
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
            url: '/index.php/hthome/updateUmessage',
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