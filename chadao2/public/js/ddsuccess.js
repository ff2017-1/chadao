'use strict';

$(function () {
    var ddbh = location.search.slice(location.search.indexOf('=') + 1);
    $('.ddbh').html(ddbh);
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
});