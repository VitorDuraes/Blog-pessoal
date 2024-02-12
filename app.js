//Importando módulos:
const express = require("express");
const bodyParser = require("body-parser");
// express: Um framework web para Node.js que simplifica a criação de aplicativos web.

// body-parser: Um middleware para analisar os corpos das requisições HTTP.
//em um contexto Node.js e Express, middleware são funções que têm acesso ao objeto de requisição (req), objeto de resposta (res), e a próxima função de middleware no ciclo de requisição-resposta da aplicação. Essas funções podem executar tarefas, manipular dados ou modificar o fluxo da requisição.

//Configurando o aplicativo:
const app = express();
// Uma instancia do aplicativo Express
const port = 3000;
//Numero da porta em que o servidor será iniciado

//Exemplo de dados (simulando um banco de dados temporário):
let posts = [
  {
    id: 1,
    title: "Primeira Postagem",
    content: "Conteúdo da primeira postagem.",
  },
  {
    id: 2,
    title: "Segunda Postagem",
    content: "Conteúdo da segunda postagem.",
  },
];
//posts: Uma matriz que simula um banco de dados temporário. Cada objeto representa uma postagem no blog com propriedades como id, title, e content. PEDIR PARA EXPLICAR MELHOR SOBRE

//Configurando o EJS e o Body Parser:
app.set("view engine", "ejs");
//app.set('view engine', 'ejs'): Configura o mecanismo de visualização para EJS, permitindo que o aplicativo renderize arquivos .ejs.

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: true })): Configura o middleware body-parser para analisar dados de formulários no corpo das requisições HTTP.

app.use(express.static("public"));
//app.use(express.static('public')): Configura o middleware para servir arquivos estáticos (como CSS) do diretório public.

//Definindo Rotas:
app.get("/", (req, res) => {
  res.render("home", { posts });
});
//GET "/": Rota para a página inicial. Renderiza a página home.ejs e passa os dados das postagens para serem exibidos.

app.get("/post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((post) => post.id === postId);
  res.render("post", { post });
});
//GET "/post/:id:" Rota para exibir uma postagem específica. Extrai o ID da postagem dos parâmetros da URL e renderiza a página post.ejs com os detalhes da postagem.

app.get("/new", (req, res) => {
  res.render("newPost");
});
//GET "/new": Rota para a página de criação de uma nova postagem. Renderiza a página newPost.ejs.

app.post("/create", (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.redirect("/");
});
//POST /create: Rota para lidar com a criação de uma nova postagem. Extrai os dados do formulário, cria uma nova postagem e redireciona para a página inicial.

// ... (outros imports e configurações)

// Rota para excluir uma postagem
app.post("/post/:id/delete", (req, res) => {
  const postId = parseInt(req.params.id);
  // Encontrar a postagem no array de posts
  const index = posts.findIndex((post) => post.id === postId);

  if (index !== -1) {
    // Remover a postagem do a'rray
    posts.splice(index, 1);
  }

  res.redirect("/");
});

//Inicializando o Servidor:

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
//inicia o servidor na porta especificada (3000 neste caso) e imprime uma mensagem no console quando o servidor estiver pronto para receber requisições.
