<?php

if ($_GET['action'] == 'getCliente') {

    include('../conexao.php');
    $sql = "SELECT * FROM cliente WHERE del=0";
    $result = mysqli_query($con, $sql);
    while ($res = mysqli_fetch_assoc($result)) {
        $vetor[] = array_map('utf8_encode', $res);
        $vetor2[] = array(
            'id' => $res['id'],
            'nome' => $res['nome']
        );
    }
    echo (json_encode($vetor2));
}

if ($_GET['action'] == 'getProduto') {

    include('../conexao.php');
    $sql = "SELECT * FROM produto WHERE del=0";
    $result = mysqli_query($con, $sql);


    while ($res = mysqli_fetch_assoc($result)) {
        $vetor[] = array_map('utf8_encode', $res);
        $vetor2[] = array(
            'id' => $res['id'],
            'nome' => $res['nome']
        );
    }
    echo (json_encode($vetor2));
}

if ($_GET['action'] == 'cadastrarPedido') {
    include('../conexao.php');
    $sqll = "pedido SET id_cliente='" . $_GET['nome'] . "', id_produto='" . $_GET['produto'] . "'";
    if ($_GET['id'] <= 0) {
        $sql = "INSERT INTO " . $sqll . "";
    } else {
        $sql = "UPDATE  " . $sqll . " WHERE id_pedido='" . $_GET['id'] . "'";
    }
    $result = mysqli_query($con, $sql);
    if ($result > 0) {
        echo 1;
    } else {
        echo 0;
    }
}

if ($_GET['action'] == 'BuscaPedido') {
    include('../conexao.php');
    $sql = "SELECT p.id_produto, pro.nome AS produto, p.id_cliente,p.id_pedido, cl.nome FROM pedido AS p 
        INNER JOIN produto AS pro ON p.id_produto  = pro.id
        INNER JOIN cliente AS cl ON cl.id  = p.id_cliente WHERE p.del=0 ORDER BY p.id_pedido ";
    $result = mysqli_query($con, $sql);

    if (mysqli_num_rows($result) > 0) {

        while ($res = mysqli_fetch_assoc($result)) {
            $vetor[] = array_map('utf8_encode', $res);

            $vetor2[] = array(
                'id' => $res['id_pedido'],
                'nome' => $res['nome'],
                'produto' => $res['produto'],
            );
        }
        echo (json_encode($vetor2));
    } else {
        echo 0;
    }
}
if ($_GET['action'] == 'editarPedido') {
    include('../conexao.php');
    $sql = "SELECT p.id_produto, pro.nome AS produto, p.id_cliente,p.id_pedido, cl.nome FROM pedido AS p 
        INNER JOIN produto AS pro ON p.id_produto  = pro.id
        INNER JOIN cliente AS cl ON cl.id  = p.id_cliente WHERE p.del=0 ORDER BY p.id_pedido ";
    $result = mysqli_query($con, $sql);

    if (mysqli_num_rows($result) > 0) {

        while ($res = mysqli_fetch_assoc($result)) {
            $vetor[] = array_map('utf8_encode', $res);

            $vetor2[] = array(
                'idPedido' => $res['id_pedido'],
                'idProduto' => $res['id_produto'],
                'id_cliente' => $res['id_cliente'],
                'nome' => $res['nome'],
                'produto' => $res['produto'],
            );
        }
        echo (json_encode($vetor2));
    } else {
        echo 0;
    }
}
if ($_GET['action'] == 'excluir') {
    include('../conexao.php');
    $sqll = " UPDATE pedido SET del=1 WHERE id_pedido='" . $_GET['id'] . "'";
    $result = mysqli_query($con, $sqll);

    if ($result > 0) {
        echo 1;
    } else {
        echo 0;
    }
}
