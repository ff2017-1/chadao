<?php
class db{
    public $mysql;
    function __construct()
    {
        $this->config();
    }
    function config(){
        $this->mysql = new mysqli('sqld.duapp.com','fe16405c83b0460ab3701f89bda71a21','4f0c3eb521bc4b0e80ecca790b6eae14','DFdvjfZBdPBgmVAExdAG',
            4050);
        $this->mysql->query('set names utf8');
    }
}