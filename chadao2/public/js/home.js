'use strict';

$(function () {
    // 本周新品
    var newshoppings = $('.buybox');
    $.ajax({
        url: '/index.php/home/querynewshop',
        data: { type: '首页新品' },
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            newshopping(newshoppings, data);
        }
    });
    function newshopping(obj, data) {
        obj.empty();

        var _loop = function _loop(i) {
            var str = '\n                        <a href="/index.php/home/xiangqing?sid=' + data[i]['sid'] + '" class="tjshoptext">\n                            <div class="tjshopprice">\n                                <span>' + data[i]['snewprice'] + '.00</span>\n                                <span>[\u65B0\u54C1]\u4EBA/\u540D/\u5E01</span>\n                            </div>\n                            <div class="tjshopsname">\n                                <span>' + data[i]['sname'] + '</span>\n                                <span>' + data[i]['senglish'] + '</span>\n                            </div>\n                        </a>\n                        <div class="buy">\n                            <span><a  class="buyss" id="' + data[i]['sid'] + '">BUY</a></span>\n                            <a class="buys" id="' + data[i]['sid'] + '"><i class="iconfont icon-cart"></i></a>\n                        </div>\n                     ';
            obj.html(function (i, value) {
                return value + str;
            });
        };

        for (var i = 0; i < data.length; i++) {
            _loop(i);
        }
    }
    // 热门推荐
    var hothoppings = $('.tuijian>ul');
    $.ajax({
        url: '/index.php/home/querynewshop',
        data: { type: '热门推荐' },
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            hothopping(hothoppings, data);
        }
    });
    function hothopping(obj, data) {
        obj.empty();
        var str = '\n            <li><a href="/index.php/home/xiangqing?sid=' + data[0]['sid'] + '">\n                <img src="' + data[0]['stu'] + '" alt="">\n            </a></li>\n            <li>\n                 <div class="tjdes">\n                    <span><b>\u8336\u8449/\u611F\u53D7\u81EA\u7136\u7684\u5473\u9053</b></span>\n                    <span>TEA/FEEL THE TSTE OF NATURTEA</span>\n                 </div>\n                <a href="/index.php/home/xiangqing?sid=' + data[0]['sid'] + '" class="tjshoptext">\n                    <div class="tjshopprice">\n                        <span>' + data[0]['snewprice'] + '.00</span>\n                        <span>[\u65B0\u54C1]\u4EBA/\u540D/\u5E01</span>\n                    </div>\n                    <div class="tjshopsname">\n                        <span>' + data[0]['sname'] + '</span>\n                        <span>' + data[0]['senglish'] + '</span>\n                    </div>\n                </a>\n                <div class="buy">\n                    <a  class="buys" id="' + data[0]['sid'] + '">\n                        <i class="iconfont icon-cart"></i>\n                    </a>\n                    <span>\n                        <a class="buyss" id="' + data[0]['sid'] + '">BUY</a>\n                    </span>\n                </div>\n            </li>\n            <li>\n              \n                 <div class="tjdes">\n                    <span><b>\u8336\u8449/\u611F\u53D7\u81EA\u7136\u7684\u5473\u9053</b></span>\n                    <span>TEA/FEEL THE TSTE OF NATURTEA</span>\n                 </div>\n                <a href="/index.php/home/xiangqing?sid=' + data[1]['sid'] + '" class="tjshoptext">\n                    <div class="tjshopprice">\n                        <span>' + data[1]['snewprice'] + '.00</span>\n                        <span>[\u65B0\u54C1]\u4EBA/\u540D/\u5E01</span>\n                    </div>\n                    <div class="tjshopsname">\n                        <span>' + data[1]['sname'] + '</span>\n                        <span>' + data[1]['senglish'] + '</span>\n                    </div>\n                </a>\n                <div class="buy">\n                    <a  class="buys" id="' + data[1]['sid'] + '">\n                        <i class="iconfont icon-cart"></i>\n                    </a>\n                    <span>\n                        <a  class="buyss" id="' + data[1]['sid'] + '">BUY</a>\n                    </span>\n                </div>\n            </li>\n            <li><a href="/index.php/home/xiangqing?sid=' + data[1]['sid'] + '">\n               <img src="' + data[1]['stu'] + '" alt="">\n            </a></li>\n                      \n                     ';
        obj.html(function (i, value) {
            return value + str;
        });
    }
    //贴心服务
    var fuwubtn = $(".fuwubtn");
    var fuwulist = $('.fuwulist');
    $.ajax({
        url: '/index.php/home/queryfuwu',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            fuwu(fuwulist, data);
        }
    });
    function fuwu(obj, data) {
        obj.empty();

        var _loop2 = function _loop2(i) {
            var str = '';
            if (i == 0) {
                str = '\n                    <li class="active">\n                        <div class="fwhead">\n                            <ul>\n                                <li>' + data[i]['vtitle'] + '</li>\n                            </ul>\n                        </div>\n                        <div class="xian">\n                            <div class="yuan"></div>\n                        </div>\n                        <p>' + data[i]['vcontent'] + '</p>\n                        <p>' + data[i]['venglish'] + '</p>\n                        <div class="kong"></div>\n                        <div class="tu"><img src="' + data[i]['vimg1'] + '" alt=""></div>\n                    </li>\n                ';
            } else {
                str = '\n                    <li>\n                        <div class="fwhead">\n                            <ul>\n                                <li>' + data[i]['vtitle'] + '</li>\n                            </ul>\n                        </div>\n                        <div class="xian">\n                            <div class="yuan"></div>\n                        </div>\n                        <p>' + data[i]['vcontent'] + '</p>\n                        <p>' + data[i]['venglish'] + '</p>\n                        <div class="kong"></div>\n                        <div class="tu"><img src="' + data[i]['vimg1'] + '" alt=""></div>\n                    </li>\n                ';
            }
            obj.html(function (i, value) {
                return value + str;
            });
        };

        for (var i = 0; i < data.length; i++) {
            _loop2(i);
        }
    }
    fuwubtn.on('click', 'li', function () {
        var index = $(this).index();
        $.each(fuwubtn, function () {
            $(this).find('li').removeClass('active');
            $(this).find('li').find('div').removeClass('active');
        });
        $.each(fuwulist, function () {
            $(this).children('li').removeClass('active');
        });
        $(fuwulist.children('li')[index]).addClass('active');
        $(this).find('div').addClass('active');
        $(this).addClass('active');
    });
    //加入购物车
    newshoppings.on('click', '.buys', function () {
        var sid = $(this).attr('id');
        var loginBox = $('.loginBox');
        var loginBoxImg = $('.loginBox-img>img');
        var loginBoxUname = $('.loginBox-uname');
        var uname = '';
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
                    uname = login['uid'];
                    $.ajax({
                        url: '/index.php/hthome/addshoppings',
                        data: { sid: sid, pcount: 1, ptype: '购物车', uname: uname },
                        method: 'post',
                        success: function success(data) {
                            if (data == 'ok') {
                                location.href = '/index.php/home/carts?sid=' + sid + ',pcount=1';
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
    hothoppings.on('click', '.buys', function () {
        var sid = $(this).attr('id');
        var loginBox = $('.loginBox');
        var loginBoxImg = $('.loginBox-img>img');
        var loginBoxUname = $('.loginBox-uname');
        var uname = '';
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
                    uname = login['uid'];
                    $.ajax({
                        url: '/index.php/hthome/addshoppings',
                        data: { sid: sid, pcount: 1, ptype: '购物车', uname: uname },
                        method: 'post',
                        success: function success(data) {
                            if (data == 'ok') {
                                location.href = '/index.php/home/carts?sid=' + sid + ',pcount=1';
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
    hothoppings.on('click', '.buyss', function () {
        var sid = $(this).attr('id');
        var loginBox = $('.loginBox');
        var loginBoxImg = $('.loginBox-img>img');
        var loginBoxUname = $('.loginBox-uname');
        var uname = '';
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
                    uname = login['uid'];
                    $.ajax({
                        url: '/index.php/hthome/addshoppings',
                        data: { sid: sid, pcount: 1, ptype: '购物车', uname: uname },
                        method: 'post',
                        success: function success(data) {
                            if (data == 'ok') {
                                location.href = '/index.php/home/gwctj?sid=' + sid + ',pcount=1';
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
    newshoppings.on('click', '.buyss', function () {
        var sid = $(this).attr('id');
        var loginBox = $('.loginBox');
        var loginBoxImg = $('.loginBox-img>img');
        var loginBoxUname = $('.loginBox-uname');
        var uname = '';
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
                    uname = login['uid'];
                    $.ajax({
                        url: '/index.php/hthome/addshoppings',
                        data: { sid: sid, pcount: 1, ptype: '购物车', uname: uname },
                        method: 'post',
                        success: function success(data) {
                            if (data == 'ok') {
                                location.href = '/index.php/home/gwctj?sid=' + sid + ',pcount=1';
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
    // 轮播
    setInterval(function () {
        $("#myCarousel").carousel('next');
    }, 3000);
});