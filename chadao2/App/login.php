<?php
class login{
    function __construct()
    {
        $obj=new db();
        $this->mysql=$obj->mysql;
    }
    function index(){
        include 'App/views/login.html';
    }
    function check(){
        $user=$_REQUEST['user'];
        $upass=$_REQUEST['upass'];
        $yz=$_REQUEST['yz'];
        $data=$this->mysql->query("select * from admin")->fetch_all(1);
        session_start();
        if($yz!=$_SESSION['code']){
            echo '验证码错误';
            exit;
        }
        for ($i = 0; $i < count($data); $i++) {
            if ($data[$i]['aname'] == $user) {
                if($data[$i]['apass']==$upass){
                    $_SESSION['htlogin']='yes';
                    echo 'ok';
                    exit;
                }else {
                    echo 'error';
                    exit;
                }
            }
        }
        echo '用户名不存在';
    }
    function session(){
        session_start();
        if(isset($_SESSION['htlogin'])){
            echo "您已登录";
        }else{
            echo "您未登录";
        }
    }
    function updatesession(){
        session_start();
        session_unset();
        echo json_encode('ok');
    }
}
