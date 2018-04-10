$(function () {
    let data= location.search.slice(location.search.indexOf('?')+1);
    let sid,pcount;
    if(data){
        let dataArr=data.split(',')
        let sidArr=dataArr[0].split('=')
        sid=sidArr[1]
        let pcountArr=dataArr[1].split('=')
        pcount=pcountArr[1]
    }
    ///////////////////////////////////////////////////////////////////////
    let tbody=$('#tbody');
    let login=JSON.parse(localStorage.login);
    let uname=login['uid'];
    /////添加
    let buynow=$('.buynow');
    buynow.on('click',function () {
        $('.zhezhao').addClass('active')
    })
    $('.closes').on('click',function () {
        $('.zhezhao').removeClass('active')
    })
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
                    adddizhi();
                    $('.zhezhao').removeClass('active')
                }else if(data=='error'){
                    alert('添加失败');
                }
            }
        })
        return false;
    })
    /////获取
    adddizhi();
    function adddizhi() {
        $.ajax({
            url: '/teadao/index.php/home/queryUmessage',
            method: 'post',
            data:{uname},
            dataType: 'json',
            success: function success(data) {
                if(data.length==0){
                    tbody.html('您还没有填写收货地址，请点击添加新地址')
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
                        style="border:none;outline: none;padding: 5px 10px;border-radius: 5px;font-size: 14px;
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
                        <button class="ztop" style="border:none;outline: none;padding: 5px 3px;border-radius: 5px;font-size: 14px">设为默认
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
                    alert('默认失败');
                }
            }
        })
    })

    ////////////////////////////订单详情////////////////////////////////
    ////////////////////////获取////////////////////////////////////
    let scroll = $('.scroll');
    if(data){
        $.ajax({
            url: '/teadao/index.php/home/querycars',
            data:{uname},
            method: 'post',
            dataType: 'json',
            success: function success(data) {
                renders(scroll,data,sid,pcount)
            }
        });
    }else{
        show()
    }
    function show() {
        $.ajax({
            url: '/teadao/index.php/home/queryshopping',
            data:{value:'购物车',uname},
            method: 'post',
            dataType: 'json',
            success: function success(data) {
                render(scroll,data[0])
            }
        });
    }
    function render(obj,data){
        obj.empty();
        let total=0;
        for(let i=0;i<data.length;i++){
            total+=data[i]['pcount']*data[i]['snewprice']
            let str=`
                    <li id="${data[i]['pid']}" sid="${data[i]['sid']}">
                        <div class="tu">
                            <img src="${data[i]['stu']}" alt="">
                            <div>
                               <span>${data[i]['sname']}</span>
                               <span>${data[i]['senglish']}</span>  
                            </div>
                        </div>
                        <div>
                            <span>${data[i]['snewprice']}.00</span>
                        </div>
                        <div class="shopnum">
                            <span class="count" id="${data[i]['snewprice']}">${data[i]['pcount']}</span>
                        </div>
                        <div class="heji">${data[i]['pcount']*data[i]['snewprice']}.00</div>
                    </li>
                     `;
            obj.html(function (i,value) {
                return value+str;
            })
        }
        $('.totalNum').html(total+'.00')
    }
    function renders(obj,data,sid,pcount){
        obj.empty();
        let total=0;
        for(let i=0;i<data.length;i++){
            if(sid==data[i]['sid'] && pcount==data[i]['pcount'] && data[i]['ptype']=='购物车'){
                total+=data[i]['pcount']*data[i]['snewprice']
                let str=`
                    <li id="${data[i]['pid']}" sid="${data[i]['sid']}">
                        <div class="tu">
                            <img src="${data[i]['stu']}" alt="">
                            <div>
                               <span>${data[i]['sname']}</span>
                               <span>${data[i]['senglish']}</span>  
                            </div>
                        </div>
                        <div>
                            <span>${data[i]['snewprice']}.00</span>
                        </div>
                        <div class="shopnum">
                            <span class="count" id="${data[i]['snewprice']}">${data[i]['pcount']}</span>
                        </div>
                        <div class="heji">${data[i]['pcount']*data[i]['snewprice']}.00</div>
                    </li>
                     `;
                obj.html(function (i,value) {
                    return value+str;
                })
            }

        }
        $('.totalNum').html(total+'.00')
    }
    ///////////////////////点击效果//////////////////////////////
    let zhifuXq=$('.zhifu-xq');
    $.each(zhifuXq,function (index,value) {
       $(value).on('click','li',function () {
           $.each($(value),function () {
               $(this).children('li').removeClass('active')
           })
           $(this).addClass('active')
       })
    })
    ////////////////////////提交订单//////////////////////////
    $('#addDD').on('click',function () {
        if(data){
            $.ajax({
                url:'/teadao/index.php/home/updateshoppings',
                data:{sid,ptype:'待付款',uname,type:'购物车'},
                success:function (data) {
                    if(data=='ok'){
                        location.href='/teadao/index.php/home/fukuan'
                    }else if(data=='error'){
                        alert('提交失败');
                    }
                }
            })
        }else{
            $.ajax({
                url:'/teadao/index.php/home/updateshoppings',
                data:{ptype:'待付款',uname,type:'购物车'},
                success:function (data) {
                    if(data=='ok'){
                        location.href='/teadao/index.php/home/fukuan'
                    }else if(data=='error'){
                        alert('提交失败');
                    }
                }
            })
        }
        //
    })
})