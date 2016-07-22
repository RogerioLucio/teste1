<?php

 if($_GET['action']== 'cadastrarProduto'){
   include('../conexao.php');
    $sqll="produto SET nome='".$_GET['nome']."', descricao='".$_GET['descricao']."', preco='".$_GET['preco']."'";
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
 
 if($_GET['action']== 'buscarProdutos'){
   include('../conexao.php');
    $sql="SELECT * FROM produto WHERE del=0";
     $result= mysqli_query($con, $sql);
        
   if(mysqli_num_rows($result) > 0 ){
            
            while($res = mysqli_fetch_assoc($result)){
            $vetor[] = array_map('utf8_encode', $res); 
        
            $vetor2[] =  array(
            'id'=> $res['id'],
            'nome'=> $res['nome'],
            'descricao'=> $res['descricao'],
            'preco'=> $res['preco']
            );
            
        }
        echo (json_encode($vetor2));
      }else{
          echo 0;
      }
  
 }
 
 if($_GET['action']== 'excluir'){
  include('../conexao.php');
    $sqll=" UPDATE produto SET del=1 WHERE id='".$_GET['id']."'";
        $result = mysqli_query($con, $sqll); 
       
        if($result > 0){
            echo 1;
        }else{
            echo 0;
        }
 }

