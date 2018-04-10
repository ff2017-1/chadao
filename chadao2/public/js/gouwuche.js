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
    ////////////////////////获取////////////////////////////////////
    var scroll = $('.scroll');
    var huanyelist = $('.huanye>.huanye-list');
    var divbtn1 = $('.divbtn1');
    var divbtn2 = $('.divbtn2');
    var index = 0, maxindex = 0;
    show(1);
    function show(n) {
        $.ajax({
            url: '/index.php/home/queryshopping',
            data: { value: '购物车', page: n, uname: uname },
            method: 'post',
            dataType: 'json',
            success: function success(data) {
                if (data[0].length == 0) {
                    scroll.html('您的购物车空空如也');
                    scroll.css({
                        textAlign: 'center',
                        lineHeight: '100px'
                    });
                } else {
                    render(scroll, data[0]);
                    page(huanyelist, data[1], data[2]);
                    maxindex = data[1];
                    total();
                }
            }
        });
    }

    function render(obj, data) {
        obj.empty();

        var _loop2 = function _loop2(i) {
            var str = '\n                    <li id="' + data[i]['pid'] + '" sid="' + data[i]['sid'] + '">\n                        <div class="tu">\n                            <img src="' + data[i]['stu'] + '" alt="">\n                        </div>\n                        <div>\n                           <span>' + data[i]['sname'] + '</span>\n                           <span>' + data[i]['senglish'] + '</span>  \n                        </div>\n                        <div>\n                            <span>' + data[i]['snewprice'] + '.00</span>\n                        </div>\n                        <div class="shopnum">\n                            <span class="reduce">-</span>\n                            [ <span class="count" id="' + data[i]['snewprice'] + '">' + data[i]['pcount'] + '</span> ]\n                            <span class="plus">+</span>\n                        </div>\n                        <div class="heji">' + data[i]['pcount'] * data[i]['snewprice'] + '.00</div>\n                        <div class="del">\u5220\u9664</div>\n                    </li>\n                     ';
            obj.html(function (i, value) {
                return value + str;
            });
        };

        for (var i = 0; i < data.length; i++) {
            _loop2(i);
        }
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
    //商品选项卡左右箭头
    huanyelist.on('click', 'li', function () {
        index = $(this).index() + 1;
        show(index);
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
        show(index);
    });
    divbtn2.on('click', function () {
        if (index >= maxindex) {
            divbtn2.css({ color: '#ccc' });
            divbtn1.css({ color: '#333' });
            return;
        } else {
            divbtn2.css({ color: '#333' });
            divbtn1.css({ color: '#333' });
        }
        index++;
        show(index);
    });
    function update(ids, num, sid) {
        $.ajax({
            url: '/index.php/home/updateshopping',
            data: { pid: ids, ptype: '购物车', pcount: num, sid: sid },
            success: function success(data) {
                if (data == 'ok') {
                    console.log('修改成功');
                } else if (data == 'error') {
                    console.log('修改失败');
                }
            }
        });
    }

    function total() {
        $.ajax({
            url: '/index.php/home/querycars',
            data: { uname: uname },
            method: 'post',
            dataType: 'json',
            success: function success(data) {
                var total = 0;
                for (var i = 0; i < data.length; i++) {
                    total += data[i]['snewprice'] * data[i]['pcount'];
                }
                $('.totalNum').html(total + '.00');
            }
        });
    }
    ///////////////////////////////////////购物车添加////////////////////////////////////
    scroll.on('click', '.plus', function () {
        var ids = $(this).closest('li').attr('id');
        var sid = $(this).closest('li').attr('sid');
        var num = $(this).prev().html();
        var price = $(this).prev().attr('id');
        num++;
        var heji = num * price;
        $(this).prev().html(num);
        $(this).closest('.shopnum').next().html(heji + '.00');
        update(ids, num, sid);
        show(index);
        total();
    });
    //     ////////////////////////////////////////购物车减少/////////////////////////
    scroll.on('click', '.reduce', function () {
        var ids = $(this).closest('li').attr('id');
        var sid = $(this).closest('li').attr('sid');
        var num = $(this).next().html();
        var price = $(this).next().attr('id');
        num--;
        if (num <= 0) {
            num = 0;
            var _ids = $(this).closest('li').attr('id');
            $.ajax({
                url: '/index.php/hthome/deleteshopping',
                data: { id: _ids },
                success: function success(data) {
                    if (data == 'ok') {
                        console.log(1);
                    } else if (data == 'error') {
                        console.log(0);
                    }
                }
            });
            $(this).closest('li').animate({ marginLeft: '-100%' }).queue(function () {
                $(this).closest('li').remove();
            });
            show(index);
            total();
        }
        var heji = num * price;
        $(this).next().html(num);
        $(this).closest('.shopnum').next().html(heji + '.00');
        update(ids, num, sid);
        show(index);
    });
    // ///////////////////////////////////删除////////////////////////////////
    scroll.on('click', '.del', function () {
        var ids = $(this).closest('li').attr('id');
        $.ajax({
            url: '/index.php/hthome/deleteshopping',
            data: { id: ids },
            success: function success(data) {
                if (data == 'ok') {
                    console.log(1);
                } else if (data == 'error') {
                    console.log(0);
                }
            }
        });
        $(this).closest('li').animate({ marginLeft: '-100%' }).queue(function () {
            $(this).closest('li').remove();
        });
        show(index);
    });
});