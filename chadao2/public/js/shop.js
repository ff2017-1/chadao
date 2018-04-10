'use strict';

$(function () {
    var tbody = $('#tbody');
    $.ajax({
        url: '/index.php/hthome/queryshop',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            console.log(data);
            render(tbody, data);
        }
    });
    function render(obj, data) {
        obj.empty();

        var _loop = function _loop(i) {
            var str = '\n                <tr id="' + data[i]['sid'] + '">\n                    <td type="sid">\n                        ' + data[i]['sid'] + '\n                    <td type="sname">\n                        <input type="text" value="' + data[i]['sname'] + '"></td>\n                    </td>\n                    <td type="senglish">\n                        <input type="text" value="' + data[i]['senglish'] + '">\n                    </td>\n                    <td type="stu"><img src="' + data[i]['stu'] + '" alt="" width="70" height="50" /></td>\n                    <td type="sprice">\n                        <input type="text" value="' + data[i]['sprice'] + '" style="width: 55px">\n                    </td>\n                    <td type="snewprice">\n                        <input type="text" value="' + data[i]['snewprice'] + '" style="width: 55px">\n                    </td>\n                     <td type="scolor">\n                        <input type="text" value="' + data[i]['scolor'] + '">\n                    </td>\n                    <td type="stype">\n                        <input type="text" value="' + data[i]['stype'] + '">\n                    </td>\n                    <td type="saddress">\n                        <input type="text" value="' + data[i]['saddress'] + '">\n                    </td>\n                    <td type="sdescription">\n                        <input type="text" value="' + data[i]['sdescription'] + '">\n                    </td>\n                    <td type="scontent">\n                        <input type="text" value="' + data[i]['scontent'] + '">\n                    </td>\n                    <td>\n                        <div class="button-group">\n                            <a class="button border-red" href="javascript:void(0)" id="del"><span\n                            class="icon-trash-o"></span> \u5220\u9664</a>\n                        </div>\n                    </td>\n                </tr>\n            ';
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
            url: '/index.php/hthome/deleteshop',
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
            url: '/index.php/hthome/updateshop',
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