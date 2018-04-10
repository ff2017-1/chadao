<?php
class home{
    function __construct()
    {
        $obj = new db();
        $this->mysql = $obj->mysql;
    }
    function index(){
        include 'App/views/homeheader.html';
        include 'App/views/home.html';
        include 'App/views/footer.html';
    }
    function check(){
        $user=$_REQUEST['user'];
        $upass=$_REQUEST['upass'];
        $yz=$_REQUEST['yz'];
        $sql = "select * from users";
        $data = $this->mysql->query($sql)->fetch_all(1);
        session_start();
        if($yz!=$_SESSION['code']){
            echo json_encode('验证码错误');
            exit;
        }
        for ($i = 0; $i < count($data); $i++) {
            if ($data[$i]['uname'] == $user) {
                if ($data[$i]['upass'] == $upass) {
                    $_SESSION['islogin']='yes';
                    $_SESSION['uname']=$data[$i]['uname'];
                    $_SESSION['uid']=$data[$i]['uid'];
                    echo json_encode($data[$i]);
                    exit;
                } else {
                    echo json_encode('密码错误');
                    exit;
                }
            }
        }
        echo json_encode('用户名不存在');
    }
    function adduser(){
        $uname=$_REQUEST['uname'];
        $upass=$_REQUEST['upass'];
        $data=$this->mysql->query("insert into users (uname,upass) values ('{$uname}','{$upass}')");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function addressztop(){
        $sql="update umessage set mtype='0'";
        $data=$this->mysql->query($sql);
        $ids=$_REQUEST['id'];
        $sql1="update umessage set mtype='1' where mid=$ids";
        $data1=$this->mysql->query($sql1);
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function session(){
        session_start();
        if(isset($_SESSION['islogin'])){
            $data=$_SESSION;
            echo json_encode($data);
        }else{
            echo "您未登录";
        }
    }
    function updatesession(){
        session_start();
        session_unset();
        echo json_encode('ok');
    }
    function shoplist(){
        include 'App/views/homeheader.html';
        include 'App/views/liebiao.html';
        include 'App/views/footer.html';
    }
    function xiangqing(){
        include 'App/views/homeheader.html';
        include 'App/views/xiangqing.html';
        include 'App/views/footer.html';
    }
    function gouwuche(){
        include 'App/views/homeheader.html';
        include 'App/views/gouwuche.html';
        include 'App/views/footer.html';
    }
    function gwctj(){
        include 'App/views/homeheader.html';
        include 'App/views/gwctj.html';
        include 'App/views/footer.html';
    }
    function fukuan(){
        include 'App/views/homeheader.html';
        include 'App/views/fukuan.html';
        include 'App/views/footer.html';
    }
    function carts(){
        include 'App/views/homeheader.html';
        include 'App/views/carts.html';
        include 'App/views/footer.html';
    }
    function personal(){
        include 'App/views/homeheader.html';
        include 'App/views/personal.html';
        include 'App/views/footer.html';
    }
    function myopions(){
        include 'App/views/homeheader.html';
        include 'App/views/myopions.html';
        include 'App/views/footer.html';
    }
    function querycars(){
        $uname=$_REQUEST['uname'];
        $sql="select shopping.*,shop.* from shopping,shop where shopping.uname='${uname}' and shop.sid=shopping.sid and shopping
.ptype='购物车'";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function queryopions(){
        $uname=$_REQUEST['uname'];
        $sql="select opions.*,shop.* from opions,shop where shop.sid=opions.sid and opions.uname='{$uname}'";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function queryfuwu(){
        $sql="select * from service";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function queryUmessage(){
        $uname=$_REQUEST['uname'];
        $sql="select * from umessage where uname='{$uname}' ORDER BY mtype DESC";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function ddsuccess(){
        include 'App/views/homeheader.html';
        include 'App/views/ddsuccess.html';
        include 'App/views/footer.html';
    }
    function queryshopping(){
        $arr=[];
        //须知$num（每页显示的个数）、$page（当前页码）、个数总数$pages=ceil($totle/$num);  php中的向上取整
        $uname=isset($_REQUEST['uname'])?$_REQUEST['uname']:'';
        $value=isset($_REQUEST['value'])?$_REQUEST['value']:'';
        $page=isset($_REQUEST['page'])?$_REQUEST['page']:1;
        $num=5;
        $offset=($page-1)*$num;
        if($value){
            $totle=$this->mysql->query("select count(*) as totle from shopping where uname='{$uname}' and ptype='{$value}'")->fetch_assoc()
            ['totle'];
            $sql="select shopping.*,shop.* from shopping,shop where shopping.uname='{$uname}' and  shopping.sid=shop.sid and shopping.ptype='{$value}' limit {$offset},{$num}";
        }else{
            $totle=$this->mysql->query("select count(*) as totle from shopping where uname='{$uname}' and ptype!='购物车'")
                ->fetch_assoc()['totle'];
            $sql="select shopping.*,shop.* from shopping,shop where shopping.uname='{$uname}' and shopping.ptype!='购物车' and shopping.sid=shop.sid limit 
{$offset},{$num}";
        }
        $data=$this->mysql->query($sql)->fetch_all(1);
        $pages=ceil($totle/$num);
        array_push($arr,$data,$pages,$page);
        echo json_encode($arr);
    }
    function updateshopping(){
        $pid=$_REQUEST['pid'];
        $sid=$_REQUEST['sid'];
        $ptype=$_REQUEST['ptype'];
        $pcount=$_REQUEST['pcount'];
        $data=$this->mysql->query("update shopping set sid='{$sid}',pcount='{$pcount}',ptype='{$ptype}' where pid=$pid ");
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function updateshoppings(){
        $sid=isset($_REQUEST['sid'])?$_REQUEST['sid']:'';
        $type=$_REQUEST['type'];
        $ptype=$_REQUEST['ptype'];
        $uname=$_REQUEST['uname'];
        if($sid){
            $data=$this->mysql->query("update shopping set ptype='{$ptype}' where sid=$sid and uname='{$uname}' and ptype='{$type}'");
        }else{
            $data=$this->mysql->query("update shopping set ptype='{$ptype}' where uname='{$uname}' and ptype='{$type}'");
        }
        if($this->mysql->affected_rows){
            echo 'ok';
            exit;
        }else{
            echo 'error';
        }
    }
    function listshop(){
        $arr=[];
        //须知$num（每页显示的个数）、$page（当前页码）、个数总数$pages=ceil($totle/$num);  php中的向上取整
        $type=isset($_REQUEST['type'])?$_REQUEST['type']:'';
        $value=isset($_REQUEST['value'])?$_REQUEST['value']:'';
        $page=isset($_REQUEST['page'])?$_REQUEST['page']:1;
        $num=12;
        $offset=($page-1)*$num;
        if($type){
            $totle=$this->mysql->query("select count(*) as totle from shop where $type='{$value}'")->fetch_assoc()['totle'];
            $sql="select * from shop where $type='{$value}' limit {$offset},{$num}";
        }else{
            $totle=$this->mysql->query("select count(*) as totle from shop")->fetch_assoc()['totle'];
            $sql="select * from shop limit {$offset},{$num}";
        }

        $data=$this->mysql->query($sql)->fetch_all(1);
        $pages=ceil($totle/$num);
        array_push($arr,$data,$pages,$page);
        echo json_encode($arr);
    }
    function queryshop(){
        $sid=$_REQUEST['sid'];
        $sql="select * from shop where sid='{$sid}'";
        $data=$this->mysql->query($sql)->fetch_assoc();
        echo json_encode($data);
    }
    function querynewshop(){
        $type=$_REQUEST['type'];
        $sql="select tj.*,shop.* from tj,shop where tname='{$type}' and shop.sid=tj.sname";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function querypingjia(){
        $sid=$_REQUEST['sid'];
        $sql="select opions.*,shop.*,users.* from opions,shop,users where opions.sid={$sid} and shop.sid=opions.sid and users
.uid=opions.uname";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function sea(){
        $arr=[];
        $input=$_REQUEST['value'];
        $sql="select * from shop where 
              sname like '%{$input}%' 
              OR senglish like '%{$input}%'
             ";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
}