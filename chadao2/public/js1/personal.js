$(function () {
        let login=JSON.parse(localStorage.login);
        let uname=login['uid']
        let btnIndex=0;
        let btnIndexs=location.search.slice(location.search.indexOf('=')+1);
        if(btnIndexs){
            btnIndex=btnIndexs
        }else{
            btnIndex=0;
        }

        // 选项卡
        let btns=$('.content-left-list>li');
        let cards=$('.right-box>li');
        let madds=$('.mddd');
        let jiantous=$('.jiantou');
        btnindex(btnIndex)
        btns.on('click',function () {
            let i=$(this).index()-1;
            btnindex(i);
        });
        function btnindex(i) {
            $.each(cards,function () {
                $(this).removeClass('active')
            })
            $.each(madds,function () {
                $(this).removeClass('active')
            })
            $.each(jiantous,function () {
                $(this).removeClass('active')
            })
            $(cards[i]).addClass('active')
            $(madds[i]).addClass('active')
            $(jiantous[i]).addClass('active')
        }
        /////////////////////////////本周新品///////////////////////////////
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
        ////////////////////////////地址管理////////////////////////////////
        let tbody=$('#tbody');
        /////添加
        let submit=$('#sub');
        submit.on('click',function (){
            let mphone=$('.mphone')[0].value;
            let myb=$('.myb')[0].value;
            let maddress=$('.maddress')[0].value;
            let mname=$('.mname')[0].value;
            $.ajax({
                url:'/teadao/index.php/hthome/addumessages',
                data:{mphone,myb,maddress,mname,uname},
                method:'post',
                success:function (data) {
                    if(data=='ok'){
                        alert('添加成功');
                        $('.mphone')[0].value='';
                        $('.myb')[0].value='';
                        $('.mname')[0].value='';
                        $('.maddress')[0].value='';
                        adddizhi();
                    }else if(data=='error'){
                        alert('添加失败');
                    }
                }
            })
            return false;
        })
        /////获取
        adddizhi()
        function adddizhi() {
            $.ajax({
                url: '/teadao/index.php/home/queryUmessage',
                method: 'post',
                data:{uname},
                dataType: 'json',
                success: function success(data) {
                    if(data.length==0){
                        tbody.html('您的收货地址空空如也')
                        tbody.css({
                            textAlign:'center',
                            lineHeight:'100px',
                        })
                    }else{
                        renderdizhi(tbody,data);
                    }
                }
            });
        }
        function renderdizhi(obj, data) {
            obj.empty();
            for(let i=0;i<data.length;i++){
                let str='';
                if(data[i]['mtype']=='1'){
                    str=`
                    <tr id="${data[i]['mid']}">
                    <td type="mname">
                        <input type="text" value="${data[i]['mname']}" style="width: 80px">
                    </td>
                    <td type="mphone">
                        <input type="text" value="${data[i]['mphone']}" style="width: 90px">
                    </td>
                    <td type="maddress">
                        <input type="text" value="${data[i]['maddress']}">
                    </td>
                    <td type="mtype">
                        <button
                        style="border:none;outline: none;padding: 5px 16px;border-radius: 5px;font-size: 14px;
                        background: #007aff;color: #ffffff " class="ztop">默认
                        </button>
                    </td>
                    <td style="width: 150px">
                        <div class="button-group">
                            <a class="button border-red" id="del"><span
                            class="icon-trash-o" ></span>删除</a>
                        </div>
                    </td>
                </tr>
                    `;
                }else{
                    str=`
                        <tr id="${data[i]['mid']}">
                    <td type="mname">
                        <input type="text" value="${data[i]['mname']}" style="width: 80px">
                    </td>
                    <td type="mphone">
                        <input type="text" value="${data[i]['mphone']}" style="width: 90px">
                    </td>
                    <td type="maddress">
                        <input type="text" value="${data[i]['maddress']}">
                    </td>
                    <td type="mtype">
                        <button class="ztop" style="border:none;outline: none;padding: 5px 2px;border-radius: 5px;font-size: 14px">设为默认
                        </button>
                    </td>
                    <td style="width: 150px">
                        <div class="button-group">
                            <a class="button border-red" id="del"><span
                            class="icon-trash-o"></span> 删除</a>
                        </div>
                    </td>
                </tr>
                    `;
                }


                obj.html(function (i,value) {
                    return value+str;
                })
            }
        }
        ///删除
        tbody.on('click','#del',function () {
            let tr=$(this).closest('tr');
            let ids=tr.attr('id');
            $.ajax({
                url:'/teadao/index.php/hthome/deleteUmessage',
                data:{id:ids},
                success:function (data) {
                    if(data=='ok'){
                        tr.remove();
                        adddizhi();
                    }else if(data=='error'){
                        alert('fail');
                    }
                }
            })
        })
        /////修改
        tbody.on('blur','input',function () {
            let value=$(this).val();
            let type=$(this).closest('td').attr('type');
            let ids=$(this).closest('tr').attr('id');
            $.ajax({
                url:'/teadao/index.php/hthome/updateUmessage',
                data:{id:ids,type:type,value:value},
                success:function (data) {
                    if(data=='ok'){
                        alert('修改成功');
                        adddizhi();
                    }else if(data=='error'){
                        alert('修改失败');
                    }
                }
            })
        })
        ///置顶
        tbody.on('click','.ztop',function () {
            let tr=$(this).closest('tr');
            let ids=tr.attr('id');
            $.ajax({
                url:'/teadao/index.php/home/addressztop',
                data:{id:ids},
                success:function (data) {
                    if(data=='ok'){
                        alert('默认成功');
                        adddizhi();
                    }else if(data=='error'){
                        alert('默认成功');
                    }
                }
            })
        })
        ////////////////////////////评价管理////////////////////////////////
        //获取
        let opionstbody=$('.opionstbody');
        opionajax()
        function opionajax() {
            $.ajax({
                url: '/teadao/index.php/home/queryopions',
                method: 'post',
                data:{uname},
                dataType: 'json',
                success: function success(data) {
                    if(data.length==0){
                        opionstbody.html('您还没有评价')
                        opionstbody.css({
                            textAlign:'center',
                            lineHeight:'100px',
                        })
                    }else{
                        render(opionstbody,data);
                    }

                }
            });
        }
        function render(obj, data) {
            obj.empty();
            for(let i=0;i<data.length;i++){
                let str=`
                   <li>
                       <div class="shopopionsnames">
                           <p  class="shopopionsname">${data[i]['sname']}</p>
                           <div><span  class="shopopionsnewprice">${data[i]['snewprice']}</span>人/民/币</div>
                        </div>
                        <div class="shopopion">
                           <span>${data[i]['oname']}</span>
                            <span>${data[i]['otime']}</span>
                        </div>
                        <div class="shopopionsbtn">
                             <a class="goopions" href="/teadao/index.php/home/myopions?sid=${data[i]['sid']}">去追评</a>
                             <a class="shopagin" href="/teadao/index.php/home/xiangqing?sid=${data[i]['sid']}">再次购买</a>
                        </div>
                    </li>
                `;
                obj.html(function (i,value) {
                    return value+str;
                })
            }
        }
        ////////////////////////////订单管理////////////////////////////////
        let contentRight3=$('.content-right3');
        let huanyeList=$('.huanye-list');
        let divbtn1=$('.divbtn1');
        let divbtn2=$('.divbtn2');
        let index=1;
        let maxIndex=0;
        huanyeajax(1)
        function huanyeajax(n) {
            $.ajax({
                url: '/teadao/index.php/home/queryshopping',
                method: 'post',
                data:{page:n,uname},
                dataType: 'json',
                success: function success(data) {
                    if(data[0].length==0){
                        contentRight3.html('您还没有订单')
                        contentRight3.css({
                            textAlign:'center',
                            lineHeight:'100px',
                        })
                    }else{
                        renderdd(contentRight3, data[0])
                        page(huanyeList,data[1],data[2])
                        maxIndex=data[1];
                    }

                }
            });
        }
        function renderdd(obj, data) {
            obj.empty();
            for(let i=0;i<data.length;i++){
                let str="";
                if(data[i]['ptype']!=='购物车'){
                    if(data[i]['ptype'] =='待付款'){
                        str=`
                            <li>
                                <div class="content-shop">
                                <img src="${data[i]['stu']}" alt="">
                                <div>
                                <span>${data[i]['sname']}</span>
                                <span>${data[i]['senglish']}</span>
                                </div>
                                </div>
                                <span>${data[i]['snewprice']}.00</span>
                                <span>${data[i]['pcount']}</span>
                                <span>${data[i]['snewprice']*data[i]['pcount']}.00</span>
                                <div>${data[i]['ptype']}</div>
                                <a href="/teadao/index.php/home/gwctj">去付款</a>
                            </li>
                        `;
                    }else if(data[i]['ptype'] =='待评价'){
                        str=`
                            <li>
                                <div class="content-shop">
                                <img src="${data[i]['stu']}" alt="">
                                <div>
                                <span>${data[i]['sname']}</span>
                                <span>${data[i]['senglish']}</span>
                                </div>
                                </div>
                                <span>${data[i]['snewprice']}.00</span>
                                <span>${data[i]['pcount']}</span>
                                <span>${data[i]['snewprice']*data[i]['pcount']}.00</span>
                                <div>${data[i]['ptype']}</div>
                                <a href="/teadao/index.php/home/myopions?sid=${data[i]['sid']}" style="background: 
                                #ff6700">去评价</a>
                            </li>
                        `;
                    }else if(data[i]['ptype'] =='交易成功'){
                        str=`
                            <li>
                                <div class="content-shop">
                                <img src="${data[i]['stu']}" alt="">
                                <div>
                                <span>${data[i]['sname']}</span>
                                <span>${data[i]['senglish']}</span>
                                </div>
                                </div>
                                <span>${data[i]['snewprice']}.00</span>
                                <span>${data[i]['pcount']}</span>
                                <span>${data[i]['snewprice']*data[i]['pcount']}.00</span>
                                <div>${data[i]['ptype']}</div>
                                <a style="background: 
                                #008ed0">交易成功</a>
                            </li>
                        `;
                    }else if(data[i]['ptype'] =='交易失败'){
                        str=`
                            <li>
                                <div class="content-shop">
                                <img src="${data[i]['stu']}" alt="">
                                <div>
                                <span>${data[i]['sname']}</span>
                                <span>${data[i]['senglish']}</span>
                                </div>
                                </div>
                                <span>${data[i]['snewprice']}.00</span>
                                <span>${data[i]['pcount']}</span>
                                <span>${data[i]['snewprice']*data[i]['pcount']}.00</span>
                                <div>${data[i]['ptype']}</div>
                                <a style="background: 
                                #cccccc">交易失败</a>
                            </li>
                        `;
                    }

                }

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
        huanyeList.on('click','.huanyeList',function () {
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
    })


