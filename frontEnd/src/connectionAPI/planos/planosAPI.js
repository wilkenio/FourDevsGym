const token = localStorage.getItem('tokenAdm');
const lista_planos = document.getElementById("planos-lista");
const URLPlans = "https://apigym-fourdevs.vercel.app/plan";

async function readPlans() {
    try {
        const response = await fetch(`${URLPlans}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + ` ${token}`,
            },
        });
        const result = await response.json();
        return result.conteudoJson;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function showPlans() {
    const noticesArray = await readPlans();
    let plano_element;
    noticesArray.forEach(element => {

        let tituloPlano;
        if (element.tipo.toLowerCase().includes("plano")) {
            tituloPlano = element.tipo.replace(/plano/gi, "Plano");
        } else {
            tituloPlano = "Plano " + element.tipo;
        }

        plano_element = `
                <div class="plano-formato" id_plano="${element.id_plano}">
                    <div class="plano-edit-remove">
                        <h4>${tituloPlano}</h4>
                        <div class="div-edit-remove">
                            <a class="edit-button" href="../planosForm/planosForm.html"><i class="fa-solid fa-pen-to-square"
                                    style="color: #ffffff;"></i></a>
                            <div><i class="fa-solid fa-x" style="color: var(--cor-1);"></i></div>
                        </div>
                    </div>
                    <div class="plano-valor-quantidade">
                        <div class="div-valor-plano">
                            <h1>${element.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                        </div>
                        <div class="div-plano-ativo">
                            <h1>60</h1>
                            <h3>Planos ativos</h3>
                        </div>
                    </div>
                </div>`;
        lista_planos.innerHTML += plano_element;

    });
}

async function deletePlan(id) {
    try {
        const response = await fetch(`${URLPlans}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + `${token}`,
            },
        });
    } catch (error) {
        console.error("Erro:", error);
    }
}

async function postPlan(data) {
    try {
        const response = await fetch(`${URLPlans}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + ` ${token}`,
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

async function updatePlan(id, data) {
    try {
        const response = await fetch(`${URLPlans}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + ` ${token}`,
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

async function readPlan(id) {
    try {
        const response = await fetch(`${URLPlans}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + ` ${token}`,
            },
        });
        const result = await response.json();
        return result.conteudoJson;
    } catch (error) {
        console.error("Error:", error);
    }
}