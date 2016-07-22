window.onload = function () {

    BuscaPedido();
    getCliente();
    getProduto();
}
function getCliente() {
    ajaxx();
    ajax.open("GET", "./php/pedido.php?action=getCliente", false);
    ajax.onreadystatechange = function () {
        var retorn = JSON.parse(ajax.responseText);
        var conta = 0;
        var edit = 0;
        var excluir = 0;
        for (var i = 0; i < 10; i++) {
            document.getElementById("cadastronome").innerHTML += "<div><option id='escolhacliente' value=" + retorn[i].id + ">" + retorn[i].nome + " </option></div>";
        }
    }
    ajax.send(null);

}
function getProduto() {
    ajaxx();
    ajax.open("GET", "./php/pedido.php?action=getProduto", false);
    ajax.onreadystatechange = function () {
        var retorn = JSON.parse(ajax.responseText);
        for (var i = 0; i < 10; i++) {
            document.getElementById("cadastroproduto").innerHTML += "<option  id='escolhaProduto' value=" + retorn[i].id + ">" + retorn[i].nome + " </option>";
        }
    }
    ajax.send(null);
}
function getCliente2(cont) {
    ajaxx();
    ajax.open("GET", "./php/pedido.php?action=getCliente", false);
    ajax.onreadystatechange = function () {
        var retorn = JSON.parse(ajax.responseText);
        var conta = 0;
        var edit = 0;
        var excluir = 0;
        for (var i = 0; retorn.length; i++) {
            document.getElementById("cadastronome"+cont).innerHTML += "<div><option id='escolhacliente' value=" + retorn[i].id + ">" + retorn[i].nome + " </option></div>";
        }
    }
    ajax.send(null);

}
function getProduto2(cont) {
    ajaxx();
    ajax.open("GET", "./php/pedido.php?action=getProduto", false);
    ajax.onreadystatechange = function () {
        var retorn = JSON.parse(ajax.responseText);
        for (var i = 0; i < 10; i++) {
            document.getElementById("cadastroproduto"+cont).innerHTML += "<option  id='escolhaProduto' value=" + retorn[i].id + ">" + retorn[i].nome + " </option>";
        }
    }
    ajax.send(null);
}
function cadastro_pedidos() {
    window.location.href = "cadastrar-pedido.html"
}

function EnviarCadastroPedido() {
    ajaxx();
    var p = ' ';
    p += 'produto=' + document.getElementById('cadastroproduto').options[document.getElementById('cadastroproduto').selectedIndex].value;
    p += '&nome=' + document.getElementById('cadastronome').options[document.getElementById('cadastronome').selectedIndex].value;
    p += '&id=' + 0;
    ajax.open("GET", "./php/pedido.php?action=cadastrarPedido&" + p, false);
    ajax.onreadystatechange = function () {
        var retorn = JSON.parse(ajax.responseText);
        if (ajax.responseText === '1') {
            alert('Cadastro efetuado com sucesso');
            window.location.href = "pedidos.html";

        } else {
            alert('Erro');
        }
    }
    ajax.send(null);
}
function Editar(codigo) {
    ajaxx();
    // Limpando a grid para preencher com o editar 
    document.getElementById("id").innerHTML = '';
    document.getElementById("nome").innerHTML = '';
    document.getElementById("produtos").innerHTML = ''
    document.getElementById("editar").innerHTML = '';
    document.getElementById("img").innerHTML = '';
    ajax.open("GET", "./php/pedido.php?action=editarPedido", false);

    ajax.onreadystatechange = function () {
        var retorn = JSON.parse(ajax.responseText);
        var conta = 0;
        var salvar = 0;
        for (var i = 0; retorn.length; i++) {
            document.getElementById("id").innerHTML += "<div style='height:40px; width:70px;' id='ids" + 'id' + conta + "'  ><input type='text' id='ids' style='width:40px; ' disabled='disabled'value='" + retorn[i].idPedido + "'> </div>";
            document.getElementById("nome").innerHTML += "<div><select style='width:200px;' id='cadastronome"+i+"' ><option id='escolhacliente' value="+ retorn[i].idPedido + ">" + retorn[i].nome + " </option></select><br></div>";
            document.getElementById("produtos").innerHTML += "<select style='width:200px;' id='cadastroproduto"+i+"'  ><option  id='escolhaProduto' value=" + retorn[i].idProduto + ">" + retorn[i].produto + " </option></select>";
            document.getElementById("img").innerHTML += "<div style='height:40px;width:5px;' onclick=Salva(" + retorn[i].idPedido + ',' + i + ") id='salvar" + salvar + "' ><img  style='width:20px; align:left;' src='http://localhost/TrabalhoFinal/img/salvar.png'><tr  ></tr> </div>";
            
            getCliente2(conta);
            getProduto2(conta);
            conta++;
            salvar++;
        }
    }
    document.getElementById('tituloexcluir').innerHTML = 'Salvar';
    document.getElementById('tituloeditar').innerHTML = ' ';
    ajax.send(null);
}
function Excluir(codigo) {
    if (codigo != 'Não Cadastrado') {
        var resposta = confirm('Deseja realmente excluir este Pedido ?');
        if (resposta == true) {
            ajaxx();
            if (ajax) {
                var p = '';
                p += 'id=' + codigo;
                //AQUI O AJAX FAZ  O ENVIO PARA O PHP
                ajax.open("GET", "./php/pedido.php?action=excluir&" + p, false);
                ajax.onreadystatechange = function () {
                    if (ajax.responseText != '') {
                        alert('Pedido excluido com Sucesso');
                        window.location.href = "pedidos.html";
                    }
                }
                ajax.send(null);
            }

        } else {
            return;
        }

    }
}
function Salva(id, linha) {
    ajaxx();
    var p = ' ';
    p +='nome='+ document.getElementById('cadastronome'+linha).options[document.getElementById('cadastronome'+linha).selectedIndex].value;
    p +='&produto='+ document.getElementById('cadastroproduto'+linha).options[document.getElementById('cadastroproduto'+linha).selectedIndex].value;
    p += '&id=' + id;
    ajax.open("GET", "./php/pedido.php?action=cadastrarPedido&" + p, false);
    ajax.onreadystatechange = function () {
        var retorn = JSON.parse(ajax.responseText);
        if (ajax.responseText === '1') {
            alert('Cadastro efetuado com sucesso');
            window.location.href = "pedidos.html";
        } else {
            alert('Erro');
        }
    }
    ajax.send(null);
}
function ajaxx() {

    try {
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
        try {
            ajax = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (ex) {
            try {
                ajax = new XMLHttpRequest();
            } catch (exc) {
                alert("Esse browser não tem recursos para uso do Ajax");
                ajax = null;
            }
        }
    }
}
function BuscaPedido() {
    ajaxx();

    ajax.open("GET", "./php/pedido.php?action=BuscaPedido", false);
    ajax.onreadystatechange = function () {
        var retorn = JSON.parse(ajax.responseText);
        var conta = 0;
        var edit = 0;
        var excluir = 0;

        for (var i = 0; retorn.length; i++) {
            conta++;
            edit++;
            excluir++;

            document.getElementById("id").innerHTML += "<div style='height:40px;  width:20px;' id='" + conta + "'  ><tr  >" + retorn[i].id + "</tr> </div>";
            document.getElementById("nome").innerHTML += "<div style='height:40px;  width:120px;' id='" + conta + "'  ><tr  >" + retorn[i].nome + "</tr> </div>";
            document.getElementById("produtos").innerHTML += "<div style='height:40px; width:600px;' id='" + conta + "'  ><tr  >" + retorn[i].produto + "</tr> </div>";
            document.getElementById("editar").innerHTML += "<div style='height:40px;width:2%;' id=" + 'edit' + edit + " ><img  style='width:20px; align:left;' src='http://localhost/TrabalhoFinal/img/editar.png'><tr  ></tr> </div>";
            document.getElementById("img").innerHTML += "<div style='height:40px; width:2%;' id=" + 'excluir' + excluir + " ><img style='width:20px;' src='http://localhost/TrabalhoFinal/img/lixo.png.png'><tr  ></tr> </div>";
            document.getElementById('edit' + edit).setAttribute('onclick', 'Editar("' + retorn[i].id + '")');
            document.getElementById('excluir' + excluir).setAttribute('onclick', 'Excluir("' + retorn[i].id + '")');

        }
    }
    ajax.send(null);
}

function Voltar() {
    window.location.href = "menu.html";
}