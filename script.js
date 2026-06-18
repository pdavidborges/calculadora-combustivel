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

        navigator.serviceWorker.register("./sw.js")
            .then(() => {

                console.log("Service Worker registrado");

            })
            .catch(err => {

                console.error(err);

            });

    });

}


// ----------------------------
// INSTALAÇÃO DO PWA
// ----------------------------

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {

    console.log("PWA INSTALÁVEL");

    e.preventDefault();

    deferredPrompt = e;

    document.getElementById("instalar-app").style.display = "block";

});


document.getElementById("btnInstalar").addEventListener("click", async () => {

    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const escolha = await deferredPrompt.userChoice;

    if (escolha.outcome === "accepted") {

        console.log("Instalado");

    }

    deferredPrompt = null;

    document.getElementById("instalar-app").style.display = "none";

});


// ESCONDER APÓS INSTALAÇÃO

window.addEventListener("appinstalled", () => {

    document.getElementById("instalar-app").style.display = "none";

    console.log("Aplicativo instalado");

});