$(function () {
    let ddbh=location.search.slice(location.search.indexOf('=')+1);
    $('.ddbh').html(ddbh)
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