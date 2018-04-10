$(function () {
    let select=$('#select');
    $.ajax({
        url: '/teadao/index.php/hthome/queryUsers',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            console.log(data)
            render(select,data,'uid','uname');
        }
    });
    let selectSID=$('#selectSID');
    $.ajax({
        url: '/teadao/index.php/hthome/queryshop',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            render(selectSID,data,'sid','sname');
        }
    });
    function render(obj, data,uid,uname) {
        obj.empty();
        for (let i = 0; i < data.length; i++) {
            let str = `
               <option  value="${data[i][uid]}">${data[i][uname]}</option>
            `;
            obj.html(function (i, value) {
                return value + str;
            })
        }
    }
    ////////////////添加页面//////////////////////////
    let submit=$('#sub');
    submit.on('click',function (){
        let data=new FormData($('form')[0]);
        $.ajax({
            url:'/teadao/index.php/hthome/addopion',
            data:data,
            processData:false,
            contentType:false,
            method:'post',
            success:function (data) {
                if(data=='ok'){
                    location.href='/teadao/index.php/hthome/opions';
                }else if(data=='error'){
                    alert('添加失败');
                }
            }
        })
        return false;
    })

})