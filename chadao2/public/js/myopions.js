'use strict';

$(function () {
    var text = $('.centent-right>textarea');
    var opionsnum = $('.opionsnum');
    var sid = location.search.slice(location.search.indexOf('=') + 1);
    var login = JSON.parse(localStorage.login);
    var uname = login['uid'];
    text[0].onkeyup = function () {
        var val = this.value;
        opionsnum.html(this.maxLength - val.length);
    };
    var submit = $('.opions>.bottom');
    submit.on('click', function () {
        var oname = text[0].value;
        var otime = getNowFormatDate();
        $.ajax({
            url: '/index.php/hthome/addopion',
            data: { oname: oname, otime: otime, sid: sid, uname: uname },
            method: 'post',
            success: function success(data) {
                if (data == 'ok') {
                    $.ajax({
                        url: '/index.php/home/updateshoppings',
                        data: { sid: sid, ptype: '交易成功', type: '待评价', uname: uname },
                        success: function success(data) {
                            if (data == 'ok') {
                                alert('添加成功');
                            } else if (data == 'error') {
                                alert('支付失败');
                            }
                        }
                    });
                    location.href = '/index.php/home/personal?type=1';
                } else if (data == 'error') {
                    alert('添加失败');
                }
            }
        });
        return false;
    });

    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
        return currentdate;
    }
});