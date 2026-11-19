const formTarefa = document.querySelector("#form-tarefa");
const campoTarefa = document.querySelector("#nova-tarefa");
const campoPrioridade = document.querySelector("#prioridade");
const campoCategoria = document.querySelector("#categoria");
const botaoEnviar = formTarefa.querySelector('button[type="submit"]');
const botaoCancelarEdicao = document.querySelector("#cancelar-edicao");
const listaTarefas = document.querySelector("#lista-tarefas");
const contador = document.querySelector("#contador");
const estadoVazio = document.querySelector("#estado-vazio");
const botaoLimpar = document.querySelector("#limpar-concluidas");
const filtros = document.querySelectorAll(".filtro");

let tarefas = [];
let filtroAtual = "todas";
let proximoId = 1;
let idEmEdicao = null;

const nomesPrioridade = {
    alta: "Alta",
    media: "Média",
    baixa: "Baixa"
};

const nomesCategoria = {
    pessoal: "Pessoal",
    trabalho: "Trabalho",
    estudos: "Estudos",
    casa: "Casa",
    saude: "Saúde",
    outros: "Outros"
};

function encerrarEdicao() {
    idEmEdicao = null;
    formTarefa.reset();
    botaoEnviar.textContent = "Adicionar tarefa";
    botaoCancelarEdicao.hidden = true;
}

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

        const conteudo = document.createElement("div");
        conteudo.className = "conteudo-tarefa";

        const descricao = document.createElement("span");
        descricao.className = "texto-tarefa";
        descricao.textContent = tarefa.texto;

        const detalhes = document.createElement("div");
        detalhes.className = "detalhes-tarefa";

        const prioridade = document.createElement("span");
        prioridade.className = `etiqueta prioridade-${tarefa.prioridade}`;
        prioridade.textContent = `Prioridade: ${nomesPrioridade[tarefa.prioridade]}`;

        const categoria = document.createElement("span");
        categoria.className = "etiqueta etiqueta-categoria";
        categoria.textContent = `Categoria: ${nomesCategoria[tarefa.categoria]}`;

        detalhes.append(prioridade, categoria);
        conteudo.append(descricao, detalhes);

        const acoes = document.createElement("div");
        acoes.className = "acoes-tarefa";

        const botaoEditar = document.createElement("button");
        botaoEditar.type = "button";
        botaoEditar.className = "botao-editar";
        botaoEditar.textContent = "Editar";
        botaoEditar.setAttribute("aria-label", `Editar tarefa: ${tarefa.texto}`);
        botaoEditar.addEventListener("click", () => {
            idEmEdicao = tarefa.id;
            campoTarefa.value = tarefa.texto;
            campoPrioridade.value = tarefa.prioridade;
            campoCategoria.value = tarefa.categoria;
            botaoEnviar.textContent = "Salvar alterações";
            botaoCancelarEdicao.hidden = false;
            campoTarefa.focus();
        });

        const botaoRemover = document.createElement("button");
        botaoRemover.type = "button";
        botaoRemover.className = "botao-remover";
        botaoRemover.textContent = "Excluir";
        botaoRemover.setAttribute("aria-label", `Excluir tarefa: ${tarefa.texto}`);
        botaoRemover.addEventListener("click", () => {
            tarefas = tarefas.filter((itemTarefa) => itemTarefa.id !== tarefa.id);
            if (idEmEdicao === tarefa.id) {
                encerrarEdicao();
            }
            renderizarTarefas();
        });

        acoes.append(botaoEditar, botaoRemover);
        item.append(checkbox, conteudo, acoes);
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

    if (idEmEdicao !== null) {
        const tarefaEditada = tarefas.find((tarefa) => tarefa.id === idEmEdicao);
        if (!tarefaEditada) {
            encerrarEdicao();
            renderizarTarefas();
            return;
        }

        tarefaEditada.texto = texto;
        tarefaEditada.prioridade = campoPrioridade.value;
        tarefaEditada.categoria = campoCategoria.value;
    } else {
        tarefas.push({
            id: proximoId++,
            texto,
            prioridade: campoPrioridade.value,
            categoria: campoCategoria.value,
            concluida: false
        });
    }

    filtroAtual = "todas";
    filtros.forEach((filtro) => {
        const ativo = filtro.dataset.filtro === filtroAtual;
        filtro.classList.toggle("ativo", ativo);
        filtro.setAttribute("aria-pressed", String(ativo));
    });

    encerrarEdicao();
    renderizarTarefas();
    campoTarefa.focus();
});

botaoCancelarEdicao.addEventListener("click", () => {
    encerrarEdicao();
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
    if (idEmEdicao !== null && !tarefas.some((tarefa) => tarefa.id === idEmEdicao)) {
        encerrarEdicao();
    }
    renderizarTarefas();
});

renderizarTarefas();