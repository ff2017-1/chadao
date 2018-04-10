$(function(){
    // 新品
    $.ajax({
        url: '/teadao/index.php/home/querynewshop',
        data:{type:'新品'},
        method: 'post',
        dataType: 'json',
        success: function success(data){
            $('.newshopsnames').attr('href','/teadao/index.php/home/xiangqing?sid='+data[0]['sid'])
            $('.newshopsname').html(data[0]['sname'])
            $('.newshopsprice').html(data[0]['snewprice']+'.00')
            $('.newshopsenglish').html(data[0]['senglish'])
        }
    });
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
    ////////////////////////////////////////////////////////////////////////
    //获取茶色
    let querycolor=$('#querycolor');
    $.ajax({
        url: '/teadao/index.php/hthome/querycolor',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            render(querycolor,data,'cname','cdescription');
        }
    });
    //获取茶品
    let querytype=$('#querytype');
    $.ajax({
        url: '/teadao/index.php/hthome/querytype',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            render(querytype,data,'tname','tenglish');
        }
    });
    //获取茶产地
    let queryaddress=$('#queryaddress');
    $.ajax({
        url: '/teadao/index.php/hthome/queryadress',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            render(queryaddress,data,'aname','aenglish');
        }
    });
    function render(obj,data,name,english) {
        obj.empty();
        for(let i=0;i<data.length;i++){
            let str=`
                         <li><span class="datatype">${data[i][name]}</span>·<span>${data[i][english]}</span></li>
                     `;
            obj.html(function (i,value) {
                return value+str;
            })
        }
    }
    /////////////////////////获取商品///////////////////////////
    //点击分类获取商品
    querycolor.on('click','li',function () {
        let value=$('.datatype',this).html();
        huanyeajax(1,'scolor',value)
    })
    querytype.on('click','li',function () {
        let value=$('.datatype',this).html();
        huanyeajax(1,'stype',value)
    })
    queryaddress.on('click','li',function () {
        let value=$('.datatype',this).html();
        huanyeajax(1,'saddress',value)
    })
    ///点击全部获取商品
    $('.allshop').on('click',function () {
        huanyeajax(1)
    })
    ///////////////////////////商品列表////////////////////////////////
    let contentList=$('.chanpin');
    let huanye=$('.huanye-list');
    let divbtn1=$('.divbtn1');
    let divbtn2=$('.divbtn2');
    let index=1;
    let maxIndex=0;
    huanyeajax(1)
    function huanyeajax(n,type,value) {
        $.ajax({
            url: '/teadao/index.php/home/listshop',
            data:{page:n,type:type,value:value},
            method: 'post',
            dataType: 'json',
            success: function success(data) {
                lishshop(contentList,data[0]);
                page(huanye,data[1],data[2])
                maxIndex=data[1];
            }
        });
    }
    function page(obj,data,da){
        obj.empty();
        for(let i=1;i<=data;i++){
            let str='';
            if(i==da){
                str=`
                       <li class="huanyeList active"><div class="active">${i}</div></li>
                     `;
            }else{
                str=`
                       <li class="huanyeList"><div>${i}</div></licl>
                     `;
            }

            obj.html(function (i,value) {
                return value+str;
            })
        }

    }
    function lishshop(obj,data) {
        obj.empty();
        for(let i=0;i<data.length;i++){
            let str=`
                    <li id="${data[i]['sid']}">
                        <div class="chanpin-zs">
                            <img src="${data[i]['stu']}"/>
                            <div class="shoptext">
                                <div class="shopname">
                                    <span><b>${data[i]['sname']}</b></span>
                                    <span>${data[i]['senglish']}</span>
                                </div>
                                <div class="shopprice">
                                    <span>${data[i]['snewprice']}.00</span>
                                    <span>人民币</span>
                                </div>
                            </div>
                        </div>
                        <div class="zhezhao">
                              <a href="/teadao/index.php/home/xiangqing?sid=${data[i]['sid']}">
                                  <img src="${data[i]['stu']}"/>
                                  <div class="shoptext1">
                                        <div class="shopprice1">
                                            <span>${data[i]['snewprice']}.00</span>
                                            <span>人民币</span>
                                        </div>
                                        <div class="shopname1">
                                            <span><b>${data[i]['sname']}</b></span>
                                        </div>
                                  </div>
                              </a>
                              <div class="buybox">
                                 <a class="chanpin-buy">BUY</a>
                                 <a class="chanpin-gwcar">
                                     <span class="iconfont icon-cart"></span>
                                 </a>
                             </div>
                       </div>
                    </li>
                     `;
            obj.html(function (i,value) {
                return value+str;
            })
        }
    }
    //加入购物车
    contentList.on('click','.chanpin-gwcar',function () {
        let loginBox=$('.loginBox');
        let loginBoxImg=$('.loginBox-img>img');
        let loginBoxUname=$('.loginBox-uname');
        let sid =$(this).closest('li').attr('id')
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
    contentList.on('click','.chanpin-buy',function () {
        let loginBox=$('.loginBox');
        let loginBoxImg=$('.loginBox-img>img');
        let loginBoxUname=$('.loginBox-uname');
        let sid =$(this).closest('li').attr('id')
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
    //商品选项卡左右箭头
    huanye.on('click','.huanyeList',function () {
        index=$(this).index()+1;
        huanyeajax(index)
    })
    divbtn1.on('click',function () {
        if(index<=1){
            divbtn1.css({color:'#ccc'})
            divbtn2.css({color:'#333'})
            return;
        }else{
            divbtn2.css({color:'#333'})
            divbtn1.css({color:'#333'})
        }
        index--;
        huanyeajax(index)
    })
    divbtn2.on('click',function () {
        if(index>=maxIndex){
            divbtn2.css({color:'#ccc'})
            divbtn1.css({color:'#333'})
            return
        }else{
            divbtn2.css({color:'#333'})
            divbtn1.css({color:'#333'})
        }
        index++;
        huanyeajax(index)
    })


    //////////////动效///////////////////////////////////
    //轮播
    setInterval(function(){
        $("#myCarousel").carousel('next');
    },3000)
    // 列表鼠标移入
    $(".chanpin").on("mouseenter mouseleave",'li', function(e) {
        var w = $(this).width()+12;
        var h = $(this).height()+12;
        var x = (e.offsetX  - (w / 2)) * (w > h ? (h / w) : 1);
        var y = (e.offsetY  - (h / 2)) * (h > w ? (w / h) : 1);
        var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
        this_slidiv = $(this).find('.zhezhao');
        if(e.type == 'mouseenter'){
            switch(direction){
                case 0 :
                    this_slidiv.css({top:-h,left:"0px"});
                    break;
                case 1:
                    this_slidiv.css({top:"0px",left:w});
                    break;
                case 2:
                    this_slidiv.css({top:h,left:"0px"});
                    break;
                case 3:
                    this_slidiv.css({top:"0px",left:-w});
                    break;
            }

            this_slidiv.stop(true,true).animate({"top":"0px","left":"0px"},"fast");

        }else if(e.type == 'mouseleave'){
            switch(direction){
                case 0 :
                    this_slidiv.stop(true,true).animate({"top":-h},500);
                    break;
                case 1:
                    this_slidiv.stop(true,true).animate({"left":w},500);
                    break;
                case 2:
                    this_slidiv.stop(true,true).animate({"top":h},500);
                    break;
                case 3:
                    this_slidiv.stop(true,true).animate({"left":-w},500);
                    break;
            }
        }


    });
});