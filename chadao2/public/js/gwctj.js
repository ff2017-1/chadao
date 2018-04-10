'use strict';

$(function () {
    var data = location.search.slice(location.search.indexOf('?') + 1);
    var sid = void 0,
        pcount = void 0;
    if (data) {
        var dataArr = data.split(',');
        var sidArr = dataArr[0].split('=');
        sid = sidArr[1];
        var pcountArr = dataArr[1].split('=');
        pcount = pcountArr[1];
    }
    ///////////////////////////////////////////////////////////////////////
    var tbody = $('#tbody');
    var login = JSON.parse(localStorage.login);
    var uname = login['uid'];
    /////添加
    var buynow = $('.buynow');
    buynow.on('click', function () {
        $('.zhezhao').addClass('active');
    });
    $('.closes').on('click', function () {
        $('.zhezhao').removeClass('active');
    });
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
                    adddizhi();
                    $('.zhezhao').removeClass('active');
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
                    tbody.html('您还没有填写收货地址，请点击添加新地址');
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

        var _loop = function _loop(i) {
            var str = '';
            if (data[i]['mtype'] == '1') {
                str = '\n                    <tr id="' + data[i]['mid'] + '">\n                    <td type="mname">\n                        <input type="text" value="' + data[i]['mname'] + '" style="width: 80px">\n                    </td>\n                    <td type="mphone">\n                        <input type="text" value="' + data[i]['mphone'] + '" style="width: 90px">\n                    </td>\n                    <td type="maddress">\n                        <input type="text" value="' + data[i]['maddress'] + '">\n                    </td>\n                    <td type="mtype">\n                        <button\n                        style="border:none;outline: none;padding: 5px 10px;border-radius: 5px;font-size: 14px;\n                        background: #007aff;color: #ffffff " class="ztop">\u9ED8\u8BA4\n                        </button>\n                    </td>\n                    <td style="width: 150px">\n                        <div class="button-group">\n                            <a class="button border-red" id="del"><span\n                            class="icon-trash-o" ></span>\u5220\u9664</a>\n                        </div>\n                    </td>\n                </tr>\n                    ';
            } else {
                str = '\n                        <tr id="' + data[i]['mid'] + '">\n                    <td type="mname">\n                        <input type="text" value="' + data[i]['mname'] + '" style="width: 80px">\n                    </td>\n                    <td type="mphone">\n                        <input type="text" value="' + data[i]['mphone'] + '" style="width: 90px">\n                    </td>\n                    <td type="maddress">\n                        <input type="text" value="' + data[i]['maddress'] + '">\n                    </td>\n                    <td type="mtype">\n                        <button class="ztop" style="border:none;outline: none;padding: 5px 3px;border-radius: 5px;font-size: 14px">\u8BBE\u4E3A\u9ED8\u8BA4\n                        </button>\n                    </td>\n                    <td style="width: 150px">\n                        <div class="button-group">\n                            <a class="button border-red" id="del"><span\n                            class="icon-trash-o"></span> \u5220\u9664</a>\n                        </div>\n                    </td>\n                </tr>\n                    ';
            }

            obj.html(function (i, value) {
                return value + str;
            });
        };

        for (var i = 0; i < data.length; i++) {
            _loop(i);
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
                    alert('默认失败');
                }
            }
        });
    });

    ////////////////////////////订单详情////////////////////////////////
    ////////////////////////获取////////////////////////////////////
    var scroll = $('.scroll');
    if (data) {
        $.ajax({
            url: '/index.php/home/querycars',
            data: { uname: uname },
            method: 'post',
            dataType: 'json',
            success: function success(data) {
                renders(scroll, data, sid, pcount);
            }
        });
    } else {
        show();
    }
    function show() {
        $.ajax({
            url: '/index.php/home/queryshopping',
            data: { value: '购物车', uname: uname },
            method: 'post',
            dataType: 'json',
            success: function success(data) {
                render(scroll, data[0]);
            }
        });
    }
    function render(obj, data) {
        obj.empty();
        var total = 0;

        var _loop2 = function _loop2(i) {
            total += data[i]['pcount'] * data[i]['snewprice'];
            var str = '\n                    <li id="' + data[i]['pid'] + '" sid="' + data[i]['sid'] + '">\n                        <div class="tu">\n                            <img src="' + data[i]['stu'] + '" alt="">\n                            <div>\n                               <span>' + data[i]['sname'] + '</span>\n                               <span>' + data[i]['senglish'] + '</span>  \n                            </div>\n                        </div>\n                        <div>\n                            <span>' + data[i]['snewprice'] + '.00</span>\n                        </div>\n                        <div class="shopnum">\n                            <span class="count" id="' + data[i]['snewprice'] + '">' + data[i]['pcount'] + '</span>\n                        </div>\n                        <div class="heji">' + data[i]['pcount'] * data[i]['snewprice'] + '.00</div>\n                    </li>\n                     ';
            obj.html(function (i, value) {
                return value + str;
            });
        };

        for (var i = 0; i < data.length; i++) {
            _loop2(i);
        }
        $('.totalNum').html(total + '.00');
    }
    function renders(obj, data, sid, pcount) {
        obj.empty();
        var total = 0;
        for (var i = 0; i < data.length; i++) {
            if (sid == data[i]['sid'] && pcount == data[i]['pcount'] && data[i]['ptype'] == '购物车') {
                (function () {
                    total += data[i]['pcount'] * data[i]['snewprice'];
                    var str = '\n                    <li id="' + data[i]['pid'] + '" sid="' + data[i]['sid'] + '">\n                        <div class="tu">\n                            <img src="' + data[i]['stu'] + '" alt="">\n                            <div>\n                               <span>' + data[i]['sname'] + '</span>\n                               <span>' + data[i]['senglish'] + '</span>  \n                            </div>\n                        </div>\n                        <div>\n                            <span>' + data[i]['snewprice'] + '.00</span>\n                        </div>\n                        <div class="shopnum">\n                            <span class="count" id="' + data[i]['snewprice'] + '">' + data[i]['pcount'] + '</span>\n                        </div>\n                        <div class="heji">' + data[i]['pcount'] * data[i]['snewprice'] + '.00</div>\n                    </li>\n                     ';
                    obj.html(function (i, value) {
                        return value + str;
                    });
                })();
            }
        }
        $('.totalNum').html(total + '.00');
    }
    ///////////////////////点击效果//////////////////////////////
    var zhifuXq = $('.zhifu-xq');
    $.each(zhifuXq, function (index, value) {
        $(value).on('click', 'li', function () {
            $.each($(value), function () {
                $(this).children('li').removeClass('active');
            });
            $(this).addClass('active');
        });
    });
    ////////////////////////提交订单//////////////////////////
    $('#addDD').on('click', function () {
        if (data) {
            $.ajax({
                url: '/index.php/home/updateshoppings',
                data: { sid: sid, ptype: '待付款', uname: uname, type: '购物车' },
                success: function success(data) {
                    if (data == 'ok') {
                        location.href = '/index.php/home/fukuan';
                    } else if (data == 'error') {
                        alert('提交失败');
                    }
                }
            });
        } else {
            $.ajax({
                url: '/index.php/home/updateshoppings',
                data: { ptype: '待付款', uname: uname, type: '购物车' },
                success: function success(data) {
                    if (data == 'ok') {
                        location.href = '/index.php/home/fukuan';
                    } else if (data == 'error') {
                        alert('提交失败');
                    }
                }
            });
        }
        //
    });
});