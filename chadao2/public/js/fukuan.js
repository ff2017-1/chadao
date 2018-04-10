'use strict';

$(function () {
    var login = JSON.parse(localStorage.login);
    var uname = login['uid'];
    ///////////////////////点击效果//////////////////////////////
    var fkBank = $('.fk-bank');
    $.each(fkBank, function (index, value) {
        $(value).on('click', 'li', function () {
            $.each($(value), function () {
                $(this).children('li').removeClass('active');
            });
            $(this).addClass('active');
        });
    });
    //////////////////////////随机订单号//////////////////////////////////
    function MathRand() {
        var Num = "";
        for (var i = 0; i < 8; i++) {
            Num += Math.floor(Math.random() * 10);
        }
        return Num;
    }
    $('.ddbh').html(MathRand());
    ///////////////////////////倒计时//////////////////////////
    var spans = $('.daojishi>span');
    var h = 23;
    var m = 59;
    var s = 59;
    setInterval(fn, 1000);
    //进行倒计时显示
    function fn() {
        --s;
        if (s < 0) {
            --m;
            s = 59;
        }
        if (m < 0) {
            --h;
            m = 59;
        }
        if (h < 0) {
            s = 0;
            m = 0;
        }
        spans.html(h + "时" + m + "分" + s + '秒');
    }
    ///////////////////////////获取////////////////////////////
    $.ajax({
        url: '/index.php/home/queryshopping',
        data: { value: '待付款', uname: uname },
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            var total = 0;
            for (var i = 0; i < data[0].length; i++) {
                total += data[0][i]['snewprice'] * data[0][i]['pcount'];
            }
            $('.totalnum>.num').html(total + '.00');
            $('.ddjg').html(total + '.00元');
        }
    });
    ////////////////////////立即支付//////////////////////////
    $('#addDD').on('click', function () {
        var ddBH = $('.ddbh').html();
        $.ajax({
            url: '/index.php/home/updateshoppings',
            data: { ptype: '待评价', type: '待付款', uname: uname },
            success: function success(data) {
                if (data == 'ok') {
                    location.href = '/index.php/home/ddsuccess?ddbh=' + ddBH;
                } else if (data == 'error') {
                    alert('支付失败');
                }
            }
        });
    });
});