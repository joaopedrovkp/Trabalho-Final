# Lista de Tarefas (Trabalho final do semestre)

## Descrição:
-Este projeto apresenta uma aplicação web voltada para a organização pessoal, desenvolvida como trabalho final de Desenvolvimento Web. Com o intuito de criar uma interface agradável e simples de compreender e sendo responsiva para diferentes dispositivos.

-A implementação utiliza HTML5 para estruturar a página, CSS3 para definir a apresentação visual e fazer a adaptação do layout a diferentes tamanhos de tela, e JavaScript para as interações. 

-Foram utilizadas tecnologias nativas do navegador, sem frameworks ou dependências externas, tornando o projeto mais básico e facilitando a compreensão e a manutenção do código.

## Funcionalidades:
-Adicionar, editar e excluir tarefas.

-Marcar tarefas como concluídas ou reverter ação.

-Filtrar tarefas por status: todas, pendentes ou concluídas.

-Definir prioridade alta, média ou baixa.

-Escolher a categoria das tarefas como pessoal, trabalho, estudos, casa, saúde ou outros.

-Limpar todas as tarefas concluídas.

-Acompanhar a quantidade de tarefas pendentes.

-Salvar os dados no navegador usando localStorage.

## Como executar:
1. Digite o nome da sua tarefa em baixo da frase: "O que você precisa fazer?"

2. Selecione sua prioridade, para escolher em o que focar mais ou menos.

3. Selecione a categoria para deixar mais organizado suas tarefas.

4. Clique em "Adicionar tarefa, e pronto, sua tarefa está criada e salva.

5. Clique no quadrado no lado esquerdo do nome da tarefa para marcar como concluído.

-Você pode ver na aba "Minhas tarefas" e pode escolher entre os filtros que existem: Todas (tem todas as tarefas independente se está concluída ou não), Pendentes (Faltam serem concluídas) e Concluídas (Nome autoexplicativo)

-Obs: Você pode alterar a tarefa se quiser modificar alguma informação além de poder excluir a tarefa da aba Minhas tarefas.

## Tecnologias utilizadas:
-HTML5

-CSS3

-JavaScript

-Git e GitHub

## Link para a Aplicação no GitHub Pages:
-https://joaopedrovkp.github.io/Trabalho-Final/


## Principais decisões de implementação:

-A lista de tarefas é guardada em uma estrutura de dados no JavaScript. Cada tarefa tem um identificador próprio, além de suas informações e do seu estado. Assim, ao editar ou excluir um item, a aplicação consegue localizar a tarefa direcionada. O formulário é reutilizado para adicionar e editar tarefas. No modo de edição, ele recebe os dados atuais e, ao salvar, atualiza o item que já existe em vez de criar outro item. Uma função central reconstrói a lista a partir dos dados atuais, mantendo a tela sincronizada após cada alteração. Os filtros usam o estado de conclusão para exibir as tarefas adequadas sem criar listas separadas. Para salvar os dados entre acessos, a aplicação salva as tarefas como JSON no localStorage sempre que há alterações e as carrega ao iniciar. O texto das tarefas é inserido como conteúdo textual, sem ser interpretado pelo HTML.