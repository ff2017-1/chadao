'use strict';

$(function () {
    var login = JSON.parse(localStorage.login);
    var uname = login['uid'];
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

    var data = location.search.slice(location.search.indexOf('?') + 1);
    var dataArr = data.split(',');
    var sidArr = dataArr[0].split('=');
    var sid = sidArr[1];
    var pcountArr = dataArr[1].split('=');
    var pcount = pcountArr[1];
    $.ajax({
        url: '/index.php/home/querycars',
        data: { uname: uname },
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            for (var i = 0; i < data.length; i++) {
                if (sid == data[i]['sid'] && pcount == data[i]['pcount'] && data[i]['ptype'] == '购物车') {
                    $('.shopImg>img').attr('src', data[i]['stu']);
                    $('.shopname>.sname').html(data[i]['sname']);
                    $('.shopname>.senglish').html(data[i]['senglish']);
                    $('.shopdescription').html(data[i]['sdescription']);
                    $('.shoptoal>span').html(data[i]['snewprice'] * data[i]['pcount'] + '.00');
                    $('.shopcarNum>span').html(data.length);
                }
            }
        }
    });
    $('.shopEnd').on('click', function () {
        location.href = '/index.php/home/gouwuche';
    });
    $('.shopBack').on('click', function () {
        location.href = '/index.php/home/xiangqing?sid=' + sid;
    });
});