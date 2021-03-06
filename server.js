var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').pool;
var config={
    user:'thandalamanish',
    database:'thandalamanish'
    host:'db.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var articles = {
     'article-one': {
        title: 'Article one |Anish Thandalam',
        heading:'Article one',
        date: '17th Feb 2018',
        content:` <p>
                This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.
                </p>
                <p>
                This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.
                </p>
                <p>
                This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.
                </p>`
        
    },
     'article-two':{title: 'Article two |Anish Thandalam',
        heading:'Article two',
        date: '20th Feb 2018',
        content:` <p>
                This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.
                </p>`,},
     'article-three': {title: 'Article three |Anish Thandalam',
        heading:'Article three',
        date: '21st Feb 2018',
        content:` <p>
                This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage.This is my first webpage</p> `,}
};
function createTemplate (data){
    var title =data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var htmlTemplate = `
        <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=mobile-width, initial-scale=1"/>
                    <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date}
            </div>
            ${content}
            <div>
            </div>
            </div>
        </body>
    </html>
    `;

return htmlTemplate;
}
var counter=0;
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new pool(config);
app.get('/test-db',function(req,res) {
    pool.query('SELECT * FROM test',function(err,result)){
        if(err){
            res.status(500).send(err.toString());
        }else {
            res.send(JSON.stringify(result));
        }
        });
        });

app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
})

app.get('/:articleName', function(req,res){
    var articleName= req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
