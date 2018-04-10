$(function () {
    ////////////////添加页面//////////////////////////
    let submit=$('#sub');
    submit.on('click',function (){
        let data=new FormData($('form')[0]);
        $.ajax({
            url:'/index.php/hthome/addAdresss',
            data:data,
            processData:false,
            contentType:false,
            method:'post',
            success:function (data) {
                if(data=='ok'){
                    location.href='/index.php/hthome/adress';
                }else if(data=='error'){
                    alert('添加失败');
                }
            }
        })
        return false;
    })
})