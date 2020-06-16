const mongoose = require('mongoose')
const validator= require('validator')

const schemaContact = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:false},
    phone: {type: Number, required:true},
    date:{type: Date, default:Date.now}
})
const modelContact = mongoose.model('contato', schemaContact)

function Contato (body){
    this.body = body
    this.error = []
    this.contact = null
}
Contato.prototype.register = async function (){
    this.validar()
    if(this.error.length > 0) return

    this.contact = await modelContact.create(this.body)
}

Contato.prototype.validar = function (){
    this.clearUp()
    if(this.body.email && !validator.isEmail(this.body.email))    this.error.push('Email inválido.')
          
    if(!this.body.phone)   this.error.push('Campo telefone obrigatório.')
    if(!this.body.name)  return this.error.push('Campo nome obrigatório.')
    if(!this.body.phone && !this.body.email)  return this.error.push('Ao menos um campo de email ou telefone deve ser preenchido')
}


Contato.prototype.clearUp = function (){
    for(let i in this.body){
        if(typeof this.body[i] !== 'string')
        this.body[i] = ''
    }

    this.body = {
        name: this.body.name,
        email: this.body.email,
        phone: this.body.phone
    }
}
Contato.findById = async function(id){
    const user = await modelContact.findById(id)
    if(typeof id !== "string") return
    return user
}
Contato.prototype.edit = async function(id){
    if(typeof id !== 'string') return
    this.validar()
    if(this.error.length > 0) return;
    this.contact = await modelContact.findByIdAndUpdate(id,this.body,{new:true})
}
Contato.findUser = async function(){
    const contatos = await modelContact.find()
    .sort({name: 1})

    return contatos
}
Contato.delete = async function(id){
    if(typeof id !== 'string') return
    const contato = await modelContact.findOneAndDelete({_id:id})
    return contato
}

module.exports= Contato