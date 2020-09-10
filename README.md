# Jogo da Memória

Jogo da memória desenvolvido para a disciplina Princípios de Desenvolvimento Web - 2020.3 - UFCG.

## Descrição do Projeto

Partindo da definição clássica de um jogo da memória ([que pode ser encontrada aqui](https://pt.wikipedia.org/wiki/Jogo_de_mem%C3%B3ria)), o intuito é desenvolver um jogo no mesmo estilo que rode num navegador e utilize uma API rest para comunicação e armazenar quaisquer lógicas necessárias.

O jogo contará com um modo de jogador único, onde o jogador deverá encontrar todas as peças pares. Seu desempenho será mensurado de acordo com o tempo decorrido até que sejam encontrados todos os pares e pelo número de erros cometidos (pares incorretos).

A pontuação obtida será registrada ao final de cada partida e estará disponível para consulta numa tabela de Hiscores, onde os jogadores poderão verificar as maiores pontuações.

Haverão diferentes níveis de jogo, variando a quantidade de pares, limite de tempo e limite de pares errados (ou a ausência de ambos). Modos de jogo com parâmetros customizados poderão ser criados pela comunidade.

## Funcionalidades Extras

- Modo de jogo multijogador, onde dois jogadores (talvez mais, se possível) jogarão simultaneamente num modo de turnos. Nesse caso, o vencedor será o que tiver mais pares acumulados;
  - A conexão entre jogadores poderá ser feita por meio de um código de acesso à sala, onde o(s) jogador(es) que forem se conectar deverão utilizar o mesmo código, ou por meio de uma listagem de salas. Provavelmente será a primeira maneira, ainda a decidir.
- Login de usuário (talvez utilizando rede social);
  - Associar hiscores à conta;
  - Possibilita visualizar hiscores de amigos na rede social (caso seja por rede social de fato ou haja essa possibilidade);
  - Pefil do usuário com estatísticas de jogo;
    - Partidas jogadas, hiscores pessoais...
