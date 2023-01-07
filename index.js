import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let users = []
let Tweets = [];
const ok = "OK"

app.post('/sign-up', (req, res) => {

    const { username, avatar } = req.body;

    if(username || avatar){
      res.status(400).send("Todos os campos são obrigatórios");
      return
    }

    if(username == !String || avatar == !String){
        res.status(400).send("Os campos precisam ser caracteres.");
        return
      }

	users = {user: req.body}
  res.status(201).send(ok)

});

app.get('/tweets', (req,res) => {
    const { page } = req.query;

    const start = (page - 1) * 10; 
    const end = page * 10

    res.send([...Tweets].reverse().slice(start, end));
});

// avatar: users.user.avatar,
app.post('/tweets', (req,res) => {

    const { tweet } = req.body
    Tweets.push({
      username: req.body.username,
      avatar: users.user.avatar,
        tweet: req.body.tweet
    })
    if(!tweet || (tweet = []) || (tweet = !String)){
      res.status(400);
    }

    res.status(201).send(ok)
})


app.get('/tweets/:username', (req,res) => {
  const username = req.params.username;
  const result = Tweets.filter(obj => obj.username === username)
 res.send(result)
})

app.listen(5000, () => console.log("App running in port: 5000"))