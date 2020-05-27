exports.checkCRSUF = (err,req,res,next)=>{
    if(err && err.code === 'EBADCSRFTOKEN')
    return res.render('../views/404')
}
exports.csrfMiddlware= (req,res,next)=>{
    res.locals.csrfToken= req.csrfToken()
    next()   
}      