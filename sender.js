const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;

const app = express();
const port = 3000;
const local_token = "74ef36aw347wjg1";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    console.log(req.query);
    const challenge = req.query['hub.challenge'];
    const token = req.query['hub.verify_token'];
    if (local_token == token) {
        res.send(challenge);
    } else {
        res.send('failed');
    }
});
app.post('/', (req, res) => {
    //console.log(JSON.stringify(req.body));
    const body = req.body;

    body.entry.forEach(entry => {
        if (entry["messaging"]) {
            entry.messaging.forEach(messaging => {
                //console.log(messaging);
                respond(messaging.sender, messaging.message.text);
            });
        }
    });
    res.send("ok");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

function respond(sender, text) {
    console.log(sender, text);
    var message = {
        "recipient": sender,
        "message": {
            "text": text + "~ This is a BOT"
        }
    }

    const access_token = "PASTE YOUR ACCESS TOKEN"
    const url = `https://graph.facebook.com/v9.0/me/messages?access_token=${access_token}`

    axios.post(url, message).then((response) => {
        console.log("Responded");
    });
}