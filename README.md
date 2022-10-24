# oamarelinho
Teste BackEnd FrontEnd

# Avaliação Hard Skill
## 1) Frontend, desenvolver uma única página de vagas em React/Angular que contemple:
um list de card de vagas ordenado pela última data de atualização.
no topo da página um search para filtrar a lista de vagas pelo título ou cidade.
A busca da lista será realizada em um backend, descrito na etapa 2.

## 2) No backend, desenvolver em NodeJS com typescript e algum db SQL, o endpoint em RESTful (GET) de consumo da lista de vagas necessária na etapa 1.
job = {
  id:  number;
  title: string;
  description: string;
  companyName: string;
  cityName: string:
  stateName: string;
  updatedAt: Date;
  createdAt: Date;
}

## Informações dos Projetos
### backend
Para o backend foi utilizado o framework nextjs, typescript e banco de dados SQLlite para facilitar a execução do projeto e validação
Para rodar o sistema basta dar o comando:
npm start ou nest start para acessar usar a url http://localhost:3000/

Para o frontend foi utilizado o framework angular e typescript
Para rodar o sistema basta dar o comando:
ng serve e para acessar bastar abrir a url no navegador http://localhost:4200/
