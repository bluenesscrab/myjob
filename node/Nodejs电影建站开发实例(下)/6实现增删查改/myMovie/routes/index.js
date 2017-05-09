var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var movieModel = mongoose.model('movie');


//首页localhost:3000/
router.get('/', function(req, res, next) {
    movieModel.find({},function(err,movies){
        if(err){
            console.log(err);
            return;
        }
        res.render('index.jade',{
               title:'网站首页',
               movies:movies 
        });
    });
});


//详情页
//localhost:3000/movie/1
router.get("/movie/:id",function(req,res){
    var id=req.params.id;
    movieModel.findOne({"_id":id},function(err,movie){
        if(err){
            console.log(err);
            return;
        }
        res.render("detail.jade",{
            title:"电影详情",
            movie:movie
        });
    });

});

module.exports = router;
