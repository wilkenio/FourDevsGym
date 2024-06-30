// Espera o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    const inputBuscarExercicio = document.getElementById('inputBuscarExercicio');
    const resultadosExercicios = document.getElementById('resultadosExercicios');
    let exerciciosCache = [];

    // Função para renderizar os resultados dos exercícios
    function renderizarResultados(exercicios) {
        // Limpar resultados anteriores
        resultadosExercicios.innerHTML = '';

        exercicios.forEach(function(exercicio) {
            // Criar os elementos HTML
            const divExercicio = document.createElement('div');
            divExercicio.classList.add('exercicio');

            const imgExercicio = document.createElement('img');
            imgExercicio.src = exercicio.gif_url; // Aqui você usaria a URL do GIF do exercício
            imgExercicio.alt = exercicio.nome;

            const nomeExercicio = document.createElement('div');
            nomeExercicio.classList.add('nome-exercicio');
            nomeExercicio.textContent = exercicio.nome;

            const inputSerie = document.createElement('input');
            inputSerie.type = 'number';
            inputSerie.classList.add('serie-exercicio');
            inputSerie.value = '3'; // Valor inicial da série, ajuste conforme necessário

            const divMultiplicacao = document.createElement('div');
            divMultiplicacao.textContent = 'X';

            const inputRep = document.createElement('input');
            inputRep.type = 'number';
            inputRep.classList.add('rep-exercicio');
            inputRep.value = '12'; // Valor inicial das repetições, ajuste conforme necessário

            const divAddExercicio = document.createElement('div');
            divAddExercicio.classList.add('addExercicio');
            divAddExercicio.textContent = 'Add'; // Botão ou elemento para adicionar exercício, ajuste conforme necessário

            // Adicionar elementos ao div do exercício
            divExercicio.appendChild(imgExercicio);
            divExercicio.appendChild(nomeExercicio);
            divExercicio.appendChild(inputSerie);
            divExercicio.appendChild(divMultiplicacao);
            divExercicio.appendChild(inputRep);
            divExercicio.appendChild(divAddExercicio);

            // Adicionar divExercicio aos resultadosExercicios
            resultadosExercicios.appendChild(divExercicio);
        });
    }

    // Evento de digitação no input
    inputBuscarExercicio.addEventListener('input', function() {
        const termoBusca = inputBuscarExercicio.value.toLowerCase(); // Termo de busca em minúsculas para comparação
        const exerciciosFiltrados = exerciciosCache.filter(function(exercicio) {
            return exercicio.nome.toLowerCase().includes(termoBusca);
        });
        
        renderizarResultados(exerciciosFiltrados);
    });

    // Fazer requisição GET para a API
    const tokenAdm = localStorage.getItem('tokenAdm'); // Obtém o token do localStorage

    fetch('https://apigym-fourdevs.vercel.app/Exercise', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenAdm}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta da API:', data);
        if (data.success && Array.isArray(data.conteudoJson)) {
            exerciciosCache = data.conteudoJson; // Armazena os dados recebidos da API
            // Chame a função para renderizar os resultados com os dados recebidos da API
            renderizarResultados(data.conteudoJson);
        } else {
            console.error('Resposta inesperada da API:', data);
        }
    })
    .catch(error => {
        console.error('Erro ao fazer requisição:', error);
    });
});
