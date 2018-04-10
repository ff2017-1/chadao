$(function () {
    let login=JSON.parse(localStorage.login);
    let uname=login['uid']
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
    ////////////////////////获取////////////////////////////////////
    let scroll = $('.scroll');
    let huanyelist=$('.huanye>.huanye-list');
    let divbtn1=$('.divbtn1');
    let divbtn2=$('.divbtn2');
    let index=0,maxindex=0;

    show(1)
    function show(n) {
        $.ajax({
            url: '/teadao/index.php/home/queryshopping',
            data:{value:'购物车',page:n,uname},
            method: 'post',
            dataType: 'json',
            success: function success(data) {
                if(data[0].length==0){
                    scroll.html('您的购物车空空如也')
                    scroll.css({
                        textAlign:'center',
                        lineHeight:'100px',

                    })
                }else{
                    render(scroll,data[0])
                    page(huanyelist,data[1],data[2])
                    maxindex=data[1]
                    total()
                }
            }
        });
    }

    function render(obj,data){
        obj.empty();
        for(let i=0;i<data.length;i++){
            let str=`
                    <li id="${data[i]['pid']}" sid="${data[i]['sid']}">
                        <div class="tu">
                            <img src="${data[i]['stu']}" alt="">
                        </div>
                        <div>
                           <span>${data[i]['sname']}</span>
                           <span>${data[i]['senglish']}</span>  
                        </div>
                        <div>
                            <span>${data[i]['snewprice']}.00</span>
                        </div>
                        <div class="shopnum">
                            <span class="reduce">-</span>
                            [ <span class="count" id="${data[i]['snewprice']}">${data[i]['pcount']}</span> ]
                            <span class="plus">+</span>
                        </div>
                        <div class="heji">${data[i]['pcount']*data[i]['snewprice']}.00</div>
                        <div class="del">删除</div>
                    </li>
                     `;
            obj.html(function (i,value) {
                return value+str;
            })
        }
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
    //商品选项卡左右箭头
    huanyelist.on('click','li',function () {
        index=$(this).index()+1;
        show(index)
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
        show(index)
    })
    divbtn2.on('click',function () {
        if(index>=maxindex){
            divbtn2.css({color:'#ccc'})
            divbtn1.css({color:'#333'})
            return
        }else{
            divbtn2.css({color:'#333'})
            divbtn1.css({color:'#333'})
        }
        index++;
        show(index)
    })
    function update(ids,num,sid) {
        $.ajax({
            url:'/teadao/index.php/home/updateshopping',
            data:{pid:ids,ptype:'购物车',pcount:num,sid:sid},
            success:function (data) {
                if(data=='ok'){
                    console.log('修改成功');
                }else if(data=='error'){
                    console.log('修改失败');
                }
            }
        })
    }


    function total() {
        $.ajax({
            url: '/teadao/index.php/home/querycars',
            data:{uname},
            method: 'post',
            dataType: 'json',
            success: function success(data) {
                let total=0;
                for(let i=0;i<data.length;i++){
                    total+=data[i]['snewprice']*data[i]['pcount']
                }
                $('.totalNum').html(total+'.00')
            }
        });
    }
///////////////////////////////////////购物车添加////////////////////////////////////
        scroll.on('click','.plus',function () {
            let ids = $(this).closest('li').attr('id');
            let sid = $(this).closest('li').attr('sid');
            let num = $(this).prev().html();
            let price=$(this).prev().attr('id');
            num++;
            let heji=num*price;
            $(this).prev().html(num);
            $(this).closest('.shopnum').next().html(heji+'.00');
            update(ids,num,sid);
            show(index)
        })
//     ////////////////////////////////////////购物车减少/////////////////////////
            scroll.on('click','.reduce',function () {
                let ids = $(this).closest('li').attr('id');
                let sid = $(this).closest('li').attr('sid');
                let num = $(this).next().html();
                let price=$(this).next().attr('id');
                num--;
                if(num<=0){
                    num=0
                    let ids=$(this).closest('li').attr('id');
                    $.ajax({
                        url:'/teadao/index.php/hthome/deleteshopping',
                        data:{id:ids},
                        success:function (data) {
                            if(data=='ok'){
                                console.log(1)
                            }else if(data=='error'){
                                console.log(0)
                            }
                        }
                    })
                    $(this).closest('li').animate({marginLeft:'-100%'}).queue(
                        function () {
                            $(this).closest('li').remove()
                        }
                    )
                    show(index)
                }
                let heji=num*price;
                $(this).next().html(num);
                $(this).closest('.shopnum').next().html(heji+'.00');
                update(ids,num,sid);
                show(index)
            })
// ///////////////////////////////////删除////////////////////////////////
    scroll.on('click','.del',function () {
        let ids=$(this).closest('li').attr('id');
        $.ajax({
            url:'/teadao/index.php/hthome/deleteshopping',
            data:{id:ids},
            success:function (data) {
                if(data=='ok'){
                    console.log(1)
                }else if(data=='error'){
                    console.log(0)
                }
            }
        })
        $(this).closest('li').animate({marginLeft:'-100%'}).queue(
            function () {
                $(this).closest('li').remove()
            }
        )
        show();
    })



})