const User = require('../model/Register')

module.exports = async function (req,res){
  try{  const user = new User(req.body)
    await user.register() 
    if(user.error.length > 0 ){
        req.flash('error', user.error)
        req.session.save(()=>{
           return res.redirect('back')
        })
        return
    }
    req.flash('success', 'Cadastro feito com sucesso. Faça o seu login.' )
    req.session.save(()=>{
           return res.redirect('back')
        })
        
}catch(e){
    res.render('404') 
}
}   