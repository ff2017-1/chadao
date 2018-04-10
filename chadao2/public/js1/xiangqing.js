$(function () {
    let sid= location.search.slice(location.search.indexOf('=')+1);
    let num=$('.num').html();
    let jg=0;
    let ptotal=0;
    $.ajax({
        url: '/teadao/index.php/home/queryshop',
        data:{sid},
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            jg=data['snewprice'];
            $('.snames').html(data['sname']);
            $('.sname').html(data['sname']);
            $('.senglish').html(data['senglish']);
            $('.sdescription').html(data['sdescription']);
            $('.snewprice').html(data['snewprice']+'.00');
            $('.sprice').html(data['sprice']+'.00');
            $('.stu').attr('src',data['stu'])
        }
    });
    //点击加号
    $('.add').on('click',function () {
        num++;
        $('.num').html(num);
        ptotal=num*jg;
        $('.snewprice').html(ptotal+'.00');
    })
    //点击减号
    $('.reduce').on('click',function () {
        if(num<=0){
            return;
        }
        num--;
        $('.num').html(num);
        ptotal=num*jg;
        $('.snewprice').html(ptotal+'.00');
    })
    //加入购物车
    $('.gouwu>.addcar>a').on('click',function () {
        let loginBox=$('.loginBox');
        let loginBoxImg=$('.loginBox-img>img');
        let loginBoxUname=$('.loginBox-uname');
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
                    let uname=login['uid'];
                    $.ajax({
                        url:'/teadao/index.php/hthome/addshoppings',
                        data:{sid,pcount:num,ptype:'购物车',ptotal:ptotal,uname},
                        method:'post',
                        success:function (data) {
                            if(data=='ok'){
                                location.href='/teadao/index.php/home/carts?sid='+sid+',pcount='+num;
                            }else if(data=='error'){
                                alert('添加失败');
                            }
                        }
                    })
                }
            }
        });

        return false;
    })
    // 立即购买
    $('.gouwu>.buy>a').on('click',function () {
        let loginBox=$('.loginBox');
        let loginBoxImg=$('.loginBox-img>img');
        let loginBoxUname=$('.loginBox-uname');
        $.ajax({
            url: '/teadao/index.php/home/session',
            method: 'post',
            dataType: 'text',
            success: function success(data) {
                if (data == "您未登录") {
                    alert('请您登录')
                    $('#denglu2').click()
                } else {
                    let login = JSON.parse(localStorage.login);
                    loginBox.addClass('active');
                    loginBoxImg.attr('src', login['uimg'])
                    loginBoxUname.html(login['uname']);
                    loginBoxUname.attr('id', login['uid'])
                    let uname = login['uid'];
                    $.ajax({
                        url: '/teadao/index.php/hthome/addshoppings',
                        data: {sid, pcount: num, ptype: '购物车', ptotal: ptotal, uname},
                        method: 'post',
                        success: function (data) {
                            if (data == 'ok') {
                                location.href = '/teadao/index.php/home/gwctj?sid=' + sid + ',pcount=' + num;
                            } else if (data == 'error') {
                                alert('添加失败');
                            }
                        }
                    })
                }
            }
        });
        return false;
    })
    // 评价
    let pingjiaa=$('.pingjia');
    $.ajax({
        url: '/teadao/index.php/home/querypingjia',
        data:{sid},
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            if(data.length==0){
                pingjiaa.html('该商品还没有评价')
                pingjiaa.css({
                    textAlign:'center',
                    lineHeight:'100px',
                })
            }else{
                pingjia(pingjiaa,data)
            }

        }
    });
    function pingjia(obj,data) {
        obj.empty();
        for(let i=0;i<data.length;i++){
            let str=`
                    <li>
                        <div class="touxiang" style="border-radius: 50%">
                            <img src="${data[i]['uimg']}" alt="" style="border-radius: 50%">
                        </div>
                        <div class="neirong">
                            <div class="word">
                                <div class="uid">${data[i]['uname']}</div>
                                <div class="wenzi">${data[i]['oname']}</div>
                            </div>
                            <div class="time">${data[i]['otime']}</div>
                        </div>
                    </li>
                     `;
            obj.html(function (i,value) {
                return value+str;
            })
        }
    }
    // 本周新品
    let newshoppings=$('.newshopping');
    $.ajax({
        url: '/teadao/index.php/home/querynewshop',
        data:{type:'本周新品'},
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            newshopping(newshoppings,data)
        }
    });
    function newshopping(obj,data) {
        obj.empty();
        for(let i=0;i<data.length;i++){
            let str=`
                    <li>
                        <a href="/teadao/index.php/home/xiangqing?sid=${data[i]['sid']}">
                            <div class="newshopping-img">
                                <img src="${data[i]['stu']}" alt="">
                            </div>
                            <div class="newshopping-text">
                                <span>${data[i]['sname']}</span>
                                <span>${data[i]['senglish']}</span>
                            </div>
                        </a>
                    </li>
                     `;
            obj.html(function (i,value) {
                return value+str;
            })
        }
    }
})