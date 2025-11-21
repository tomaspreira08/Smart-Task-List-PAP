🧠 Assistente de Cuidados de Memória (PAP)
Este projeto consiste no desenvolvimento de um sistema integrado (App Móvel e Assistente de Voz) desenhado para apoiar cuidadores e simplificar a gestão da rotina de tarefas críticas (como medicação, higiene e alimentação) para indivíduos com problemas de memória, como Alzheimer.

🎯 Objetivo Central
O objetivo principal é criar um sistema de monitorização em tempo real que fornece ao cuidador uma visão clara e imediata do estado das tarefas agendadas, utilizando a aplicação móvel para gestão e o assistente de voz para interação simples e feedback visual (cores).

🛠️ Componentes e Funcionamento
O sistema divide-se em dois componentes principais que comunicam entre si:

1. Aplicação Móvel (Frontend)
Tecnologia: React Native / Expo (com TypeScript/TSX).

Função: É o painel de controlo do cuidador. Permite agendar novas tarefas, definir horários, recorrências e monitorizar o estado de todos os lembretes.

Interface: Utiliza um Bottom Tab Navigator para navegação primária entre os ecrãs principais:

Lembretes: Lista de tarefas pendentes e concluídas.

Calendário: Visão diária/semanal (com o sistema de cores).

Adicionar: Formulário para criar novos lembretes.

Dados: A gestão do estado (addTask, removeTask, isCompleted) é centralizada no TaskContext (Context API).

2. Assistente de Voz (Backend/Hardware)
Hardware: Raspberry Pi (aloja o sistema de controlo).

Tecnologia: Lógica de backend (e.g., Node.js ou Python).

Função: Atua como um ponto de interação e feedback. O assistente é programado para:

Receber Comandos: Responder a comandos de voz (ex: "Assistente, a tarefa 'Tomar Comprimidos' está concluída").

Comunicação Bidirecional: Recebe os dados de agendamento da App Móvel e envia confirmações de estado (Concluído/Não Concluído) para a App.

🌈 Sistema de Cores (Feedback Imediato)
Um aspeto crucial do projeto é o feedback visual simplificado, especialmente no ecrã Calendário e na Lista de Lembretes:

🟢 Verde (Concluído): Indica que a tarefa foi concluída ou que todas as tarefas num determinado dia foram tratadas.

🔴 Vermelho (Pendente): Indica que a tarefa está atrasada ou que há tarefas críticas por fazer num determinado dia.

Isto permite ao cuidador, com um único olhar, identificar rapidamente se a rotina do dia foi seguida conforme o agendamento.