const express = require("express");
const app = express();
// ejs serve para renderizar  back end sem necessariamente ter um front criado.
app.set ('view engine', 'ejs');
app.use(express.static('public'));
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//Conexão DataBase
connection
    .authenticate()
    .then(() => {
        console.log("Concexão com banco de dados ok!")
    })
    .catch((msgErro) => {
        console.log('msgErro');
    })

// body parser tem a função de pegar as informações imputadas pelo usuario no backend e codificar para queo back consiga ler e trabalhar com as informações. Essasinformações terá conexão com a class no front e a varivael declarada na rota escolhida.
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//rotas
app.get("/",(req,res) =>{     
    //a função findAll vai pegar toda a lista da rota Pergunta, vai armazenadar esse array no var perguntas e imprimir no console usando o metodo res.render.
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas =>{
        res.render("index", {
            perguntas:perguntas
        });
    });
    
});

app.get("/perguntar", (req,res) =>{
    res.render("perguntar");
})

app.post("/salvarpergunta", (req,res) =>{
    var titulo= req.body.titulo;
    var descricao= req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    })
    .then(() =>{
        
        res.redirect("/");
        
    })    
});

app.get("/pergunta/:id", (req,res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id},
    }).then(pergunta =>{
        if(pergunta != undefined){

            Resposta.findAll({
                where:{perguntaID: pergunta.id},
                order:[['id', 'DESC']]
            }).then(respostas=>{
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas,
                });

            })
            //caso não encontre, redirecionar p home.
        }else{
            res.redirect("/");
        }
    })
})

app.post("/responder", (req,res) =>{
    var corpo = req.body.corpo
    var perguntaID = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaID: perguntaID
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaID)
    });
})

app.listen(8080, () =>{console.log("App rodando");});