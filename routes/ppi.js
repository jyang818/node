var express = require('express');
var router = express.Router();
var user = require('../model/user')

/* GET home page. */
router.post('/login', function(req, res, next) {
	console.log(req.body)
	user.find({username:req.body.username,password:req.body.password},function(error,info){
		if(info.length>0){
			req.session.userlogin=info[0]
			res.send({result:true,message:"登陆成功"})
		}else{
			res.send({result:false,message:"用户名或者密码错误"})
		}
	})
});
router.post('/register', function(req, res, next) {
	console.log(req.body)
	user.find({username:req.body.username},function(error,info){
		if(info.length==0){
			user.create({username:req.body.username,password:req.body.password},function(error,info){

				if(!error){
					res.send({result:true,message:"注册成功"})
				}
			})
		}else{
			res.send({result:false,message:"用户名已经存在"})
		}

	})
});


router.get('/my',function(req,res,next){
	res.send(req.session.userlogin)
})

router.get('/unlog',function(req,res,next){
	req.session.destroy(function(error,info){
		if(!error){
			res.send({result:true})
		}
	})

})

module.exports = router;
