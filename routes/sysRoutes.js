const express = require('express');
const router = express.Router();
const conexao = require('../db/conexao')

//Read
router.get('/', (req, res) => {
    const queryR = 'SELECT * FROM produtos'
    conexao.query(queryR, (err, data) => {
        if (err) {
            return console.error(err);
        }
        const produtos = data;
        res.render('home', { produtos });
    })
});


//Create
router.get('/paginaCadastro',(req, res)=>{
    res.render('cadastro');
})
router.post('/produtos/adicionarProduto', (req, res) => {
    // Obtenha os dados do formulário
    const nomeProduto = req.body.nomeProduto;
    const quantidade = req.body.quantidade;
    const preco = req.body.preco;
    // Faça a inserção no banco de dados
    const queryC = `INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)`;

    conexao.query(queryC, [nomeProduto, quantidade, preco], (err) => {
        if (err) {
            console.log(err);
            // Lide com erros aqui
        } else {
            // Redirecione para a página inicial ou faça qualquer ação desejada após o sucesso
            res.redirect('/');
        }
    });
});


//UPDATE
router.get('/paginaEditar/:id', (req, res) => {
    const id = req.params.id;
    const queryR = 'SELECT * FROM produtos WHERE id = ?';

    conexao.query(queryR, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao recuperar o produto.' });
        }

        const produto = data[0];
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        res.render('editar', { produto });
    });
});
router.post('/alterarProduto', (req, res) => {
    const id = req.body.id;
    const nomeProduto = req.body.nomeProduto;
    const quantidade = req.body.quantidade;
    const preco = req.body.preco;

    const queryU = 'UPDATE produtos SET nome = ?, quantidade = ?, preco = ? WHERE id = ?';

    conexao.query(queryU, [nomeProduto, quantidade, preco, id], (err, result) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
});


//Delete
router.get('/excluirProduto/:id',(req,res)=>{
    const id = req.params.id
    const queryD = 'DELETE FROM produtos WHERE id = ?'

    conexao.query(queryD,[id],(err)=>{
        if (err) {
            console.log(err)
        }
        res.redirect('/')
    })
})



module.exports = router;