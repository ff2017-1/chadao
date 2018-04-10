<?php
class code{
    //定义验证框的大小
    public $width=100;
    public $height=30;
    //验证码的内容
    public $lette='3456789zxcvbnmkjhgfdasqwertyup';
    //储存筛选出的字符
    public $result='';
    //干扰线数量
    public $lineNum=4;
    //干扰点数量
    public $pxNum=60;
    //字体文件
    public $fontFile='MSYH.TTF';
    public $img;
    //1.创建图片 2.画干扰线 3.画点 4.产生验证码 5.画文字 6.输出
    function create(){
        //创建图片画布
       $this->img=imagecreatetruecolor($this->width,$this->height);
        //给图片画布填充颜色
       $arr=$this->bgcolor();
       $color=imagecolorallocate($this->img,$arr[0],$arr[1],$arr[2]);
       imagefill($this->img,0,0,$color);
    }
    function drawLine(){
        //干扰线
        for($i=0;$i<$this->lineNum;$i++){
            $arr=$this->bgcolor();
            $color=imagecolorallocate($this->img,$arr[0],$arr[1],$arr[2]);
            $x1=mt_rand(0,$this->width/2);
            $y1=mt_rand(0,$this->height/2);
            $x2=mt_rand($this->width/2,$this->width);
            $y2=mt_rand($this->height/2,$this->height);
            if($i>=$this->lineNum/2){
                imageline($this->img,$x2,$y1,$x1,$y2,$color);
            }else{
                imageline($this->img,$x1,$y1,$x2,$y2,$color);
            }
        }
        //干扰点
        for($i=0;$i<$this->pxNum;$i++){
            $arr=$this->bgcolor();
            $color=imagecolorallocate($this->img,$arr[0],$arr[1],$arr[2]);
            $x=mt_rand(0,$this->width);
            $y=mt_rand(0,$this->height);
            imagesetpixel($this->img,$x,$y,$color);
        }
    }
    function drawTest(){
        $x = $this->width/4;
        $y = $this->height/2;
        $result = $this->getchars();
        for($i=0;$i<4;$i++){
            $arr = $this->textColor();
            $color = imagecolorallocate($this->img,$arr[0],$arr[1],$arr[2]);
            imagettftext($this->img,mt_rand(12,18),mt_rand(-15,20),$x*$i+5,$y+8,$color,$this->fontFile,substr
            ($result,$i,1));
        }
    }
    function getchars(){
        //lette 字符串长度 减一
        $len=strlen($this->lette)-1;
        $str='';
        for($i=0;$i<4;$i++){
            //截出位置随机的四个字符
            $str.= substr($this->lette,mt_rand(0,$len),1);
        }
        //把截出的四个字符  不分大小写的存起来
        $this->result=strtolower($str);
        return $str;
    }

    function bgcolor(){
        $arr=[];
        $arr[0]=mt_rand(0,107);
        $arr[1]=mt_rand(0,107);
        $arr[2]=mt_rand(0,107);
        return $arr;
    }
    function textcolor(){
        $arr=[];
        $arr[0]=mt_rand(108,255);
        $arr[1]=mt_rand(108,255);
        $arr[2]=mt_rand(108,255);
        return $arr;
    }
    function output(){
        header('Content-type:image/png');
        $this->create();
        $this->drawLine();
        $this->drawTest();
        imagepng($this->img);
        imagedestroy($this->img);
    }
}
$code=new code();
$code->output();
session_start();
$_SESSION['code']=$code->result;