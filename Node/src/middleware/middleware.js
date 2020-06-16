exports.middlewareGlobal = (req,res,next)=>{
    res.locals.errors = req.flash('error')
    res.locals.errorLogin = req.flash('errorLogin')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
    next()
}

exports.checkCRSUF = (err,req,res,next)=>{    
    if(err && err.code === 'EBADCSRFTOKEN')
    return res.render('../views/404')
}
exports.csrfMiddlware= (req,res,next)=>{
    res.locals.csrfToken= req.csrfToken()
    next()   
}      