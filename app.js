const express = require('express')
const app = express()
const userModel = require('./models/user')
const postModel = require('./models/post')


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/create', async function (req, res) {
  let user = await userModel.create({
    username: "Shreyam",
    email: "Shreyam@gmail.com",
    age:22
  })
  res.send(user)
})

app.get('/post/create', async function(req, res){
    let post = await postModel.create({
        postdata: "hey there!!!",
        user: "6810faa4ba3e1aec24eb74d9"
    })

    let user = await userModel.findOne({_id: "6810faa4ba3e1aec24eb74d9"})
    user.posts.push(post._id)
    await user.save()
    res.send({post, user})
})

app.listen(3000)