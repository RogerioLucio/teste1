<?php
   $banco = 'teste1';
   $con = mysqli_connect('localhost','root','') or die ('Erro ao se conectar com o banco de dados');
   mysqli_select_db($con,$banco); 
   

?>
