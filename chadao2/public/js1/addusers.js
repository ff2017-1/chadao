$(function () {
    ////////////////添加页面//////////////////////////
    let submit=$('#sub');
    submit.on('click',function (){
        let data=new FormData($('form')[0]);
        $.ajax({
            url:'/teadao/index.php/hthome/adduser',
            data:data,
            processData:false,
            contentType:false,
            method:'post',
            success:function (data) {
                if(data=='ok'){
                    location.href='/teadao/index.php/hthome/users';
                }else if(data=='error'){
                    alert('添加失败');
                }
            }
        })
        return false;
    })
    ///////////////////////上传图片//////////////////////////
    let upload=document.querySelector('#uimg');
    let image=document.querySelector('#uimage');
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
})