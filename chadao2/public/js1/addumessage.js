$(function () {
    let select=$('#select');
    $.ajax({
        url: '/teadao/index.php/hthome/queryUsers',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            console.log(data)
            render(select,data);
        }
    });
    function render(obj, data) {
        obj.empty();
        for (let i = 0; i < data.length; i++) {
            let str = `
               <option value="${data[i]['uname']}">${data[i]['uname']}</option>
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
            url:'/teadao/index.php/hthome/addumessages',
            data:data,
            processData:false,
            contentType:false,
            method:'post',
            success:function (data) {
                if(data=='ok'){
                    location.href='/teadao/index.php/hthome/umessage';
                }else if(data=='error'){
                    alert('添加失败');
                }
            }
        })
        return false;
    })

})