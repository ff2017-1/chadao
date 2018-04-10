'use strict';

$(function () {
    $('#denglu').click(function () {
        $('.yhdl').addClass('login-active');
        $('#denglu1').addClass('login-active');
    });
    $('#denglu2').click(function () {
        $('.yhdl').addClass('login-active');
        $('.zz-box').removeClass('login-active');
        $('#denglu1').addClass('login-active');
    });
    $('#zhuce').click(function () {
        $('.yhdl').addClass('login-active');
        $('#zhuce1').addClass('login-active');
    });
    $('#zhuce2').click(function () {
        $('.yhdl').addClass('login-active');
        $('.zz-box').removeClass('login-active');
        $('#zhuce1').addClass('login-active');
    });
    $('.closes').click(function () {
        $('.yhdl').removeClass('login-active');
        $('.zz-box').removeClass('login-active');
    });

    $.ajax({
        url: '/index.php/home/session',
        method: 'post',
        dataType: 'text',
        success: function success(data) {
            if (data == "您未登录"){
                console.log('您未登录')
            } else {
                var login = JSON.parse(localStorage.login);
                var _loginBox = $('.loginBox');
                var _loginBoxImg = $('.loginBox-img>img');
                var _loginBoxUname = $('.loginBox-uname');
                _loginBox.addClass('active');
                _loginBoxImg.attr('src', login['uimg']);
                _loginBoxUname.html(login['uname']);
                _loginBoxUname.attr('id', login['uid']);
            }
        }
    });
    var user = $('#users');
    var upass = $('#pwds');
    let yz=$('#yz')
    var btn = $('#submits');
    var loginBox = $('.loginBox');
    var loginBoxImg = $('.loginBox-img>img');
    var loginBoxUname = $('.loginBox-uname');
    //登录验证
    $('.zz-box input').on('blur', function () {
        var e = $(this);
        if (e.attr('data-validate')) {
            var value = e.val().trim();
            var validate = e.attr('data-validate').split(';');
            var flag = true;
            for (var i = 0; i < validate.length; i++) {
                var arr = validate[i].split(':');
                if (!validateType(value, arr[0])) {
                    $(this).closest('p').find('.form-help').remove();
                    $('<div>').addClass('form-help').insertAfter(this).text(arr[1]);
                    flag = false;
                    break;
                }
            }
            if (flag) {
                $(this).closest('p').find('.form-help').remove();
            }
        }
    });
    //确认验证
    $('#surepwd').on('blur', function () {
        if ($('#pwd').val() != $('#surepwd').val() && $('#pwd').val().trim() != '') {
            $('#surepwd').closest('p').find('.form-help').remove();
            $('<div>').addClass('form-help').insertAfter(this).text('两次密码输入不一样');
        }
    });
    //更新验证码
    $('#yzBox>img').on('click',function () {
        $(this).attr('src','/App/code.php?id='+Math.random())
    })
    function validateType(value, type) {
        switch (type) {
            case 'require':
                return (/[^(^\s*|\s*$)]/.test(value)
                );
                break;
            case 'username':
                return (/^[\u4e00-\u9fff\w]{1,10}$/.test(value)
                );
                break;
            case 'password':
                return (/^\w{1,10}$/.test(value)
                );
            case 'yz':
                return (/^\w{1,4}$/.test(value)
                );
                break;
        }
    }
    btn.on('click', function () {
        $('input').trigger('blur');
        if ($('.froms .form-help').length) {
            return;
        }
        var data = { user: user.val(), upass: upass.val(),yz:yz.val() };
        $.ajax({
            url: "/index.php/home/check",
            data: data,
            dataType: 'json',
            success: function success(data) {
                if (data == '密码错误') {
                    alert('密码输入错误');
                    $('#yzBox>img').click();
                } else if(data=='验证码错误'){
                    alert('验证码输入错误');
                    $('#yzBox>img').click();
                }else if (data == '用户名不存在') {
                    alert('该用户不存在');
                    $('#zhuce2').click();
                } else {
                    localStorage.setItem('login', JSON.stringify(data));
                    loginBox.addClass('active');
                    loginBoxImg.attr('src', data['uimg']);
                    loginBoxUname.html(data['uname']);
                    loginBoxUname.attr('id', data['uid']);
                    $('.closes').click();
                }
            }
        });
        return false;
    });
    //注册
    var uname = '';
    var upa = '';
    $('#user').on('blur', function () {
        uname = this.value;
    });
    $('#surepwd').on('blur', function () {
        upa = this.value;
    });
    var uimg = '/public/img/11.jpg';
    var btns = $('#submit');
    btns.on('click', function () {
        if ($('.from .form-help').length) {
            return;
        }
        $.ajax({
            url: '/index.php/hthome/adduser',
            data: { uname: uname, upass: upa, uimg: uimg },
            method: 'post',
            success: function success(data) {
                if (data == 'ok') {
                    alert('注册成功,快登陆吧');
                    $('#denglu2').click();
                } else if (data == 'error') {
                    alert('注册失败');
                }
            }
        });
        return false;
    });
    /////////////////////////////退出登录/////////////////////////////
    $('.btnTc').on('click', function () {
        loginBoxImg.attr('src', '');
        loginBoxUname.html('');
        loginBoxUname.attr('id', '');
        loginBox.removeClass('active');
        $.ajax({
            url: '/index.php/home/updatesession',
            method: 'post',
            dataType: 'json',
            success: function success(data) {
                console.log(data)
                if (data == 'ok') {
                    alert('退出成功');
                    location.href = '/index.php/home/index';
                }
            }
        });
        localStorage.clear();
    });
    //////////////////////搜索///////////////////////////////////
    var seas = $('#sea');
    var input = document.querySelector('#seas');
    input.onkeyup = function () {
        var value = input.value.trim();
        $.ajax({
            url: '/index.php/home/sea',
            data: { value: value },
            dataType: 'json',
            success: function success(data) {
                if (value.length == 0) {
                    seas.css({ display: 'none' });
                } else {
                    sea(seas, data);
                    seas.css({ display: 'block' });
                }
            }

        });
    };
    function sea(obj, data) {
        if (data.length == 0) {
            obj.html('没有您要搜索的产品');
        } else {
            obj.empty();
            var str = '';
            for (var i = 0; i < data.length; i++) {
                str += '\n                   <li><a href="/index.php/home/xiangqing?sid=' + data[i]['sid'] + '">\n                             <div class="seaimg"><img src="' + data[i]['stu'] + '" alt=""></div>\n                             <div class="seatext">\n                             <span>' + data[i]['snewprice'] + '.00</span>\n                             <span>' + data[i]['sname'] + '</span>\n                             <span>' + data[i]['senglish'] + '</span>\n                       </div>\n                   </a></li>\n            ';
            }
            obj.html(str);
        }
    }
    //////////////////购物车，个人中心///////////////////////////
    $('#gouwuche').on('click', function () {
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
                    location.href = '/index.php/home/gouwuche';
                }
            }
        });
    });
    $('#personal').on('click', function () {
        var loginBox = $('.loginBox');
        var loginBoxImg = $('.loginBox-img>img');
        var loginBoxUname = $('.loginBox-uname');
        $.ajax({
            url: '/index.php/home/session',
            method: 'post',
            dataType: 'text',
            success: function success(data) {
                console.log(data);
                if (data == "您未登录") {
                    alert('请您登录');
                    $('#denglu2').click();
                } else {
                    var login = JSON.parse(localStorage.login);
                    loginBox.addClass('active');
                    loginBoxImg.attr('src', login['uimg']);
                    loginBoxUname.html(login['uname']);
                    loginBoxUname.attr('id', login['uid']);
                    location.href = '/index.php/home/personal';
                }
            }
        });
    });
});