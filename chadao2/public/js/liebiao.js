'use strict';

$(function () {
    // 新品
    $.ajax({
        url: '/index.php/home/querynewshop',
        data: { type: '新品' },
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            $('.newshopsnames').attr('href', '/index.php/home/xiangqing?sid=' + data[0]['sid']);
            $('.newshopsname').html(data[0]['sname']);
            $('.newshopsprice').html(data[0]['snewprice'] + '.00');
            $('.newshopsenglish').html(data[0]['senglish']);
        }
    });
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

        var _loop = function _loop(i) {
            var str = '\n                    <li>\n                         <a href="/index.php/home/xiangqing?sid=' + data[i]['sid'] + '">\n                            <div class="newshopping-img">\n                                <img src="' + data[i]['stu'] + '" alt="">\n                            </div>\n                            <div class="newshopping-text">\n                                <span>' + data[i]['sname'] + '</span>\n                                <span>' + data[i]['senglish'] + '</span>\n                            </div>\n                        </a>\n                    </li>\n                     ';
            obj.html(function (i, value) {
                return value + str;
            });
        };

        for (var i = 0; i < data.length; i++) {
            _loop(i);
        }
    }
    ////////////////////////////////////////////////////////////////////////
    //获取茶色
    var querycolor = $('#querycolor');
    $.ajax({
        url: '/index.php/hthome/querycolor',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            render(querycolor, data, 'cname', 'cdescription');
        }
    });
    //获取茶品
    var querytype = $('#querytype');
    $.ajax({
        url: '/index.php/hthome/querytype',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            render(querytype, data, 'tname', 'tenglish');
        }
    });
    //获取茶产地
    var queryaddress = $('#queryaddress');
    $.ajax({
        url: '/index.php/hthome/queryadress',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            render(queryaddress, data, 'aname', 'aenglish');
        }
    });
    function render(obj, data, name, english) {
        obj.empty();

        var _loop2 = function _loop2(i) {
            var str = '\n                         <li><span class="datatype">' + data[i][name] + '</span>\xB7<span>' + data[i][english] + '</span></li>\n                     ';
            obj.html(function (i, value) {
                return value + str;
            });
        };

        for (var i = 0; i < data.length; i++) {
            _loop2(i);
        }
    }
    /////////////////////////获取商品///////////////////////////
    //点击分类获取商品
    querycolor.on('click', 'li', function () {
        var value = $('.datatype', this).html();
        huanyeajax(1, 'scolor', value);
    });
    querytype.on('click', 'li', function () {
        var value = $('.datatype', this).html();
        huanyeajax(1, 'stype', value);
    });
    queryaddress.on('click', 'li', function () {
        var value = $('.datatype', this).html();
        huanyeajax(1, 'saddress', value);
    });
    ///点击全部获取商品
    $('.allshop').on('click', function () {
        huanyeajax(1);
    });
    ///////////////////////////商品列表////////////////////////////////
    var contentList = $('.chanpin');
    var huanye = $('.huanye-list');
    var divbtn1 = $('.divbtn1');
    var divbtn2 = $('.divbtn2');
    var index = 1;
    var maxIndex = 0;
    huanyeajax(1);
    function huanyeajax(n, type, value) {
        $.ajax({
            url: '/index.php/home/listshop',
            data: { page: n, type: type, value: value },
            method: 'post',
            dataType: 'json',
            success: function success(data) {
                lishshop(contentList, data[0]);
                page(huanye, data[1], data[2]);
                maxIndex = data[1];
            }
        });
    }
    function page(obj, data, da) {
        obj.empty();

        var _loop3 = function _loop3(i) {
            var str = '';
            if (i == da) {
                str = '\n                       <li class="huanyeList active"><div class="active">' + i + '</div></li>\n                     ';
            } else {
                str = '\n                       <li class="huanyeList"><div>' + i + '</div></licl>\n                     ';
            }

            obj.html(function (i, value) {
                return value + str;
            });
        };

        for (var i = 1; i <= data; i++) {
            _loop3(i);
        }
    }
    function lishshop(obj, data) {
        obj.empty();

        var _loop4 = function _loop4(i) {
            var str = '\n                    <li id="' + data[i]['sid'] + '">\n                        <div class="chanpin-zs">\n                            <img src="' + data[i]['stu'] + '"/>\n                            <div class="shoptext">\n                                <div class="shopname">\n                                    <span><b>' + data[i]['sname'] + '</b></span>\n                                    <span>' + data[i]['senglish'] + '</span>\n                                </div>\n                                <div class="shopprice">\n                                    <span>' + data[i]['snewprice'] + '.00</span>\n                                    <span>\u4EBA\u6C11\u5E01</span>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="zhezhao">\n                              <a href="/index.php/home/xiangqing?sid=' + data[i]['sid'] + '">\n                                  <img src="' + data[i]['stu'] + '"/>\n                                  <div class="shoptext1">\n                                        <div class="shopprice1">\n                                            <span>' + data[i]['snewprice'] + '.00</span>\n                                            <span>\u4EBA\u6C11\u5E01</span>\n                                        </div>\n                                        <div class="shopname1">\n                                            <span><b>' + data[i]['sname'] + '</b></span>\n                                        </div>\n                                  </div>\n                              </a>\n                              <div class="buybox">\n                                 <a class="chanpin-buy">BUY</a>\n                                 <a class="chanpin-gwcar">\n                                     <span class="iconfont icon-cart"></span>\n                                 </a>\n                             </div>\n                       </div>\n                    </li>\n                     ';
            obj.html(function (i, value) {
                return value + str;
            });
        };

        for (var i = 0; i < data.length; i++) {
            _loop4(i);
        }
    }
    //加入购物车
    contentList.on('click', '.chanpin-gwcar', function () {
        var loginBox = $('.loginBox');
        var loginBoxImg = $('.loginBox-img>img');
        var loginBoxUname = $('.loginBox-uname');
        var sid = $(this).closest('li').attr('id');
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
    contentList.on('click', '.chanpin-buy', function () {
        var loginBox = $('.loginBox');
        var loginBoxImg = $('.loginBox-img>img');
        var loginBoxUname = $('.loginBox-uname');
        var sid = $(this).closest('li').attr('id');
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
    //商品选项卡左右箭头
    huanye.on('click', '.huanyeList', function () {
        index = $(this).index() + 1;
        huanyeajax(index);
    });
    divbtn1.on('click', function () {
        if (index <= 1) {
            divbtn1.css({ color: '#ccc' });
            divbtn2.css({ color: '#333' });
            return;
        } else {
            divbtn2.css({ color: '#333' });
            divbtn1.css({ color: '#333' });
        }
        index--;
        huanyeajax(index);
    });
    divbtn2.on('click', function () {
        if (index >= maxIndex) {
            divbtn2.css({ color: '#ccc' });
            divbtn1.css({ color: '#333' });
            return;
        } else {
            divbtn2.css({ color: '#333' });
            divbtn1.css({ color: '#333' });
        }
        index++;
        huanyeajax(index);
    });

    //////////////动效///////////////////////////////////
    //轮播
    setInterval(function () {
        $("#myCarousel").carousel('next');
    }, 3000);
    // 列表鼠标移入
    $(".chanpin").on("mouseenter mouseleave", 'li', function (e) {
        var w = $(this).width() + 12;
        var h = $(this).height() + 12;
        var x = (e.offsetX - w / 2) * (w > h ? h / w : 1);
        var y = (e.offsetY - h / 2) * (h > w ? w / h : 1);
        var direction = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;
        var this_slidiv = $(this).find('.zhezhao');
        if (e.type == 'mouseenter') {
            switch (direction) {
                case 0:
                    this_slidiv.css({ top: -h, left: "0px" });
                    break;
                case 1:
                    this_slidiv.css({ top: "0px", left: w });
                    break;
                case 2:
                    this_slidiv.css({ top: h, left: "0px" });
                    break;
                case 3:
                    this_slidiv.css({ top: "0px", left: -w });
                    break;
            }

            this_slidiv.stop(true, true).animate({ "top": "0px", "left": "0px" }, "fast");
        } else if (e.type == 'mouseleave') {
            switch (direction) {
                case 0:
                    this_slidiv.stop(true, true).animate({ "top": -h }, 500);
                    break;
                case 1:
                    this_slidiv.stop(true, true).animate({ "left": w }, 500);
                    break;
                case 2:
                    this_slidiv.stop(true, true).animate({ "top": h }, 500);
                    break;
                case 3:
                    this_slidiv.stop(true, true).animate({ "left": -w }, 500);
                    break;
            }
        }
    });
});