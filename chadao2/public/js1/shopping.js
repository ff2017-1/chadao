$(function () {
    let tbody=$('#tbody');
    $.ajax({
        url: '/teadao/index.php/hthome/queryshopping',
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
                <tr id="${data[i]['pid']}">
                    <td type="pid">
                        ${data[i]['pid']}
                    </td>
                    <td type="uname">
                        <input type="text" value="${data[i]['uname']}" style="width: 60px">
                    </td>
                    <td type="sid">
                        <input type="text" value="${data[i]['sid']}" style="width: 100px">
                    </td>
                    <td type="pcount">
                        <input type="text" value="${data[i]['pcount']}" style="width: 60px">
                    </td>
                    <td type="ptype">
                        <input type="text" value="${data[i]['ptype']}" style="width: 60px">
                    </td>
                    <td type="ptotal">
                        <input type="text" value="${data[i]['ptotal']}" style="width: 60px">
                    </td>
                    <td>
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
            url:'/teadao/index.php/hthome/deleteshopping',
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
            url:'/teadao/index.php/hthome/updateshopping',
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