$(function () {
    $('#denglu').click(function () {
        $('.yhdl').addClass('login-active')
        $('#denglu1').addClass('login-active')
    })
    $('#denglu2').click(function () {
        $('.yhdl').addClass('login-active')
        $('.zz-box').removeClass(('login-active'))
        $('#denglu1').addClass('login-active')
    })

    $('#zhuce').click(function () {
        $('.yhdl').addClass('login-active')
        $('#zhuce1').addClass('login-active')
    })

    $('#zhuce2').click(function () {
        $('.yhdl').addClass('login-active')
        $('.zz-box').removeClass(('login-active'))
        $('#zhuce1').addClass('login-active')
    })
    $('.close').click(function () {
        $('.yhdl').removeClass(('login-active'))
        $('.zz-box').removeClass(('login-active'))
    })

    $.ajax({
        url: '/teadao/index.php/home/session',
        method: 'post',
        dataType: 'text',
        success: function success(data) {
            if(data=="您未登录"){

            }else{
                let login=JSON.parse(localStorage.login);
                let loginBox=$('.loginBox');
                let loginBoxImg=$('.loginBox-img>img');
                let loginBoxUname=$('.loginBox-uname');
                loginBox.addClass('active');
                loginBoxImg.attr('src',login['uimg'])
                loginBoxUname.html(login['uname']);
                loginBoxUname.attr('id',login['uid'])
            }
        }
    });
    let user=$('#users');
    let upass=$('#pwds');
    let btn=$('#submits');
    let loginBox=$('.loginBox');
    let loginBoxImg=$('.loginBox-img>img');
    let loginBoxUname=$('.loginBox-uname');
    //登录验证
    $('.zz-box input').on('blur',function () {
        let e=$(this);
        if(e.attr('data-validate')){
            let value=e.val().trim();
            let validate=e.attr('data-validate').split(';');
            let flag=true;
            for(let i=0;i<validate.length;i++){
                let arr=validate[i].split(':');
                if(!validateType(value,arr[0])){
                    $(this).closest('p').find('.form-help').remove();
                    $('<div>').addClass('form-help').insertAfter(this).text(arr[1]);
                    flag=false;
                    break;
                }
            }
            if(flag){
                $(this).closest('p').find('.form-help').remove();
            }
        }
    })
    //确认验证
    $('#surepwd').on('blur',function () {
            if($('#pwd').val()!=$('#surepwd').val() && $('#pwd').val().trim()!=''){
                $('#surepwd').closest('p').find('.form-help').remove();
                $('<div>').addClass('form-help').insertAfter(this).text('两次密码输入不一样');
            }
    })
    function validateType(value,type) {
        switch (type){
            case 'require' :
                return /[^(^\s*|\s*$)]/.test(value);
                break;
            case 'username' :
                return  /^[\u4e00-\u9fff\w]{1,10}$/.test(value);
                break;
            case 'password' :
                return /^\w{1,10}$/.test(value);
                break;
        }
    }
    btn.on('click',function(){
        $('input').trigger('blur');
        if ($('.froms .form-help').length){
            return;
        }
        let data={user:user.val(),upass:upass.val()};
        $.ajax({
            url: "/teadao/index.php/home/check",
            data:data,
            dataType: 'json',
            success: function(data){
                if(data=='密码错误'){
                    alert('密码输入错误');
                }else if(data=='用户名不存在'){
                    alert('该用户不存在');
                    $('#zhuce2').click();
                }else{
                    localStorage.setItem('login',JSON.stringify(data))
                    loginBox.addClass('active');
                    loginBoxImg.attr('src',data['uimg'])
                    loginBoxUname.html(data['uname']);
                    loginBoxUname.attr('id',data['uid'])
                    $('.close').click();
                }
            }
        });
        return false;
    })
    //注册
    let uname='';
    let upa='';
    $('#user').on('blur',function () {
        uname=this.value
    })
    $('#surepwd').on('blur',function () {
        upa=this.value
    })
    let uimg='/teadao/public/img/11.jpg'
    let btns=$('#submit');
    btns.on('click',function (){
        if ($('.from .form-help').length){
            return;
        }
        $.ajax({
            url:'/teadao/index.php/hthome/adduser',
            data:{uname:uname,upass:upa,uimg:uimg},
            method:'post',
            success:function (data) {
                if(data=='ok'){
                    alert('注册成功,快登陆吧');
                    $('#denglu2').click();
                }else if(data=='error'){
                    alert('注册失败');
                }
            }
        })
        return false;
    })
    /////////////////////////////退出登录/////////////////////////////
    $('.btnTc').on('click',function () {
        loginBoxImg.attr('src','')
        loginBoxUname.html('');
        loginBoxUname.attr('id','')
        loginBox.removeClass('active');
        $.ajax({
            url: '/teadao/index.php/home/updatesession',
            method: 'post',
            dataType: 'text',
            success: function success(data) {
               if(data=='ok'){
                   location.href = '/teadao/index.php/home/index';
                   alert('退出成功')
               }
            }
        });
        localStorage.clear();
    })
    //////////////////////搜索///////////////////////////////////
    let seas=$('#sea')
    var input = document.querySelector('#seas');
    input.onkeyup = function () {
        var value = input.value.trim();
        $.ajax({
            url: '/teadao/index.php/home/sea',
            data: {value},
            dataType: 'json',
            success: function success(data){
                if(value.length==0){
                    seas.css({ display: 'none'});
                }else{
                    sea(seas,data);
                    seas.css({ display: 'block'});
                }
            }

        });
    };
    function sea(obj,data) {
        if (data.length == 0) {
            obj.html('没有您要搜索的产品')
        } else {
            obj.empty();
            let str = '';
            for (let i = 0; i < data.length; i++) {
                str += `
                   <li><a href="/teadao/index.php/home/xiangqing?sid=${data[i]['sid']}">
                             <div class="seaimg"><img src="${data[i]['stu']}" alt=""></div>
                             <div class="seatext">
                             <span>${data[i]['snewprice']}.00</span>
                             <span>${data[i]['sname']}</span>
                             <span>${data[i]['senglish']}</span>
                       </div>
                   </a></li>
            `;
            }
            obj.html(str);
        }
    }
    //////////////////购物车，个人中心///////////////////////////
    $('#gouwuche').on('click',function () {
        let loginBox=$('.loginBox');
        let loginBoxImg=$('.loginBox-img>img');
        let loginBoxUname=$('.loginBox-uname');
        let uname='';
        $.ajax({
            url: '/teadao/index.php/home/session',
            method: 'post',
            dataType: 'text',
            success: function success(data) {
                if(data=="您未登录"){
                    alert('请您登录')
                    $('#denglu2').click()
                }else{
                    let login=JSON.parse(localStorage.login);
                    loginBox.addClass('active');
                    loginBoxImg.attr('src',login['uimg'])
                    loginBoxUname.html(login['uname']);
                    loginBoxUname.attr('id',login['uid'])
                    uname=login['uid'];
                    location.href='/teadao/index.php/home/gouwuche'
                }
            }
        });
    })
    $('#personal').on('click',function () {
        let loginBox=$('.loginBox');
        let loginBoxImg=$('.loginBox-img>img');
        let loginBoxUname=$('.loginBox-uname');
        $.ajax({
            url: '/teadao/index.php/home/session',
            method: 'post',
            dataType: 'text',
            success: function success(data) {
                console.log(data)
                if(data=="您未登录"){
                    alert('请您登录')
                    $('#denglu2').click()
                }else{
                    let login=JSON.parse(localStorage.login);
                    loginBox.addClass('active');
                    loginBoxImg.attr('src',login['uimg'])
                    loginBoxUname.html(login['uname']);
                    loginBoxUname.attr('id',login['uid'])
                    location.href='/teadao/index.php/home/personal'
                }
            }
        });
    })
})