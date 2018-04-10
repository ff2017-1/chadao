$(function () {
    let tbody=$('#tbody');
    $.ajax({
        url: '/teadao/index.php/hthome/querytype',
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
                <tr id="${data[i]['tid']}">
                    <td type="tid">
                        ${data[i]['tid']}
                    </td>
                    <td type="tname">
                        <input type="text" value="${data[i]['tname']}">
                    </td>
                    <td type="tenglish">
                        <input type="text" value="${data[i]['tenglish']}">
                    </td>
                    <td type="tdescription">
                        <input type="text" value="${data[i]['tdescription']}">
                    </td>
                    <td style="width: 150px">
                        <div class="button-group">
                            <a class="button border-red" href="javascript:void(0)" id="del"><span
                            class="icon-trash-o"></span>删除</a>
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
            url:'/teadao/index.php/hthome/deletetype',
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
            url:'/teadao/index.php/hthome/updatetype',
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