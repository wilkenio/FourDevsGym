function loadPoupUp() {
    fetch('../../src/components/poupUp/index.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('contain-dashboard').innerHTML += data;
            initializeNav()
        })
        .catch(error => console.error('Erro ao carregar o cabeçalho:', error));
}

// Chame a função para carregar o cabeçalho

    loadPoupUp();
