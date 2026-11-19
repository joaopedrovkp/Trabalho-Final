const formTarefa = document.querySelector("#form-tarefa");
const campoTarefa = document.querySelector("#nova-tarefa");
const listaTarefas = document.querySelector("#lista-tarefas");
const contador = document.querySelector("#contador");
const estadoVazio = document.querySelector("#estado-vazio");
const botaoLimpar = document.querySelector("#limpar-concluidas");
const filtros = document.querySelectorAll(".filtro");

let tarefas = [];
let filtroAtual = "todas";
let proximoId = 1;

function renderizarTarefas() {
    const tarefasVisiveis = tarefas.filter((tarefa) => {
        if (filtroAtual === "pendentes") return !tarefa.concluida;
        if (filtroAtual === "concluidas") return tarefa.concluida;
        return true;
    });

    listaTarefas.replaceChildren();

    tarefasVisiveis.forEach((tarefa) => {
        const item = document.createElement("li");
        item.className = "item-tarefa";
        item.classList.toggle("concluida", tarefa.concluida);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefa.concluida;
        checkbox.setAttribute(
            "aria-label",
            `${tarefa.concluida ? "Reabrir" : "Concluir"} tarefa: ${tarefa.texto}`
        );
        checkbox.addEventListener("change", () => {
            tarefa.concluida = checkbox.checked;
            renderizarTarefas();
        });

        const descricao = document.createElement("span");
        descricao.className = "texto-tarefa";
        descricao.textContent = tarefa.texto;

        const botaoRemover = document.createElement("button");
        botaoRemover.type = "button";
        botaoRemover.className = "botao-remover";
        botaoRemover.textContent = "Excluir";
        botaoRemover.setAttribute("aria-label", `Excluir tarefa: ${tarefa.texto}`);
        botaoRemover.addEventListener("click", () => {
            tarefas = tarefas.filter((itemTarefa) => itemTarefa.id !== tarefa.id);
            renderizarTarefas();
        });

        item.append(checkbox, descricao, botaoRemover);
        listaTarefas.append(item);
    });

    const pendentes = tarefas.filter((tarefa) => !tarefa.concluida).length;
    contador.textContent =
        pendentes === 0
            ? "Tudo em dia!"
            : `${pendentes} tarefa${pendentes === 1 ? "" : "s"} pendente${pendentes === 1 ? "" : "s"}`;

    estadoVazio.hidden = tarefasVisiveis.length > 0;
    if (tarefas.length === 0) {
        estadoVazio.textContent = "Sua lista está vazia. Adicione uma tarefa para começar.";
    } else if (filtroAtual === "pendentes") {
        estadoVazio.textContent = "Não há tarefas pendentes.";
    } else if (filtroAtual === "concluidas") {
        estadoVazio.textContent = "Ainda não há tarefas concluídas.";
    }

    botaoLimpar.disabled = !tarefas.some((tarefa) => tarefa.concluida);
}

formTarefa.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const texto = campoTarefa.value.trim();
    if (!texto) {
        campoTarefa.focus();
        return;
    }

    tarefas.push({
        id: proximoId++,
        texto,
        concluida: false
    });

    filtroAtual = "todas";
    filtros.forEach((filtro) => {
        const ativo = filtro.dataset.filtro === filtroAtual;
        filtro.classList.toggle("ativo", ativo);
        filtro.setAttribute("aria-pressed", String(ativo));
    });

    formTarefa.reset();
    renderizarTarefas();
    campoTarefa.focus();
});

filtros.forEach((filtro) => {
    filtro.addEventListener("click", () => {
        filtroAtual = filtro.dataset.filtro;
        filtros.forEach((opcao) => {
            const ativo = opcao === filtro;
            opcao.classList.toggle("ativo", ativo);
            opcao.setAttribute("aria-pressed", String(ativo));
        });
        renderizarTarefas();
    });
});

botaoLimpar.addEventListener("click", () => {
    tarefas = tarefas.filter((tarefa) => !tarefa.concluida);
    renderizarTarefas();
});

renderizarTarefas();