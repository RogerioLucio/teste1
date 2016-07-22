<?php

 if($_GET['action']== 'cadastrarCliente'){
   include('../conexao.php');
    $sqll="cliente SET nome='".$_GET['nome']."', email='".$_GET['email']."', telefone='".$_GET['telefone']."'";
   if($_GET['id']  <= 0 ){
       $sql="INSERT INTO ". $sqll . ""; 
   }else{
       $sql="UPDATE  ". $sqll . " WHERE id='".$_GET['id']."'"; 
   }
        $result = mysqli_query($con, $sql); 
       
        if($result > 0){
            echo 1;
        }else{
            echo 0;
        }
 }
 
 if($_GET['action']== 'BuscaCliente'){
   include('../conexao.php');
    $sql="SELECT * FROM cliente WHERE del=0";
     $result= mysqli_query($con, $sql);
        
   if(mysqli_num_rows($result) > 0 ){
            
            while($res = mysqli_fetch_assoc($result)){
            $vetor[] = array_map('utf8_encode', $res); 
        
            $vetor2[] =  array(
            'id'=> $res['id'],
            'nome'=> $res['nome'],
            'email'=> $res['email'],
            'telefone'=> $res['telefone']
            );
            
        }
        echo (json_encode($vetor2));
      }else{
          echo 0;
      }
  
 }
 
 if($_GET['action']== 'excluir'){
  include('../conexao.php');
    $sqll=" UPDATE cliente SET del=1 WHERE id='".$_GET['id']."'";
        $result = mysqli_query($con, $sqll); 
       
        if($result > 0){
            echo 1;
        }else{
            echo 0;
        }
 }

