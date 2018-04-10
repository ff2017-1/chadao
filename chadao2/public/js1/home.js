$(function () {
    // 本周新品
    let newshoppings=$('.buybox');
    $.ajax({
        url: '/teadao/index.php/home/querynewshop',
        data:{type:'首页新品'},
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
                        <a href="/teadao/index.php/home/xiangqing?sid=${data[i]['sid']}" class="tjshoptext">
                            <div class="tjshopprice">
                                <span>${data[i]['snewprice']}.00</span>
                                <span>[新品]人/名/币</span>
                            </div>
                            <div class="tjshopsname">
                                <span>${data[i]['sname']}</span>
                                <span>${data[i]['senglish']}</span>
                            </div>
                        </a>
                        <div class="buy">
                            <span><a  class="buyss" id="${data[i]['sid']}">BUY</a></span>
                            <a class="buys" id="${data[i]['sid']}"><i class="iconfont icon-cart"></i></a>
                        </div>
                     `;
            obj.html(function (i,value) {
                return value+str;
            })
        }
    }
    // 热门推荐
    let hothoppings=$('.tuijian>ul');
    $.ajax({
        url: '/teadao/index.php/home/querynewshop',
        data:{type:'热门推荐'},
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            hothopping(hothoppings,data)
        }
    });
    function hothopping(obj,data) {
            obj.empty();
            let str=`
            <li><a href="/teadao/index.php/home/xiangqing?sid=${data[0]['sid']}">
                <img src="${data[0]['stu']}" alt="">
            </a></li>
            <li>
                 <div class="tjdes">
                    <span><b>茶葉/感受自然的味道</b></span>
                    <span>TEA/FEEL THE TSTE OF NATURTEA</span>
                 </div>
                <a href="/teadao/index.php/home/xiangqing?sid=${data[0]['sid']}" class="tjshoptext">
                    <div class="tjshopprice">
                        <span>${data[0]['snewprice']}.00</span>
                        <span>[新品]人/名/币</span>
                    </div>
                    <div class="tjshopsname">
                        <span>${data[0]['sname']}</span>
                        <span>${data[0]['senglish']}</span>
                    </div>
                </a>
                <div class="buy">
                    <a  class="buys" id="${data[0]['sid']}">
                        <i class="iconfont icon-cart"></i>
                    </a>
                    <span>
                        <a class="buyss" id="${data[0]['sid']}">BUY</a>
                    </span>
                </div>
            </li>
            <li>
              
                 <div class="tjdes">
                    <span><b>茶葉/感受自然的味道</b></span>
                    <span>TEA/FEEL THE TSTE OF NATURTEA</span>
                 </div>
                <a href="/teadao/index.php/home/xiangqing?sid=${data[1]['sid']}" class="tjshoptext">
                    <div class="tjshopprice">
                        <span>${data[1]['snewprice']}.00</span>
                        <span>[新品]人/名/币</span>
                    </div>
                    <div class="tjshopsname">
                        <span>${data[1]['sname']}</span>
                        <span>${data[1]['senglish']}</span>
                    </div>
                </a>
                <div class="buy">
                    <a  class="buys" id="${data[1]['sid']}">
                        <i class="iconfont icon-cart"></i>
                    </a>
                    <span>
                        <a  class="buyss" id="${data[1]['sid']}">BUY</a>
                    </span>
                </div>
            </li>
            <li><a href="/teadao/index.php/home/xiangqing?sid=${data[1]['sid']}">
               <img src="${data[1]['stu']}" alt="">
            </a></li>
                      
                     `;
            obj.html(function (i,value) {
                return value+str;
            })
    }
    //贴心服务
    let fuwubtn=$(".fuwubtn");
    let fuwulist=$('.fuwulist');
    $.ajax({
        url: '/teadao/index.php/home/queryfuwu',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            fuwu(fuwulist,data)
        }
    });
    function fuwu(obj,data) {
        obj.empty();
        for(let i=0;i<data.length;i++){
            let str='';
            if(i==0){
                str=`
                    <li class="active">
                        <div class="fwhead">
                            <ul>
                                <li>${data[i]['vtitle']}</li>
                            </ul>
                        </div>
                        <div class="xian">
                            <div class="yuan"></div>
                        </div>
                        <p>${data[i]['vcontent']}</p>
                        <p>${data[i]['venglish']}</p>
                        <div class="kong"></div>
                        <div class="tu"><img src="${data[i]['vimg1']}" alt=""></div>
                    </li>
                `;
            }else{
                str=`
                    <li>
                        <div class="fwhead">
                            <ul>
                                <li>${data[i]['vtitle']}</li>
                            </ul>
                        </div>
                        <div class="xian">
                            <div class="yuan"></div>
                        </div>
                        <p>${data[i]['vcontent']}</p>
                        <p>${data[i]['venglish']}</p>
                        <div class="kong"></div>
                        <div class="tu"><img src="${data[i]['vimg1']}" alt=""></div>
                    </li>
                `;
            }
            obj.html(function (i,value) {
                return value+str;
            })
        }
    }
    fuwubtn.on('click','li',function (){
        let index=$(this).index();
        $.each(fuwubtn,function () {
            $(this).find('li').removeClass('active');
            $(this).find('li').find('div').removeClass('active');
        })
        $.each(fuwulist,function () {
            $(this).children('li').removeClass('active');
        })
        $(fuwulist.children('li')[index]).addClass('active');
        $(this).find('div').addClass('active');
        $(this).addClass('active');
    })
    //加入购物车
    newshoppings.on('click','.buys',function () {
        let sid =$(this).attr('id')
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
                    $.ajax({
                        url:'/teadao/index.php/hthome/addshoppings',
                        data:{sid,pcount:1,ptype:'购物车',uname},
                        method:'post',
                        success:function (data) {
                            if(data=='ok'){
                                location.href='/teadao/index.php/home/carts?sid='+sid+',pcount=1';
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
    hothoppings.on('click','.buys',function () {
        let sid =$(this).attr('id')
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
                    $.ajax({
                        url:'/teadao/index.php/hthome/addshoppings',
                        data:{sid,pcount:1,ptype:'购物车',uname},
                        method:'post',
                        success:function (data) {
                            if(data=='ok'){
                                location.href='/teadao/index.php/home/carts?sid='+sid+',pcount=1';
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
    hothoppings.on('click','.buyss',function () {
        let sid =$(this).attr('id')
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
                    $.ajax({
                        url:'/teadao/index.php/hthome/addshoppings',
                        data:{sid,pcount:1,ptype:'购物车',uname},
                        method:'post',
                        success:function (data) {
                            if(data=='ok'){
                                location.href='/teadao/index.php/home/gwctj?sid='+sid+',pcount=1';
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
    newshoppings.on('click','.buyss',function () {
        let sid =$(this).attr('id')
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
                    $.ajax({
                        url:'/teadao/index.php/hthome/addshoppings',
                        data:{sid,pcount:1,ptype:'购物车',uname},
                        method:'post',
                        success:function (data) {
                            if(data=='ok'){
                                location.href='/teadao/index.php/home/gwctj?sid='+sid+',pcount=1';
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
    // 轮播
    setInterval(function(){
        $("#myCarousel").carousel('next');
    },3000)

})