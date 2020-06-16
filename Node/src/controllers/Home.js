const contato =  require('../model/Contatos')

module.exports = async (req,res)=>{
   const contatos = await contato.findUser()
   if(req.session.user) return res.render('user-index',{contatos})
   else return res.render('index')
}
  