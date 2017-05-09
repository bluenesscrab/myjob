var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var movieModel = mongoose.model('movie');



//localhost:3000/admin/add
router.get("/add",function(req,res){
    res.render('control.jade',{
        title:'后台电影添加页',
        movie:{
            title:'电影1',
            director:'史提芬',
            country:'美国', 
            language:'英语',
            year:'2016',
            poster:'http://img31.mtime.cn/mg/2016/06/21/093149.12209704_170X256X4.jpg',
            summary:'填写详情',
            flash:'#'
        }
    });
});


//localhost:3000/admin/list
router.get("/list",function(req,res){
    movieModel.find({},function(err,movies){
        if(err){
            console.log(err);
            return;
        }
        res.render("list.jade",{
            title:"后台电影列表",
            movies:movies
        });
    });
});


//admin/update/1
router.get("/update/:id",function(req,res){
    var id=req.params.id;
    movieModel.findOne({"_id":id},function(err,movie){
        if(err){
            console.log(err);
            return;
        }
        res.render("control.jade",{
            title:"编辑该电影",
            movie:movie
        });
    });

});

//删除页admin/delete
router.get("/delete",function(req,res,next){
    var id=req.query.id;
    movieModel.findOne({"_id":id},function(err,doc){
        if(err){
            console.log('err:',err);
            return;
        }
        if(doc){
            doc.remove();
        }

    });
    res.redirect('/admin/list');
});

//提交处理页：localhost:3000/admin/movie/do
router.post("/movie/do",function(req,res,next){
    //添加和编辑用的是同一个处理页面
    var movieObj = req.body.movie;
    //判断id是否已经存在，已存在则更新数据，否则添加新数据
    if(movieObj._id!=="undefined"){
       //存在id，更新
       movieModel.findOne({"_id":movieObj._id},function(err,doc){
            doc.title=movieObj.title;
            doc.director = movieObj.director;
            doc.country = movieObj.country;
            doc.language = movieObj.language;
            doc.year = movieObj.year;
            doc.poster = movieObj.poster;
            doc.summary = movieObj.summary;
            doc.flash = movieObj.flash;
            doc.save();
       })

    }else{
        //没有id，新增电影
   var movieEntry = new movieModel({
    title:movieObj.title,
    director:movieObj.director,
    country:movieObj.country, 
    language:movieObj.language,
    year:movieObj.year,
    poster:'http://img31.mtime.cn/mg/2016/06/21/093149.12209704_170X256X4.jpg',
    summary:movieObj.summary,
    flash:'http://v.youku.com/v_show/id_XODc4NDY0MjA4.html'
    });
        movieEntry.save();    
    }

    res.redirect('/admin/list');
});

module.exports = router;
