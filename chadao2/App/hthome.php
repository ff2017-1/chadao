<?php
class hthome{
    function __construct()
    {
        $obj = new db();
        $this->mysql = $obj->mysql;
    }
    function index(){
        include 'App/views/hthome.html';
    }
    function upload(){
        if(is_uploaded_file($_FILES['file']['tmp_name'])){
            if(!file_exists('public/upload')){
                mkdir('public/upload');
            }
            $data=date('y-m-d');
            if(!file_exists('public/upload/'.$data)){
                mkdir('public/upload/'.$data);
            }
            $path='public/upload/'.$data.'/'.$_FILES['file']['name'];
            if(move_uploaded_file($_FILES['file']['tmp_name'],$path)){
                echo '/'.$path;
            }
        }
    }
    // banner
    function banner(){
        include 'App/views/banner.html';
    }
    function querybanner(){
        $sql="select * from banner";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function deletebanner(){
        $ids=$_GET['id'];
        $data=$this->mysql->query("delete from banner where bid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function addbanner(){
        include 'App/views/addbanner.html';
    }
    function addbanners(){
        $data=$_POST;
        $keys=array_keys($data);
        $str='(';
        for($i=0;$i<count($keys);$i++){
            $str.=$keys[$i].',';
        }
        $str=substr($str,0,-1);
        $str.=') values (';
        foreach($data as $v){
            $str.="'{$v}',";
        }
        $str=substr($str,0,-1);
        $str.=')';
        $data=$this->mysql->query("insert into banner $str");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function updatebanner(){
        $ids=$_GET['id'];
        $type=$_GET['type'];
        $value=$_GET['value'];
        $data=$this->mysql->query("update banner set $type='{$value}' where bid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    //贴心服务
    function service(){
        include 'App/views/service.html';
    }
    function queryservice(){
        $sql="select * from service";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function deleteservice(){
        $ids=$_GET['id'];
        $data=$this->mysql->query("delete from service where vid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function addservice(){
        include 'App/views/addservice.html';
    }
    function addservices(){
        $data=$_POST;
        $keys=array_keys($data);
        $str='(';
        for($i=0;$i<count($keys);$i++){
            $str.=$keys[$i].',';
        }
        $str=substr($str,0,-1);
        $str.=') values (';
        foreach($data as $v){
            $str.="'{$v}',";
        }
        $str=substr($str,0,-1);
        $str.=')';
        $data=$this->mysql->query("insert into service $str");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function updateservice(){
        $ids=$_GET['id'];
        $type=$_GET['type'];
        $value=$_GET['value'];
        $data=$this->mysql->query("update service set $type='{$value}' where vid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    //    用户
    function users(){
        include 'App/views/users.html';
    }
    function queryUsers(){
        $sql="select * from users";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function deleteUsers(){
        $ids=$_GET['id'];
        $data=$this->mysql->query("delete from users where uid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function addusers(){
        include 'App/views/addusers.html';
    }
    function adduser(){
        $data=$_POST;
        $keys=array_keys($data);
        $str='(';
        for($i=0;$i<count($keys);$i++){
            $str.=$keys[$i].',';
        }
        $str=substr($str,0,-1);
        $str.=') values (';
        foreach($data as $v){
            $str.="'{$v}',";
        }
        $str=substr($str,0,-1);
        $str.=')';
        $data=$this->mysql->query("insert into users $str");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function updateUsers(){
        $ids=$_GET['id'];
        $type=$_GET['type'];
        $value=$_GET['value'];
        $data=$this->mysql->query("update users set $type='{$value}' where uid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    //    管理员
    function admins(){
        include 'App/views/admins.html';
    }
    function queryadmins(){
        $sql="select * from admin";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function deleteadmins(){
        $ids=$_GET['id'];
        $data=$this->mysql->query("delete from admin where aid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function addAdmins(){
        include 'App/views/addAdmins.html';
    }
    function addAdmin(){
            $data=$_POST;
            $keys=array_keys($data);
            $str='(';
            for($i=0;$i<count($keys);$i++){
                $str.=$keys[$i].',';
            }
            $str=substr($str,0,-1);
            $str.=') values (';
            foreach($data as $v){
                $str.="'{$v}',";
            }
            $str=substr($str,0,-1);
            $str.=')';
            $data=$this->mysql->query("insert into admin $str");
            if($this->mysql->affected_rows){
                echo 'ok';
                exit;
            }else{
                echo 'error';
            }
    }
    function updateadmins(){
        $ids=$_GET['id'];
        $type=$_GET['type'];
        $value=$_GET['value'];
        $data=$this->mysql->query("update admin set $type='{$value}' where aid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    //    收件信息
    function umessage(){
        include 'App/views/umessage.html';
    }
    function queryUmessage(){
        $sql="select * from umessage ORDER BY mtype DESC";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function deleteUmessage(){
        $ids=$_GET['id'];
        $data=$this->mysql->query("delete from umessage where mid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function addumessage(){
        include 'App/views/addumessage.html';
    }
    function addumessages(){
        $data=$_POST;
        $keys=array_keys($data);
        $str='(';
        for($i=0;$i<count($keys);$i++){
            $str.=$keys[$i].',';
        }
        $str=substr($str,0,-1);
        $str.=') values (';
        foreach($data as $v){
            $str.="'{$v}',";
        }
        $str=substr($str,0,-1);
        $str.=')';
        $data=$this->mysql->query("insert into umessage $str");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function updateUmessage(){
        $ids=$_GET['id'];
        $type=$_GET['type'];
        $value=$_GET['value'];
        $data=$this->mysql->query("update umessage set $type='{$value}' where mid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    //    商品管理
    function shop(){
        include 'App/views/shop.html';
    }
    function queryshop(){
        $sql="select * from shop";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function deleteshop(){
        $ids=$_GET['id'];
        $data=$this->mysql->query("delete from shop where sid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function updateshop(){
        $ids=$_GET['id'];
        $type=$_GET['type'];
        $value=$_GET['value'];
        $data=$this->mysql->query("update shop set $type='{$value}' where sid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function addshop(){
        include 'App/views/addshop.html';
    }
    function addshops(){
        $data=$_POST;
        $keys=array_keys($data);
        $str='(';
        for($i=0;$i<count($keys);$i++){
            $str.=$keys[$i].',';
        }
        $str=substr($str,0,-1);
        $str.=') values (';
        foreach($data as $v){
            $str.="'{$v}',";
        }
        $str=substr($str,0,-1);
        $str.=')';
        $data=$this->mysql->query("insert into shop $str");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    //    推荐管理
    function tj(){
        include 'App/views/tj.html';
    }
    function querytj(){
        $sql="select * from tj";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function deletetj(){
        $ids=$_GET['id'];
        $data=$this->mysql->query("delete from tj where tid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function updatetj(){
        $ids=$_GET['id'];
        $type=$_GET['type'];
        $value=$_GET['value'];
        $data=$this->mysql->query("update tj set $type='{$value}' where tid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function addtj(){
        include 'App/views/addtj.html';
    }
    function addtjs(){
        $data=$_POST;
        $keys=array_keys($data);
        $str='(';
        for($i=0;$i<count($keys);$i++){
            $str.=$keys[$i].',';
        }
        $str=substr($str,0,-1);
        $str.=') values (';
        foreach($data as $v){
            $str.="'{$v}',";
        }
        $str=substr($str,0,-1);
        $str.=')';
        $data=$this->mysql->query("insert into tj $str");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    //   购物车shopping
    function shopping(){
        include 'App/views/shopping.html';
    }
    function queryshopping(){
        $sql="select * from shopping";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function deleteshopping(){
        $ids=$_GET['id'];
        $data=$this->mysql->query("delete from shopping where pid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function updateshopping(){
        $ids=$_GET['id'];
        $type=$_GET['type'];
        $value=$_GET['value'];
        $data=$this->mysql->query("update shopping set $type='{$value}' where pid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function addshopping(){
        include 'App/views/addshopping.html';
    }
    function addshoppings(){
        $data=$_POST;
        $keys=array_keys($data);
        $str='(';
        for($i=0;$i<count($keys);$i++){
            $str.=$keys[$i].',';
        }
        $str=substr($str,0,-1);
        $str.=') values (';
        foreach($data as $v){
            $str.="'{$v}',";
        }
        $str=substr($str,0,-1);
        $str.=')';
        if ($_REQUEST['pcount']==0){
            echo 'error';
            exit;
        }
        $data=$this->mysql->query("insert into shopping $str");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    //   评价opions
    function opions(){
        include 'App/views/opions.html';
    }
    function queryopions(){
        $sql="select * from opions";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function deleteopions(){
        $ids=$_GET['id'];
        $data=$this->mysql->query("delete from opions where oid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function updateopions(){
        $ids=$_GET['id'];
        $type=$_GET['type'];
        $value=$_GET['value'];
        $data=$this->mysql->query("update opions set $type='{$value}' where oid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function addopions(){
        include 'App/views/addopions.html';
    }
    function addopion(){
        $data=$_POST;
        $keys=array_keys($data);
        $str='(';
        for($i=0;$i<count($keys);$i++){
            $str.=$keys[$i].',';
        }
        $str=substr($str,0,-1);
        $str.=') values (';
        foreach($data as $v){
            $str.="'{$v}',";
        }
        $str=substr($str,0,-1);
        $str.=')';
        $data=$this->mysql->query("insert into opions $str");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    //茶色分类color
    function color(){
        include 'App/views/color.html';
    }
    function querycolor(){
        $sql="select * from color";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function deletecolor(){
        $ids=$_GET['id'];
        $data=$this->mysql->query("delete from color where cid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function updatecolor(){
        $ids=$_GET['id'];
        $type=$_GET['type'];
        $value=$_GET['value'];
        $data=$this->mysql->query("update color set $type='{$value}' where cid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function addcolor(){
        include 'App/views/addcolor.html';
    }
    function addcolors(){
        $data=$_POST;
        $keys=array_keys($data);
        $str='(';
        for($i=0;$i<count($keys);$i++){
            $str.=$keys[$i].',';
        }
        $str=substr($str,0,-1);
        $str.=') values (';
        foreach($data as $v){
            $str.="'{$v}',";
        }
        $str=substr($str,0,-1);
        $str.=')';
        $data=$this->mysql->query("insert into color $str");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    //茶品分类type
    function type(){
        include 'App/views/type.html';
    }
    function querytype(){
        $sql="select * from type";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function deletetype(){
        $ids=$_GET['id'];
        $data=$this->mysql->query("delete from type where tid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function updatetype(){
        $ids=$_GET['id'];
        $type=$_GET['type'];
        $value=$_GET['value'];
        $data=$this->mysql->query("update type set $type='{$value}' where tid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function addtype(){
        include 'App/views/addtype.html';
    }
    function addtypes(){
        $data=$_POST;
        $keys=array_keys($data);
        $str='(';
        for($i=0;$i<count($keys);$i++){
            $str.=$keys[$i].',';
        }
        $str=substr($str,0,-1);
        $str.=') values (';
        foreach($data as $v){
            $str.="'{$v}',";
        }
        $str=substr($str,0,-1);
        $str.=')';
        $data=$this->mysql->query("insert into type $str");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    //茶产地分类address
    function adress(){
        include 'App/views/adress.html';
    }
    function queryadress(){
        $sql="select * from address";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function deleteadress(){
        $ids=$_GET['id'];
        $data=$this->mysql->query("delete from address where aid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function updateadress(){
        $ids=$_GET['id'];
        $type=$_GET['type'];
        $value=$_GET['value'];
        $data=$this->mysql->query("update address set $type='{$value}' where aid=$ids");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function addAdress(){
        include 'App/views/addAdress.html';
    }
    function addAdresss(){
        $data=$_POST;
        $keys=array_keys($data);
        $str='(';
        for($i=0;$i<count($keys);$i++){
            $str.=$keys[$i].',';
        }
        $str=substr($str,0,-1);
        $str.=') values (';
        foreach($data as $v){
            $str.="'{$v}',";
        }
        $str=substr($str,0,-1);
        $str.=')';
        $data=$this->mysql->query("insert into address $str");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
}