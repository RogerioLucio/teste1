window.onload = function () {

    BuscaCliente();


}
function cadastro_de_cliente() {
    window.location.href = "cadastrar-cliente.html";
}

function EnviarCadastroCliente() {
    ajaxx();
    var p = ' ';
    p += 'nome=' + document.getElementById('nome').value.trim();
    p += '&telefone=' + document.getElementById('telefone').value;
    p += '&email=' + document.getElementById('email').value;
    p += '&id=' + 0;
    ajax.open("GET", "./php/cliente.php?action=cadastrarCliente&" + p, false);
    ajax.onreadystatechange = function () {
        var retorn = JSON.parse(ajax.responseText);
        if (ajax.responseText === '1') {
            alert('Cadastro efetuado com sucesso');
            window.location.href = "clientes.html";

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
    document.getElementById("email").innerHTML = '';
    document.getElementById("telefone").innerHTML = '';
    document.getElementById("editar").innerHTML = '';
    document.getElementById("img").innerHTML = '';
    ajax.open("GET", "./php/cliente.php?action=BuscaCliente", false);
    ajax.onreadystatechange = function () {
        var retorn = JSON.parse(ajax.responseText);
        var conta = 0;
        var salvar = 0;
        for (var i = 0; retorn.length; i++) {
            
            document.getElementById("id").innerHTML += "<div style='height:40px; width:70px;' id='ids" + 'id' + conta + "'  ><input type='text' id='ids' style='width:40px; ' disabled='disabled'value='" + retorn[i].id + "'> </div>";
            document.getElementById("nome").innerHTML += "<div style='height:40px; width:120px;' id='nomes'  ><input type='text' id='nomes" + conta + "' style='width:240px;'value='" + retorn[i].nome + "'> </div>";
            document.getElementById("email").innerHTML += "<div  style='height:40px; width:180px;' id='emails'  ><input type='text'style='width:280px;' id='emails" + conta + "' value='" + retorn[i].email + "'></div>";
            document.getElementById("telefone").innerHTML += "<div  style='height:40px; width:120px;' id='telefones'  ><input type='text' style='width:180px;' id='telefones" + conta + "'value='" + retorn[i].telefone + "'></div>";
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
        var resposta = confirm('Deseja realmente excluir este Cliente ?');
        if (resposta == true) {
            ajaxx();
            if (ajax) {
                var p = '';
                p += 'id=' + codigo;
                //AQUI O AJAX FAZ  O ENVIO PARA O PHP
                ajax.open("GET", "./php/cliente.php?action=excluir&" + p, false);
                ajax.onreadystatechange = function () {
                    if (ajax.responseText != '') {
                        alert('Cliente excluido com Sucesso');
                        window.location.href = "clientes.html";
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
    p += '&email=' + document.getElementById('emails'+linha).value;
    p += '&telefone=' + document.getElementById('telefones'+linha).value;
    p += '&id=' + id;
    ajax.open("GET", "./php/cliente.php?action=cadastrarCliente&" + p, false);
    ajax.onreadystatechange = function () {
        var retorn = JSON.parse(ajax.responseText);
        if (ajax.responseText === '1') {
            alert('Cadastro efetuado com sucesso');
            window.location.href = "clientes.html";
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


function BuscaCliente() {
    ajaxx();

    ajax.open("GET", "./php/cliente.php?action=BuscaCliente", false);
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
            document.getElementById("nome").innerHTML += "<div style='height:40px;  width:220px;' id='" + conta + "'  ><tr  >" + retorn[i].nome + "</tr> </div>";
            document.getElementById("email").innerHTML += "<div style='height:40px; width:400px;' id='" + conta + "'  ><tr  >" + retorn[i].email + "</tr> </div>";
            document.getElementById("telefone").innerHTML += "<div  style='height:40px; width:220px;' id='" + conta + "'  ><tr  >" + '' + retorn[i].telefone + "</tr> </div>";
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