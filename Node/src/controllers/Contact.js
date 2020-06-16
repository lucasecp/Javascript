const Contato = require('../model/Contatos')

exports.index = function (req,res){
    res.render('formContatos',{
        contato: {}
    })  
}
exports.register = async function (req,res){
    const contato = new Contato(req.body)
    try{
      await contato.register()
      if(contato.error.length > 0){
          req.flash('error', contato.error)
          req.session.save(()=>{
              return res.redirect('back')
          })
          return
      }
      req.flash('success','Contato adicionado com sucesso.')
      req.session.save(()=>{
          res.redirect(`/contato/index/${contato.contact._id}`)
      })
    }
    catch(e){
        res.render('404' + e)
    }
}
exports.editIndex = async function(req,res){
    if(!req.params.id) return res.render('404')
    const contato = await Contato.findById(req.params.id)
    if(!contato) return res.render('404')
    res.render('formContatos',{ contato })
}
exports.edit = async function(req,res){
    try{
    if(!req.params.id) return res.render('404')
    const contato = new Contato(req.body)
    await contato.edit(req.params.id)

    if(contato.error.length > 0){
        req.flash('error', contato.error)
        req.session.save(()=>{
            return res.redirect('back')
        })
        return
    }
    req.flash('success','Contato editado com sucesso.')
    req.session.save(()=>{
        res.redirect(`/contato/index/${contato.contact._id}`)
    })
    }catch(e){
       return res.rednder('404')
    }
}
exports.drop = async function(req,res){
    if(!req.params.id) return res.render('404')
    const contato = await Contato.delete(req.params.id)
    if(!contato) return res.render('404')

   req.flash('success','Contato editado com sucesso.')
    req.session.save(()=>{
        res.redirect(`back`)
    })
}
