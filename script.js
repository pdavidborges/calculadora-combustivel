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
// INSTALAÇÃO DO PWA (ANDROID & IOS)
// ----------------------------

let deferredPrompt;

// Seletores dos elementos da interface
const containerInstalar = document.getElementById("instalar-app");
const blocoAndroid = document.getElementById("instalar-android");
const blocoIos = document.getElementById("instalar-ios");

// Detecta se a aplicação já está rodando de forma standalone (instalada)
const isStandalone = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;

// Detecta se o dispositivo é iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Inicializa a exibição para dispositivos iOS que não estão no modo standalone
if (isIOS && !isStandalone) {
    containerInstalar.style.display = "block";
    blocoIos.style.display = "block";
}

// Evento nativo disparado por navegadores suportados (Chrome/Android/Desktop)
window.addEventListener("beforeinstallprompt", (e) => {
    // Impede que o prompt nativo seja exibido imediatamente
    e.preventDefault();
    
    // Salva o evento para ser disparado posteriormente
    deferredPrompt = e;
    
    // Exibe o card de instalação e a seção do Android
    containerInstalar.style.display = "block";
    blocoAndroid.style.display = "block";
});

// Ação ao clicar no botão "Instalar Aplicativo"
document.getElementById("btnInstalar").addEventListener("click", async () => {
    if (!deferredPrompt) return;

    // Dispara o prompt nativo do navegador
    deferredPrompt.prompt();

    // Aguarda a resposta de escolha do usuário
    const escolha = await deferredPrompt.userChoice;

    if (escolha.outcome === "accepted") {
        console.log("Usuário aceitou a instalação do PWA");
    } else {
        console.log("Usuário recusou a instalação do PWA");
    }

    // Limpa o prompt acumulado
    deferredPrompt = null;

    // Oculta a área de instalação
    containerInstalar.style.display = "none";
});

// Evento disparado quando o app é instalado com sucesso
window.addEventListener("appinstalled", () => {
    containerInstalar.style.display = "none";
    console.log("Aplicativo instalado com sucesso!");
});