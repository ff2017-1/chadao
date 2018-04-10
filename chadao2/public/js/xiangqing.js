'use strict';

$(function () {
    var sid = location.search.slice(location.search.indexOf('=') + 1);
    var num = $('.num').html();
    var jg = 0;
    var ptotal = 0;
    $.ajax({
        url: '/index.php/home/queryshop',
        data: { sid: sid },
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            jg = data['snewprice'];
            $('.snames').html(data['sname']);
            $('.sname').html(data['sname']);
            $('.senglish').html(data['senglish']);
            $('.sdescription').html(data['sdescription']);
            $('.snewprice').html(data['snewprice'] + '.00');
            $('.sprice').html(data['sprice'] + '.00');
            $('.stu').attr('src', data['stu']);
        }
    });
    //点击加号
    $('.add').on('click', function () {
        num++;
        $('.num').html(num);
        ptotal = num * jg;
        $('.snewprice').html(ptotal + '.00');
    });
    //点击减号
    $('.reduce').on('click', function () {
        if (num <= 0) {
            return;
        }
        num--;
        $('.num').html(num);
        ptotal = num * jg;
        $('.snewprice').html(ptotal + '.00');
    });
    //加入购物车
    $('.gouwu>.addcar>a').on('click', function () {
        var loginBox = $('.loginBox');
        var loginBoxImg = $('.loginBox-img>img');
        var loginBoxUname = $('.loginBox-uname');
        $.ajax({
            url: '/index.php/home/session',
            method: 'post',
            dataType: 'text',
            success: function success(data) {
                if (data == "您未登录") {
                    alert('请您登录');
                    $('#denglu2').click();
                } else {
                    var login = JSON.parse(localStorage.login);
                    loginBox.addClass('active');
                    loginBoxImg.attr('src', login['uimg']);
                    loginBoxUname.html(login['uname']);
                    loginBoxUname.attr('id', login['uid']);
                    var uname = login['uid'];
                    $.ajax({
                        url: '/index.php/hthome/addshoppings',
                        data: { sid: sid, pcount: num, ptype: '购物车', ptotal: ptotal, uname: uname },
                        method: 'post',
                        success: function success(data) {
                            if (data == 'ok') {
                                location.href = '/index.php/home/carts?sid=' + sid + ',pcount=' + num;
                            } else if (data == 'error') {
                                alert('添加失败');
                            }
                        }
                    });
                }
            }
        });

        return false;
    });
    // 立即购买
    $('.gouwu>.buy>a').on('click', function () {
        var loginBox = $('.loginBox');
        var loginBoxImg = $('.loginBox-img>img');
        var loginBoxUname = $('.loginBox-uname');
        $.ajax({
            url: '/index.php/home/session',
            method: 'post',
            dataType: 'text',
            success: function success(data) {
                if (data == "您未登录") {
                    alert('请您登录');
                    $('#denglu2').click();
                } else {
                    var login = JSON.parse(localStorage.login);
                    loginBox.addClass('active');
                    loginBoxImg.attr('src', login['uimg']);
                    loginBoxUname.html(login['uname']);
                    loginBoxUname.attr('id', login['uid']);
                    var uname = login['uid'];
                    $.ajax({
                        url: '/index.php/hthome/addshoppings',
                        data: { sid: sid, pcount: num, ptype: '购物车', ptotal: ptotal, uname: uname },
                        method: 'post',
                        success: function success(data) {
                            if (data == 'ok') {
                                location.href = '/index.php/home/gwctj?sid=' + sid + ',pcount=' + num;
                            } else if (data == 'error') {
                                alert('添加失败');
                            }
                        }
                    });
                }
            }
        });
        return false;
    });
    // 评价
    var pingjiaa = $('.pingjia');
    $.ajax({
        url: '/index.php/home/querypingjia',
        data: { sid: sid },
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            if (data.length == 0) {
                pingjiaa.html('该商品还没有评价');
                pingjiaa.css({
                    textAlign: 'center',
                    lineHeight: '100px'
                });
            } else {
                pingjia(pingjiaa, data);
            }
        }
    });
    function pingjia(obj, data) {
        obj.empty();

        var _loop = function _loop(i) {
            var str = '\n                    <li>\n                        <div class="touxiang" style="border-radius: 50%">\n                            <img src="' + data[i]['uimg'] + '" alt="" style="border-radius: 50%">\n                        </div>\n                        <div class="neirong">\n                            <div class="word">\n                                <div class="uid">' + data[i]['uname'] + '</div>\n                                <div class="wenzi">' + data[i]['oname'] + '</div>\n                            </div>\n                            <div class="time">' + data[i]['otime'] + '</div>\n                        </div>\n                    </li>\n                     ';
            obj.html(function (i, value) {
                return value + str;
            });
        };

        for (var i = 0; i < data.length; i++) {
            _loop(i);
        }
    }
    // 本周新品
    var newshoppings = $('.newshopping');
    $.ajax({
        url: '/index.php/home/querynewshop',
        data: { type: '本周新品' },
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            newshopping(newshoppings, data);
        }
    });
    function newshopping(obj, data) {
        obj.empty();

        var _loop2 = function _loop2(i) {
            var str = '\n                    <li>\n                        <a href="/index.php/home/xiangqing?sid=' + data[i]['sid'] + '">\n                            <div class="newshopping-img">\n                                <img src="' + data[i]['stu'] + '" alt="">\n                            </div>\n                            <div class="newshopping-text">\n                                <span>' + data[i]['sname'] + '</span>\n                                <span>' + data[i]['senglish'] + '</span>\n                            </div>\n                        </a>\n                    </li>\n                     ';
            obj.html(function (i, value) {
                return value + str;
            });
        };

        for (var i = 0; i < data.length; i++) {
            _loop2(i);
        }
    }
});