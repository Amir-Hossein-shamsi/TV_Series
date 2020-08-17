mongoose=require('mongoose'),
colors=require('colors'),
comment=require('./models/comment'),
post=require('./models/post');


var data=[
    {
        title:"Breacking Bad",
        image: "https://cdn.suwalls.com/wallpapers/tv-shows/breaking-bad-43602-1920x1080.jpg",
        description :"Walter White, a chemistry teacher, discovers that he has cancer and decides to get into the meth-making business to repay his medical debts. His priorities begin to change when he partners with Jesse"
    },
    {
        title:"Fleabag",
        image: "https://s26162.pcdn.co/wp-content/uploads/2019/01/Fleabag.jpg",
        description :"A dry-witted woman, known only as Fleabag, has no filter as she navigates life and love in London while trying to cope with tragedy. The angry, grief-riddled woman tries to heal while rejecting anyone who tries to help her, but Fleabag continues to keep up her bravado through it all. Comic actress Phoebe Waller-Bridge stars as the titular character on the series, which is based on Waller-Bridge's 2013 one-woman show of the same name."
    },
    {
        title:"Westworld",
        image: "https://i.pinimg.com/originals/16/73/29/1673298e88cd75bdb71508ed11abe0c4.jpg",
        description :"In a futuristic Western-themed amusement park, Westworld, the visitors interact with automatons. However, all hell breaks loose when the robots begin malfunctioning."
    }
]

module.exports = function seedDB() {
    comment.remove({},function (err) {
        if (err) {
            console.log(err);
            
        } else {
            //.................
            post.remove({},function (err) {
                if (err) {
                    console.log(err);
                    
                } else {
                    console.log("deleted");
                    data.forEach(function (seed) {
                        post.create(seed,function (err,post) {
                              if (err) {
                                  console.log(err+"error".red);
                                  
                              } else {
                                  console.log("post added sucssusfuly".rainbow);
                                   comment.create({
                                       user:"hommer",
                                       content:"Commodo id aliqua amet pariatur ipsum voluptate ut et officia aliqua do. Aliqua reprehenderit sunt minim aute occaecat cupidatat reprehenderit officia nulla ipsum et excepteur. Aliqua in do consequat esse."
                                   },function (err,newcomment) {
                                       if (err) {
                                           console.log(err);
                                           
                                       } else {
                                           post.comments.push(newcomment);
                                           post.save();
                                           console.log("commet added a post save in DataBase");
                                           
                                       }
                                     })
                              }
                          })
                      })
                    
                }
              });
            //................
            console.log("_______________".red);
            
        }
      })
   

  }