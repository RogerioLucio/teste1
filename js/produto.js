window.onload = function () {

    BuscaProdutos();


}
function cadastro_produto() {
    window.location.href = "cadastrar-produto.html"
}

function EnviarCadastroProduto() {
    ajaxx();
    var p = ' ';
    p += 'nome=' + document.getElementById('nome').value.trim();
    p += '&preco=' + document.getElementById('preco').value;
    p += '&descricao=' + document.getElementById('descricao').value;
    p += '&id=' + 0;
    ajax.open("GET", "./php/produto.php?action=cadastrarProduto&" + p, false);
    ajax.onreadystatechange = function () {
        var retorn = JSON.parse(ajax.responseText);
        if (ajax.responseText === '1') {
            alert('Cadastro efetuado com sucesso');
            window.location.href = "produtos.html";

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
    document.getElementById("descricao").innerHTML = '';
    document.getElementById("preco").innerHTML = '';
    document.getElementById("editar").innerHTML = '';
    document.getElementById("img").innerHTML = '';
    ajax.open("GET", "./php/produto.php?action=buscarProdutos", false);
    ajax.onreadystatechange = function () {
        var retorn = JSON.parse(ajax.responseText);
        var conta = 0;
        var salvar = 0;
        for (var i = 0; retorn.length; i++) {
            
            document.getElementById("id").innerHTML += "<div style='height:40px; width:70px;' id='ids" + 'id' + conta + "'  ><input type='text' id='ids' style='width:40px; ' disabled='disabled'value='" + retorn[i].id + "'> </div>";
            document.getElementById("nome").innerHTML += "<div style='height:40px; width:120px;' id='nomes'  ><input type='text' id='nomes" + conta + "' style='width:140px;'value='" + retorn[i].nome + "'> </div>";
            document.getElementById("descricao").innerHTML += "<div  style='height:40px; width:180px;' id='descricoes'  ><input type='text'style='width:600px;' id='descricoes" + conta + "' value='" + retorn[i].descricao + "'></div>";
            document.getElementById("preco").innerHTML += "<div  style='height:40px; width:120px;' id='precos'  ><input type='text' style='width:40px;' id='precos" + conta + "'value='" + retorn[i].preco + "'></div>";
            document.getElementById("img").innerHTML += "<div style='height:40px;width:5px;' onclick=Salva(" + retorn[i].id +',' + i +  ") id='salvar" + salvar + "' ><img  style='width:20px; align:left;' src='http://localhost/TrabalhoFinal/img/salvar.png'><tr  ></tr> </div>";
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
        var resposta = confirm('Deseja realmente excluir este Produto ?');
        if (resposta == true) {
            ajaxx();
            if (ajax) {
                var p = '';
                p += 'id=' + codigo;
                //AQUI O AJAX FAZ  O ENVIO PARA O PHP
                ajax.open("GET", "./php/produto.php?action=excluir&" + p, false);
                ajax.onreadystatechange = function () {
                    if (ajax.responseText != '') {
                        alert('Produto excluido com Sucesso');
                        window.location.href = "produtos.html";
                    }
                }
                ajax.send(null);
            }

        } else {
            return;
        }

    }
}
function Salva(id , linha) {
    ajaxx();
    var p = ' ';
    p += 'nome=' + document.getElementById('nomes'+linha).value.trim();
    p += '&preco=' + document.getElementById('precos'+linha).value;
    p += '&descricao=' + document.getElementById('descricoes'+linha).value;
    p += '&id=' + id;
    ajax.open("GET", "./php/produto.php?action=cadastrarProduto&" + p, false);
    ajax.onreadystatechange = function () {
        var retorn = JSON.parse(ajax.responseText);
        if (ajax.responseText === '1') {
            alert('Cadastro efetuado com sucesso');
            window.location.href = "produtos.html";
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


function BuscaProdutos() {
    ajaxx();

    ajax.open("GET", "./php/produto.php?action=buscarProdutos", false);
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
            document.getElementById("descricao").innerHTML += "<div style='height:40px; width:600px;' id='" + conta + "'  ><tr  >" + retorn[i].descricao + "</tr> </div>";
            document.getElementById("preco").innerHTML += "<div  style='height:40px; width:120px;' id='" + conta + "'  ><tr  >" + 'R$:' + retorn[i].preco + "</tr> </div>";
            document.getElementById("editar").innerHTML += "<div style='height:40px;width:2%;' id=" + 'edit' + edit + " ><img  style='width:20px; align:left;' src='http://localhost/TrabalhoFinal/img/editar.png'><tr  ></tr> </div>";
            document.getElementById("img").innerHTML += "<div style='height:40px; width:2%;' id=" + 'excluir' + excluir + " ><img style='width:20px;' src='http://localhost/TrabalhoFinal/img/lixo.png.png'><tr  ></tr> </div>";
            document.getElementById('edit' + edit).setAttribute('onclick', 'Editar("' + retorn[i].id + '")');
            document.getElementById('excluir' + excluir).setAttribute('onclick', 'Excluir("' + retorn[i].id + '")');

        }
    }
    ajax.send(null);
}

function Voltar (){
    window.location.href = "menu.html";
}