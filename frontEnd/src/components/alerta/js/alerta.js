function loadPoupUp() {
    fetch('../../src/components/alerta/index.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('contain-dashboard').innerHTML += data;
            initializeNav()
        })
        .catch(error => console.error('Erro ao carregar o cabeçalho:', error));
}

// Chame a função para carregar o cabeçalho

    loadPoupUp();

function OcultarAlerta(){
    var alerta = document.getElementById('alerta')
    setTimeout(function() {
        alerta.style.right="-100%";
    }, 5000);
}

function MostrarAlerta(msg){
    var alerta = document.getElementById('alerta')
        alerta.style.right="1%";
        alerta.innerText=msg
        OcultarAlerta();
}