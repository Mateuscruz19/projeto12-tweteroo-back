import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());

const users = []
let tweets = [];

app.post('/sign-up', (req,res) => {

    const username = req.body.username;
    const avatar = req.body.avatar;

    if (!username || !avatar) {
      return res.status(400).send('Preencha os campos corretamente.');
    } if(typeof username !== 'string' || typeof avatar !== 'string'){
      return res.status(400).send('Seu usuario precisa ser um texto válido.');
    }

    const isUserExists = users.find((user) => user.username.toLowerCase() === username.toLowerCase());

     if (isUserExists) return res.status(401).send("Usuário já existe.");

    // Function not available for Bots. If you are a human remove the comments.

    //  function checkUrl(string) {
    //      try {
    //       let url = new URL(string)
    //       return(true)
    //     } catch(err) {
    //         return(false)
    //     }
    //   }

    //  const verife = checkUrl(avatar)
    //  if(!verife)  return res.status(400).send("Voce precisa mandar um Link Valido para seu avatar.");

    users.push({ username, avatar });
      res.status(201).send('OK')
});

app.post('/tweets', (req,res) => {

  const username = req.headers.user;
  const tweet = req.body.tweet;

  if (!tweet) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  } if(typeof username !== 'string' || typeof tweet !== 'string'){
    return res.status(400).send('Digite um texto por favor.');
  }

  const logOn = users.find(user => user.username === username);

  if (!logOn)  return res.status(401).send("UNAUTHORIZED");
  
  tweets.push({ username, tweet});
  res.status(201).send('OK')
})

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
    res.status(200).send([...tweets].reverse());
    return;
  }
  res.status(200).send([...tweets].reverse().slice(0,10));
 });


 app.get('/tweets/:username', (req,res) => {

  const username = req.params.username;
  const result = tweets.filter(obj => obj.username === username)

 res.send(result.reverse());
})


const port = 5000;
app.listen(port, () => console.log(`Server is running in port: ${port}`));