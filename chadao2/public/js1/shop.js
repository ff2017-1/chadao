$(function () {
    let tbody=$('#tbody');
    $.ajax({
        url: '/teadao/index.php/hthome/queryshop',
        method: 'post',
        dataType: 'json',
        success: function success(data) {
            console.log(data)
            render(tbody,data);
        }
    });
    function render(obj, data) {
        obj.empty();
        for(let i=0;i<data.length;i++){
            let str=`
                <tr id="${data[i]['sid']}">
                    <td type="sid">
                        ${data[i]['sid']}
                    <td type="sname">
                        <input type="text" value="${data[i]['sname']}"></td>
                    </td>
                    <td type="senglish">
                        <input type="text" value="${data[i]['senglish']}">
                    </td>
                    <td type="stu"><img src="${data[i]['stu']}" alt="" width="70" height="50" /></td>
                    <td type="sprice">
                        <input type="text" value="${data[i]['sprice']}" style="width: 55px">
                    </td>
                    <td type="snewprice">
                        <input type="text" value="${data[i]['snewprice']}" style="width: 55px">
                    </td>
                     <td type="scolor">
                        <input type="text" value="${data[i]['scolor']}">
                    </td>
                    <td type="stype">
                        <input type="text" value="${data[i]['stype']}">
                    </td>
                    <td type="saddress">
                        <input type="text" value="${data[i]['saddress']}">
                    </td>
                    <td type="sdescription">
                        <input type="text" value="${data[i]['sdescription']}">
                    </td>
                    <td type="scontent">
                        <input type="text" value="${data[i]['scontent']}">
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
            url:'/teadao/index.php/hthome/deleteshop',
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
            url:'/teadao/index.php/hthome/updateshop',
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