import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let users = {}
let Tweets = [];
let userstweet = []
const ok = "OK"

app.post('/sign-up', (req, res) => {
    if(!req.body.username || !req.body.avatar){
      res.status(400).send("Todos os campos são obrigatórios");
    }
	users = {user: req.body}
  res.status(201).send(ok)

});

app.get('/tweets', (req,res) => {
   res.send(Tweets)
   global.console.log(Tweets)
});

// avatar: users.user.avatar,
app.post('/tweets', (req,res) => {
    Tweets.push({
      username: req.body.username,
      avatar: users.user.avatar,
        tweet: req.body.tweet
    })
    if(!req.body){
      res.status(400).send("Todos os campos são obrigatórios");
    }

    res.status(201).send(ok)
})


app.get('/tweets/:username', (req,res) => {
  const username = req.params.username;
  const result = Tweets.filter(obj => obj.username === username)
 res.send(result)
})

app.listen(5000, () => console.log("App running in port: 5000"))