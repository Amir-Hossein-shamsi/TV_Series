mongoose=require('mongoose');
var postSchema= ({
    title:String,
    image: {type:String, default:"https://static.wixstatic.com/media/1d811d_0a17817916ee481aa2b4b0570f3755ee.jpg"},
    description: String,
    created: {type:Date , default:Date.now},
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]

})
module.exports=mongoose.model("Post",postSchema);