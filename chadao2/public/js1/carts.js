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

    let data= location.search.slice(location.search.indexOf('?')+1);
    let dataArr=data.split(',')
    let sidArr=dataArr[0].split('=')
    let sid=sidArr[1]
    let pcountArr=dataArr[1].split('=')
    let pcount=pcountArr[1]
    $.ajax({
        url: '/teadao/index.php/home/querycars',
        data:{uname},
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            for(let i=0;i<data.length;i++){
                if(sid==data[i]['sid'] && pcount==data[i]['pcount'] && data[i]['ptype']=='购物车'){
                    $('.shopImg>img').attr('src',data[i]['stu']);
                    $('.shopname>.sname').html(data[i]['sname']);
                    $('.shopname>.senglish').html(data[i]['senglish'])
                    $('.shopdescription').html(data[i]['sdescription'])
                    $('.shoptoal>span').html(data[i]['snewprice']*data[i]['pcount']+'.00')
                    $('.shopcarNum>span').html(data.length)
                }
            }
        }
    });
    $('.shopEnd').on('click',function () {
        location.href='/teadao/index.php/home/gouwuche';
    })
    $('.shopBack').on('click',function () {
        location.href='/teadao/index.php/home/xiangqing?sid='+sid;
    })
})