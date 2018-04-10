$(function () {
    let tbody=$('#tbody');
    $.ajax({
        url: '/teadao/index.php/hthome/queryopions',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            render(tbody,data);
        }
    });
    function render(obj, data) {
        obj.empty();
        for(let i=0;i<data.length;i++){
            let str=`
                <tr id="${data[i]['oid']}">
                    <td type="oid">
                        ${data[i]['oid']}
                    </td>
                    <td type="uname">
                        <input type="text" value="${data[i]['uname']}" style="width: 80px">
                    </td>
                    <td type="sid">
                        <input type="text" value="${data[i]['sid']}">
                    </td>
                    <td type="oname">
                        <input type="text" value="${data[i]['oname']}" style="width: 80px">
                    </td>
                    <td type="otime">
                        <input type="text" value="${data[i]['otime']}" style="width: 90px">
                    </td>
                    <td style="width: 150px">
                        <div class="button-group">
                            <a class="button border-red" href="javascript:void(0)" id="del"><span
                            class="icon-trash-o"></span> 删除</a>
                        </div>
                    </td>
                </tr>
            `;
            obj.html(function (i,value) {
                return value+str;
            })
        }
    }
    tbody.on('click','#del',function () {
        let tr=$(this).closest('tr');
        let ids=tr.attr('id');
        $.ajax({
            url:'/teadao/index.php/hthome/deleteopions',
            data:{id:ids},
            success:function (data) {
                if(data=='ok'){
                    tr.remove();
                }else if(data=='error'){
                    alert('fail');
                }
            }
        })
    })
    //////////////////////////修改///////////////////////////
    tbody.on('blur','input',function () {
        let value=$(this).val();
        let type=$(this).closest('td').attr('type');
        let ids=$(this).closest('tr').attr('id');
        $.ajax({
            url:'/teadao/index.php/hthome/updateopions',
            data:{id:ids,type:type,value:value},
            success:function (data) {
                if(data=='ok'){
                    alert('修改成功');
                }else if(data=='error'){
                    alert('修改失败');
                }
            }
        })
    })



})