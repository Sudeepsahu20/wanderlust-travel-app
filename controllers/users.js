

const User=require("../models/user");

module.exports.renderSingup=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signUp=async(req,res)=>{
    try{
 const{username,email,password}=req.body;
    const newUser=new User({email,username});
   const registeredUser=await User.register(newUser,password);
   console.log(registeredUser);
   req.login(registeredUser,(err)=>{
      if(err){
        return next(err);
      }
 req.flash("success","User was registered successfully!")
   res.redirect("/listings");
   });
  }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
  }

  module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.userLogin=async(req,res)=>{
        req.flash("success","welcome to wanderlust");
        const redirectUrl = res.locals.redirectUrl || "/listings"; // fallback to /listings
        delete req.session.redirectUrl;
res.redirect(redirectUrl);
}

module.exports.userLogOut=(req,res,next)=>{
   req.logout((err)=>{
    if(err){
       return next(err);
    }
    req.flash("success","You loggedOut succssfully");
    res.redirect("listings")
   })
}