const User = require('../model/Register')

exports.login = async function (req,res){
    try{  
        const login = new User(req.body)
        await login.login()
        if(login.error.length > 0 ){
            req.flash('errorLogin', login.error)
            req.session.save(()=>{
               return res.redirect('back')
            })
            return
        }
         req.session.user = login.user
            req.session.save(()=>{
                return res.redirect('back')
            })
        
    }catch(e) {
        return res.render('404' + e)
    }
}
exports.logout= function (req,res){
    req.session.destroy()
    return res.redirect('/')
}
