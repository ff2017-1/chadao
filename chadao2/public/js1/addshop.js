$(function () {
    ///////////////////////上传图片//////////////////////////
    let upload=document.querySelector('#simg');
    let image=document.querySelector('#simage');
    let imgType=['png','gif','jpeg','jpg'];
    let size=5*1024*1024;
    upload.onchange=function(){
        [...this.files].forEach((element,index)=>{
            let eType=element.type.split('/')[1];
            if(!(element.size<=size && imgType.includes(eType))){
                alert('请检查图片类型和大小')
            }
            let reader=new FileReader();
            // //读取文件
            reader.readAsDataURL(element);
            reader.onload=function (e){
                let imgs=new Image();
                imgs.width=200;
                imgs.height=200;
                imgs.src=e.target.result;
                let imgBox=document.querySelector('.imgBox');
                imgBox.appendChild(imgs);
            }
            let data=new FormData();
            data.append('file',element);
            let xml=new XMLHttpRequest();
            xml.open('post','/teadao/index.php/hthome/upload',true);
            xml.send(data);
            xml.onload=function () {
                image.value+=xml.response;
            }
        })
    }
    //////////////////////////////////////////////////
    let selectcolor=$('#selectcolor');
    $.ajax({
        url: '/teadao/index.php/hthome/querycolor',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            rendercolor(selectcolor,data);
        }
    });
    function rendercolor(obj, data) {
        obj.empty();
        for (let i = 0; i < data.length; i++) {
            let str = `
               <option value="${data[i]['cname']}">${data[i]['cname']}</option>
            `;
            obj.html(function (i, value) {
                return value + str;
            })
        }
    }
    //////////////////////////////////////////////////
    let selecttype=$('#selecttype');
    $.ajax({
        url: '/teadao/index.php/hthome/querytype',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            rendertype(selecttype,data);
        }
    });
    function rendertype(obj, data) {
        obj.empty();
        for (let i = 0; i < data.length; i++) {
            let str = `
               <option value="${data[i]['tname']}">${data[i]['tname']}</option>
            `;
            obj.html(function (i, value) {
                return value + str;
            })
        }
    }
    //////////////////////////////////////////////////
    let selectadress=$('#selectadress');
    $.ajax({
        url: '/teadao/index.php/hthome/queryadress',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            renderadress(selectadress,data);
        }
    });
    function renderadress(obj, data) {
        obj.empty();
        for (let i = 0; i < data.length; i++) {
            let str = `
               <option value="${data[i]['aname']}">${data[i]['aname']}</option>
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
            url:'/teadao/index.php/hthome/addshops',
            data:data,
            processData:false,
            contentType:false,
            method:'post',
            success:function (data) {
                if(data=='ok'){
                    location.href='/teadao/index.php/hthome/shop';
                }else if(data=='error'){
                    alert('添加失败');
                }
            }
        })
        return false;
    })

})