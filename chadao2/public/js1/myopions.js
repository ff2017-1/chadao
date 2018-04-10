$(function () {
    let text=$('.centent-right>textarea');
    let opionsnum=$('.opionsnum');
    let sid=location.search.slice(location.search.indexOf('=')+1);
    let login=JSON.parse(localStorage.login);
    let uname=login['uid'];
    text[0].onkeyup=function(){
        let val=this.value;
        opionsnum.html(this.maxLength-val.length)
    }
    let submit=$('.opions>.bottom');
    submit.on('click',function (){
        let oname=text[0].value;
        let otime=getNowFormatDate();
        $.ajax({
            url:'/teadao/index.php/hthome/addopion',
            data:{oname,otime,sid,uname},
            method:'post',
            success:function (data) {
                if(data=='ok'){
                    $.ajax({
                        url:'/teadao/index.php/home/updateshoppings',
                        data:{sid,ptype:'交易成功',type:'待评价',uname},
                        success:function (data) {
                            if(data=='ok'){
                                alert('添加成功')
                            }else if(data=='error'){
                                alert('支付失败');
                            }
                        }
                    })
                    location.href='/teadao/index.php/home/personal?type=1';
                }else if(data=='error'){
                    alert('添加失败');
                }
            }
        })
        return false;
    })

    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }
})

