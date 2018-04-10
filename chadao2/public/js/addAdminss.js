'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

$(function () {
    ////////////////添加页面//////////////////////////
    var submit = $('#sub');
    submit.on('click', function () {
        var data = new FormData($('form')[0]);
        $.ajax({
            url: '/index.php/hthome/addAdmin',
            data: data,
            processData: false,
            contentType: false,
            method: 'post',
            success: function success(data) {
                if (data == 'ok') {
                    location.href = '/index.php/hthome/admins';
                } else if (data == 'error') {
                    alert('添加失败');
                }
            }
        });
        return false;
    });
    ///////////////////////上传图片//////////////////////////
    var upload = document.querySelector('#uimg');
    var image = document.querySelector('#uimage');
    var imgType = ['png', 'gif', 'jpeg', 'jpg'];
    var size = 5 * 1024 * 1024;
    upload.onchange = function () {
        [].concat(_toConsumableArray(this.files)).forEach(function (element, index) {
            var eType = element.type.split('/')[1];
            if (!(element.size <= size && imgType.includes(eType))) {
                alert('请检查图片类型和大小');
            }
            var reader = new FileReader();
            // //读取文件
            reader.readAsDataURL(element);
            reader.onload = function (e) {
                var imgs = new Image();
                imgs.width = 200;
                imgs.height = 200;
                imgs.src = e.target.result;
                var imgBox = document.querySelector('.imgBox');
                imgBox.appendChild(imgs);
            };
            var data = new FormData();
            data.append('file', element);
            var xml = new XMLHttpRequest();
            xml.open('post', '/index.php/hthome/upload', true);
            xml.send(data);
            xml.onload = function () {
                image.value += xml.response;
            };
        });
    };
});