<h1 align="center">Seu Jão Bot</h1>
<p align="center">Um Bot para o Discord desenvolvido com <a href="https://discord.js.org/#/">discord.js</a></p>

## Funcionalidades:
* Criar um perfil para o usuário
* Editar o perfil
* Ver o perfil do usuário
* Sistema monetário (10 coins acada mensagem enviada)
* Criar um emblema ou pet (emoji)
* Remover um emblema ou pet
* Criar uma loja de emblema e uma de pet separada em dois canais de texto diferentes
* Atualizar a loja
* Dar coins para um outro usuário
* Dar um emblema ou um pet para um outro usuário

## Comandos:
* /criar
* /editarperfil
* /perfil
* /adicionaritem
* /deletaritem
* /criarloja
* /atualizarloja
* /darcoins
* /daremblema
* /darpet

## Como iniciar:

## Pré-requisitos
* Uma aplicação criada no <a href="https://discord.com/developers/applications">discord developers</a>
* <a href="https://nodejs.org/en/">Node.js</a>
* Conta no <a href="https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_amers-br_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624308&adgroup=115749706023&gclid=Cj0KCQjwnbmaBhD-ARIsAGTPcfUPGnmrDQ-KmubvizLjJ-SCfNuzEupOy5hgNBFFAGpaIhZnjsxE-NYaAr2lEALw_wcB">MongoDB Atlas</a>

## Comandos iniciais
* git clone https://github.com/MatDev435/seu-jao-discord-bot
* npm install


## Arquivo config.json
Algumas informações precisam ser guardadas em um arquivo de configurações na raiz do projeto.

* Crie um arquivo chamado <config.json>

Precisamos adicionar algumas variáveis neste arquivo

* "token": "" -> Essa variável representa o token do seu Bot. Você pode conseguir essa informação na página da sua aplicação no <a href="https://discord.com/developers/applications">discord developers</a>
* "clientId": "" -> Aqui vai o id da sua aplicação. Você também pode conseguir essa informação no <a href="https://discord.com/developers/applications">discord developers</a>
* "guildId": "" -> A guildId será o id do seu servidor de teste no discord, isso é usado para adicionar comandos que você está desenvolvendo apenas no seu servidor de teste (Obrigatório). Você pode conseguir esse id clicando com o  botão direito do mouse em um servidor e depois cliquem em "Copiar Id". Lembrando que para ter acesso a esta opção você precisa ativar o modo desenvolvedor nas configurações do Discord.
* "mongoDBURL": "" -> Essa variável representa o link de conexão do MongoDB. Você pode obbter esse link na página inicial do seu banco de dados no <a href="https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_amers-br_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624308&adgroup=115749706023&gclid=Cj0KCQjwnbmaBhD-ARIsAGTPcfUPGnmrDQ-KmubvizLjJ-SCfNuzEupOy5hgNBFFAGpaIhZnjsxE-NYaAr2lEALw_wcB">MongoDB Atlas</a>

> O preenchimento de todas as variáveis é obrigatório. Não preencher ou preencher com informações incorretas resultará em erro.

Após isso, os seus arquivos estão prontos!

Rode <node .> no terminal para iniciar a aplicação.

## Informações sobre comandos
Toda vez que você adicionar um novo comando ao Bot, você precisa rodar o arquivo deploy-commands.js
> node deploy-commands.js

Para remover um comando rode o arquivo delete-commands.js
> delete-commands.js

Você pode aprender mais a como usar esses arquivos e sobre slash commands no <a href="https://discordjs.guide/">Gia Oficial</a> do Discord.js
