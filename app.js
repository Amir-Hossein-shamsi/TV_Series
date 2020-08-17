const bodyParser=require('body-parser'),
mongoose=require('mongoose'),
express = require('express'),
methodOverride =require('method-override'),
colors=require('colors'),
post=require('./models/post'),
seedDb=require("./seed.js"),
comment=require('./models/comment');
var path= require('path');
const pathnew=path.join(__dirname,"views/public");
app = express();
app.use(express.static(pathnew));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost/tvshow', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
seedDb();





app.get('/', (req, res) => {
    res.redirect('/tvshows');
});

app.get('/tvshows', (req, res) => {
    post.find({},function (err,posts) {
        if (err) {
            console.log(err);
            
        } else {
            res.render('pages/index',{posts:posts});
            console.log("________index________".red);
            
        }
      })
    
});

app.get('/tvshows/new', (req, res) => {
    res.render('pages/create');

   
});
app.post('/tvshows', (req, res) => {
    post.create(req.body.post,function (err,newpost) {
        if (err) {
            console.log(err);
            res.render('pages/create')
            
        } else {
            console.log("__________post Added_______".yellow);
            res.redirect('/tvshows');
        }
      })
   
});


app.get('/tvshows/:id', (req, res) => {
    post.findById(req.params.id).populate('comments').exec(function (err,foundData) { 
        if (err) {
            console.log(err);
            
        } else {
            res.render('pages/show',{tv:foundData});
            console.log("________show________".blue);

        }
     });
    
   
});


app.get('/tvshows/:id/comments/new', (req, res) => {
    post.findById(req.params.id,function (err,foundpost) {
        if (err) {
            console.log(err);
            
        } else {
            res.render("pages/commetPages/create",{post:foundpost});
        }
      })
       
});
app.post('/tvshows/:id/comments', (req, res) => {
    post.findById(req.params.id,function (err,foundedpost) {
        if (err) {
            console.log(err);
            
        } else {
            comment.create(req.body.comment,function (err,newcomment) {
                if (err) {
                    console.log(err);
                    res.render('pages/index')
                    
                } else {
                    foundedpost.comments.push(newcomment);
                    foundedpost.save();
                    console.log("post a comment added to DB".bgCyan);
                    res.redirect('/tvshows')
                }
              })
        }
      })
});




































app.listen(3000, () => {
    console.log('Example app listening on port port!');
});

//Run app, then load http://localhost:port in a browser to see the output.