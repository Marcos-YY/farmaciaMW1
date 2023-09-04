const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const rota = require('./routes/sysRoutes');
const partials = exphbs.create({partialsDir: './views/partials'})
const conexao = require('./db/conexao.js')


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
// Configuração do Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
// Usar rotas
app.use('', rota);
app.engine('handlebars', partials.engine)


// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
