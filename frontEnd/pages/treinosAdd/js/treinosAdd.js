document.addEventListener('DOMContentLoaded', function () {
    // Adiciona evento de clique para adicionar novos dias
    document.getElementById('addDivisoes').addEventListener('click', function () {
        // Verifica quantos dias já foram adicionados
        var divCount = document.querySelectorAll('.containersDivisoes').length;

        // Se já adicionou até o dia 7, não faz nada
        if (divCount >= 7) {
            alert('Você atingiu o limite máximo de 7 dias.');
            return;
        }

        // Cria o elemento div com o número do dia atual
        var newDiv = document.createElement('div');
        newDiv.classList.add('containersDivisoes');
        newDiv.dataset.menuDia = divCount + 1;
        newDiv.textContent = 'Dia ' + (divCount + 1); // Conteúdo do div com o número do dia

        // Adiciona o novo div dentro de #diaDivisoes, antes de #addDivisoes
        var diaDivisoes = document.getElementById('diaDivisoes');
        diaDivisoes.insertBefore(newDiv, this);

        const containers = Array.from(document.querySelectorAll('.containersDivisoes'));
        containers.forEach(container => {
            container.addEventListener('click', (event) => {
                event.stopImmediatePropagation();
                // Obtém o valor do atributo 'data-menu-dia'
                removeSelected();
                event.target.classList.remove("noselected")
                event.target.classList.add("selected")
                const dia = container.getAttribute('data-menu-dia');
                showDayContent(dia)
                // Aqui você pode adicionar qualquer lógica adicional baseada no dia clicado
            });
        });
        removeSelected();
        newDiv.classList.remove('noselected');
        newDiv.classList.add('selected');
        // Mostra apenas o conteúdo correspondente ao novo dia criado
        showDayContent(divCount + 1);

        // Remove o evento de clique para impedir múltiplas adições consecutivas após o sétimo dia
        if (divCount + 1 >= 7) {
            this.removeEventListener('click', arguments.callee);
        }
    });

    // Seleciona todos os elementos .containersDivisoes, exceto o botão de adicionar
    var containersDivisoes = document.querySelectorAll('.containersDivisoes:not(#addDivisoes)');

    containersDivisoes.forEach(function (container, index) {

        // Adiciona evento de clique para cada div de dia correspondente
        container.addEventListener('click', function () {

            var menuDia = parseInt(this.dataset.menuDia);
            showDayContent(menuDia);
        });
    });

    function showDayContent(dayNumber) {
        // Oculta todos os dias existentes
        var diasCorrespondentes = document.getElementById('diasCorrespondentes').querySelectorAll('.dia');
        for (var i = 0; i < diasCorrespondentes.length; i++) {
            diasCorrespondentes[i].style.display = 'none';
        }

        // Exibe apenas o conteúdo do dia correspondente ao número informado
        var diaToShow = document.querySelector('.dia[data-set="conteudo-dia' + dayNumber + '"]');
        if (diaToShow) {
            diaToShow.style.display = 'block';
        }
    }
});

function removeSelected() {
    let divsDias = Array.from(document.querySelectorAll('.containersDivisoes'));

    divsDias.forEach(element => {
        element.classList.remove("selected");
        element.classList.add("noselected")
    });
}

Array.from(document.getElementsByClassName("addExercicio"))