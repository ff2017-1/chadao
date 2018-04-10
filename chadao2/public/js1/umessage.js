$(function () {
    let tbody=$('#tbody');
    $.ajax({
        url: '/teadao/index.php/hthome/queryUmessage',
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
                <tr id="${data[i]['mid']}">
                    <td type="mid">
                        ${data[i]['mid']}
                    </td>
                    <td type="uname">
                        <input type="text" value="${data[i]['uname']}" style="width: 80px">
                    </td>
                    <td type="maddress">
                        <input type="text" value="${data[i]['maddress']}">
                    </td>
                    <td type="myb">
                        <input type="text" value="${data[i]['myb']}" style="width: 50px">
                    </td>
                    <td type="mname">
                        <input type="text" value="${data[i]['mname']}" style="width: 80px">
                    </td>
                    <td type="mphone">
                        <input type="text" value="${data[i]['mphone']}" style="width: 90px">
                    </td>
                    <td type="mdh">
                        <input type="text" value="${data[i]['mdh']}" style="width: 90px">
                    </td>
                    <td type="mtype">
                        <input type="text" value="${data[i]['mtype']}" style="width: 55px">
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
            url:'/teadao/index.php/hthome/deleteUmessage',
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
            url:'/teadao/index.php/hthome/updateUmessage',
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