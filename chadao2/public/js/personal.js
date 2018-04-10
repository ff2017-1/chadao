'use strict';

$(function () {
    var login = JSON.parse(localStorage.login);
    var uname = login['uid'];
    var btnIndex = 0;
    var btnIndexs = location.search.slice(location.search.indexOf('=') + 1);
    if (btnIndexs) {
        btnIndex = btnIndexs;
    } else {
        btnIndex = 0;
    }

    // 选项卡
    var btns = $('.content-left-list>li');
    var cards = $('.right-box>li');
    var madds = $('.mddd');
    var jiantous = $('.jiantou');
    btnindex(btnIndex);
    btns.on('click', function () {
        var i = $(this).index() - 1;
        btnindex(i);
    });
    function btnindex(i) {
        $.each(cards, function () {
            $(this).removeClass('active');
        });
        $.each(madds, function () {
            $(this).removeClass('active');
        });
        $.each(jiantous, function () {
            $(this).removeClass('active');
        });
        $(cards[i]).addClass('active');
        $(madds[i]).addClass('active');
        $(jiantous[i]).addClass('active');
    }
    /////////////////////////////本周新品///////////////////////////////
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
    ////////////////////////////地址管理////////////////////////////////
    var tbody = $('#tbody');
    /////添加
    var submit = $('#sub');
    submit.on('click', function () {
        var mphone = $('.mphone')[0].value;
        var myb = $('.myb')[0].value;
        var maddress = $('.maddress')[0].value;
        var mname = $('.mname')[0].value;
        $.ajax({
            url: '/index.php/hthome/addumessages',
            data: { mphone: mphone, myb: myb, maddress: maddress, mname: mname, uname: uname },
            method: 'post',
            success: function success(data) {
                if (data == 'ok') {
                    alert('添加成功');
                    $('.mphone')[0].value = '';
                    $('.myb')[0].value = '';
                    $('.mname')[0].value = '';
                    $('.maddress')[0].value = '';
                    adddizhi();
                } else if (data == 'error') {
                    alert('添加失败');
                }
            }
        });
        return false;
    });
    /////获取
    adddizhi();
    function adddizhi() {
        $.ajax({
            url: '/index.php/home/queryUmessage',
            method: 'post',
            data: { uname: uname },
            dataType: 'json',
            success: function success(data) {
                if (data.length == 0) {
                    tbody.html('您的收货地址空空如也');
                    tbody.css({
                        textAlign: 'center',
                        lineHeight: '100px'
                    });
                } else {
                    renderdizhi(tbody, data);
                }
            }
        });
    }
    function renderdizhi(obj, data) {
        obj.empty();

        var _loop2 = function _loop2(i) {
            var str = '';
            if (data[i]['mtype'] == '1') {
                str = '\n                    <tr id="' + data[i]['mid'] + '">\n                    <td type="mname">\n                        <input type="text" value="' + data[i]['mname'] + '" style="width: 80px">\n                    </td>\n                    <td type="mphone">\n                        <input type="text" value="' + data[i]['mphone'] + '" style="width: 90px">\n                    </td>\n                    <td type="maddress">\n                        <input type="text" value="' + data[i]['maddress'] + '">\n                    </td>\n                    <td type="mtype">\n                        <button\n                        style="border:none;outline: none;padding: 5px 16px;border-radius: 5px;font-size: 14px;\n                        background: #007aff;color: #ffffff " class="ztop">\u9ED8\u8BA4\n                        </button>\n                    </td>\n                    <td style="width: 150px">\n                        <div class="button-group">\n                            <a class="button border-red" id="del"><span\n                            class="icon-trash-o" ></span>\u5220\u9664</a>\n                        </div>\n                    </td>\n                </tr>\n                    ';
            } else {
                str = '\n                        <tr id="' + data[i]['mid'] + '">\n                    <td type="mname">\n                        <input type="text" value="' + data[i]['mname'] + '" style="width: 80px">\n                    </td>\n                    <td type="mphone">\n                        <input type="text" value="' + data[i]['mphone'] + '" style="width: 90px">\n                    </td>\n                    <td type="maddress">\n                        <input type="text" value="' + data[i]['maddress'] + '">\n                    </td>\n                    <td type="mtype">\n                        <button class="ztop" style="border:none;outline: none;padding: 5px 2px;border-radius: 5px;font-size: 14px">\u8BBE\u4E3A\u9ED8\u8BA4\n                        </button>\n                    </td>\n                    <td style="width: 150px">\n                        <div class="button-group">\n                            <a class="button border-red" id="del"><span\n                            class="icon-trash-o"></span> \u5220\u9664</a>\n                        </div>\n                    </td>\n                </tr>\n                    ';
            }

            obj.html(function (i, value) {
                return value + str;
            });
        };

        for (var i = 0; i < data.length; i++) {
            _loop2(i);
        }
    }
    ///删除
    tbody.on('click', '#del', function () {
        var tr = $(this).closest('tr');
        var ids = tr.attr('id');
        $.ajax({
            url: '/index.php/hthome/deleteUmessage',
            data: { id: ids },
            success: function success(data) {
                if (data == 'ok') {
                    tr.remove();
                    adddizhi();
                } else if (data == 'error') {
                    alert('fail');
                }
            }
        });
    });
    /////修改
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
                    adddizhi();
                } else if (data == 'error') {
                    alert('修改失败');
                }
            }
        });
    });
    ///置顶
    tbody.on('click', '.ztop', function () {
        var tr = $(this).closest('tr');
        var ids = tr.attr('id');
        $.ajax({
            url: '/index.php/home/addressztop',
            data: { id: ids },
            success: function success(data) {
                if (data == 'ok') {
                    alert('默认成功');
                    adddizhi();
                } else if (data == 'error') {
                    alert('默认成功');
                }
            }
        });
    });
    ////////////////////////////评价管理////////////////////////////////
    //获取
    var opionstbody = $('.opionstbody');
    opionajax();
    function opionajax() {
        $.ajax({
            url: '/index.php/home/queryopions',
            method: 'post',
            data: { uname: uname },
            dataType: 'json',
            success: function success(data) {
                if (data.length == 0) {
                    opionstbody.html('您还没有评价');
                    opionstbody.css({
                        textAlign: 'center',
                        lineHeight: '100px'
                    });
                } else {
                    render(opionstbody, data);
                }
            }
        });
    }
    function render(obj, data) {
        obj.empty();

        var _loop3 = function _loop3(i) {
            var str = '\n                   <li>\n                       <div class="shopopionsnames">\n                           <p  class="shopopionsname">' + data[i]['sname'] + '</p>\n                           <div><span  class="shopopionsnewprice">' + data[i]['snewprice'] + '</span>\u4EBA/\u6C11/\u5E01</div>\n                        </div>\n                        <div class="shopopion">\n                           <span>' + data[i]['oname'] + '</span>\n                            <span>' + data[i]['otime'] + '</span>\n                        </div>\n                        <div class="shopopionsbtn">\n                             <a class="goopions" href="/index.php/home/myopions?sid=' + data[i]['sid'] + '">\u53BB\u8FFD\u8BC4</a>\n                             <a class="shopagin" href="/index.php/home/xiangqing?sid=' + data[i]['sid'] + '">\u518D\u6B21\u8D2D\u4E70</a>\n                        </div>\n                    </li>\n                ';
            obj.html(function (i, value) {
                return value + str;
            });
        };

        for (var i = 0; i < data.length; i++) {
            _loop3(i);
        }
    }
    ////////////////////////////订单管理////////////////////////////////
    var contentRight3 = $('.content-right3');
    var huanyeList = $('.huanye-list');
    var divbtn1 = $('.divbtn1');
    var divbtn2 = $('.divbtn2');
    var index = 1;
    var maxIndex = 0;
    huanyeajax(1);
    function huanyeajax(n) {
        $.ajax({
            url: '/index.php/home/queryshopping',
            method: 'post',
            data: { page: n, uname: uname },
            dataType: 'json',
            success: function success(data) {
                if (data[0].length == 0) {
                    contentRight3.html('您还没有订单');
                    contentRight3.css({
                        textAlign: 'center',
                        lineHeight: '100px'
                    });
                } else {
                    renderdd(contentRight3, data[0]);
                    page(huanyeList, data[1], data[2]);
                    maxIndex = data[1];
                }
            }
        });
    }
    function renderdd(obj, data) {
        obj.empty();

        var _loop4 = function _loop4(i) {
            var str = "";
            if (data[i]['ptype'] !== '购物车') {
                if (data[i]['ptype'] == '待付款') {
                    str = '\n                            <li>\n                                <div class="content-shop">\n                                <img src="' + data[i]['stu'] + '" alt="">\n                                <div>\n                                <span>' + data[i]['sname'] + '</span>\n                                <span>' + data[i]['senglish'] + '</span>\n                                </div>\n                                </div>\n                                <span>' + data[i]['snewprice'] + '.00</span>\n                                <span>' + data[i]['pcount'] + '</span>\n                                <span>' + data[i]['snewprice'] * data[i]['pcount'] + '.00</span>\n                                <div>' + data[i]['ptype'] + '</div>\n                                <a href="/index.php/home/gwctj">\u53BB\u4ED8\u6B3E</a>\n                            </li>\n                        ';
                } else if (data[i]['ptype'] == '待评价') {
                    str = '\n                            <li>\n                                <div class="content-shop">\n                                <img src="' + data[i]['stu'] + '" alt="">\n                                <div>\n                                <span>' + data[i]['sname'] + '</span>\n                                <span>' + data[i]['senglish'] + '</span>\n                                </div>\n                                </div>\n                                <span>' + data[i]['snewprice'] + '.00</span>\n                                <span>' + data[i]['pcount'] + '</span>\n                                <span>' + data[i]['snewprice'] * data[i]['pcount'] + '.00</span>\n                                <div>' + data[i]['ptype'] + '</div>\n                                <a href="/index.php/home/myopions?sid=' + data[i]['sid'] + '" style="background: \n                                #ff6700">\u53BB\u8BC4\u4EF7</a>\n                            </li>\n                        ';
                } else if (data[i]['ptype'] == '交易成功') {
                    str = '\n                            <li>\n                                <div class="content-shop">\n                                <img src="' + data[i]['stu'] + '" alt="">\n                                <div>\n                                <span>' + data[i]['sname'] + '</span>\n                                <span>' + data[i]['senglish'] + '</span>\n                                </div>\n                                </div>\n                                <span>' + data[i]['snewprice'] + '.00</span>\n                                <span>' + data[i]['pcount'] + '</span>\n                                <span>' + data[i]['snewprice'] * data[i]['pcount'] + '.00</span>\n                                <div>' + data[i]['ptype'] + '</div>\n                                <a style="background: \n                                #008ed0">\u4EA4\u6613\u6210\u529F</a>\n                            </li>\n                        ';
                } else if (data[i]['ptype'] == '交易失败') {
                    str = '\n                            <li>\n                                <div class="content-shop">\n                                <img src="' + data[i]['stu'] + '" alt="">\n                                <div>\n                                <span>' + data[i]['sname'] + '</span>\n                                <span>' + data[i]['senglish'] + '</span>\n                                </div>\n                                </div>\n                                <span>' + data[i]['snewprice'] + '.00</span>\n                                <span>' + data[i]['pcount'] + '</span>\n                                <span>' + data[i]['snewprice'] * data[i]['pcount'] + '.00</span>\n                                <div>' + data[i]['ptype'] + '</div>\n                                <a style="background: \n                                #cccccc">\u4EA4\u6613\u5931\u8D25</a>\n                            </li>\n                        ';
                }
            }

            obj.html(function (i, value) {
                return value + str;
            });
        };

        for (var i = 0; i < data.length; i++) {
            _loop4(i);
        }
    }
    function page(obj, data, da) {
        obj.empty();

        var _loop5 = function _loop5(i) {
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
            _loop5(i);
        }
    }
    //商品选项卡左右箭头
    huanyeList.on('click', '.huanyeList', function () {
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
});