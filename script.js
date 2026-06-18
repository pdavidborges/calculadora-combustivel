//alert('JS Carregado');

//Função que só será executada quando o usuário enviar o formulário

function calcularCombustivel(e){
    //console.log('Função acionada');
    e.preventDefault(); //Previnindo o comportamento padrão de quem acionou a função
    //console.log(e);

    //Seleção de DOM
    var gasolina = document.getElementById('gasolina').value;
    var etanol = document.getElementById('etanol').value;
    var resposta = document.getElementById('resposta');

    var resultado = etanol / gasolina;

    if(resultado < 0.7){
        //alert('Abasteça com Etanol');
        resposta.innerHTML = 'Abasteça com Etanol';
    }

    else{
        //alert('Abasteça com Gasolina');
        resposta.innerHTML = 'Abasteça com Gasolina';
    }

}



if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js")
            .then(() => {
                console.log("Service Worker registrado");
            })
            .catch(error => {
                console.error("Erro ao registrar SW:", error);
            });
    });
}