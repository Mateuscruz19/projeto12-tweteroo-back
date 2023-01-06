import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());

const users = []
let tweets = [];

app.post('/sign-up', (req,res) => {

    const { username, avatar } = req.body;

    if(!username || !avatar) return res.status(400).send("Todos os campos são obrigatórios");

    const isUserExists = users.find((user) => user.username.toLowerCase() === username.toLowerCase());

     if (isUserExists) return res.status(409).send({ error: "Usuário já existe." });

    function checkUrl(string) {
        try {
         let url = new URL(string)
         return(true)
       } catch(err) {
           return(false)
       }
     }
     
    const verife = checkUrl(avatar)
    if(!verife)  return res.status(400).send("Voce precisa mandar um Link Valido para seu avatar.");

    users.push({ username, avatar });
      userNow = { username, avatar };
      res.status(201).send({Return: "OK"})
});

app.post('/tweets', (req,res) => {

  const { user } = req.headers;
  const { tweet } = req.body;

        if(!tweet) res.status(400).send("Escreva algo no campo.");

        tweets.push({ username: user, tweet});

          res.status(201).send("ok")
});

app.get('/tweets', (req,res) => {

  const { page } = req.query;

  if (page && page < 1)  return res.status(400).send({ error: "Informe uma página válida" });
  
  const start = (page - 1) * 10; 
  const end = page * 10

  tweets.forEach((tweet) => {
    const { avatar } = users.find((user) => user.username === tweet.username);
    tweet.avatar = avatar;
  });

  if (tweets.length <= 10 ) {
    res.send([...tweets].reverse());
    return;
  }

  res.send([...tweets].reverse().slice(start, end));
 });


 app.get('/tweets/:username', (req,res) => {

  const username = req.params.username;
  const result = tweets.filter(obj => obj.username.toLowerCase() === username.toLowerCase())
  
 res.send(result.reverse());
})


const port = 5000;
app.listen(port, () => console.log(`Server is running in port: ${port}`));
