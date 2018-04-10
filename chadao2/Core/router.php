<?php
class router{
    static function run(){
        //$_SERVER['PATH_INFO']---路径----'/shopmanage/add';
//        var_dump($_SERVER['PATH_INFO']);
//        exit;
        if(!isset($_SERVER['PATH_INFO']) || $_SERVER['PATH_INFO']=='/'){
            $model='login';
            $fn='index';
        }else{
            //把字符串（路径）转化为数组，分割点为‘/'
            $pathinfo=explode('/',substr($_SERVER['PATH_INFO'],1));
            $model=$pathinfo[0];
            $fn=isset($pathinfo[1])?$pathinfo[1]:'index';
        }
//        $model-----文件名（不含后缀）、类名也为$model;
//        $fn-------文件内类的方法;
        //判断文件是否存在
        if(file_exists("App/{$model}.php")){
            include 'App/'.$model.'.php';
            //判断该文件内的类是否存在
            if(class_exists($model)){
                $page=new $model();
                //判断该类的方法是否存在
                if(method_exists($page,$fn)){
                    $page->$fn();
                }else{
                    include 'App/views/4041.html';
                }
            }else{
                include 'App/views/4042.html';
            }
        }else{
            include 'App/views/4043.html';
        }

    }
}