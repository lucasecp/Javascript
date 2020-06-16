const mongoose = require('mongoose')
const validator= require('validator')
const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {type:String}, 
    email: {type:String,required: true},
    password:{type:String,required:true}
})

const userModel = mongoose.model('User',userSchema)

class User {
    constructor(body){
        this.body = body
        this.error = []
        this.user = null
    } 
    async login(){
        this.user = await userModel.findOne({email: this.body.email})
        if(!this.user) {
            this.error.push('Usuário não existe.')
            return
       }
        if(!validator.isEmail(this.body.email)) this.error.push('Email inválido.')
        if(this.error.length > 0) return


        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.error.push('Senha inválida')
            this.user = null
            return
        }
    }


    async register (){
        this.validar()
        if(this.error.length > 0) return

        await this.userExists()
        if(this.error.length > 0) return

        const salt = await bcryptjs.genSalt()
        this.body.password = bcryptjs.hashSync(this.body.password,salt)

        this.user = await userModel.create(this.body)
   
    }
    async userExists(){
        this.user = await userModel.findOne({email: this.body.email})
        if(this.user) this.error.push('Usuário já cadastrado.')
    }
    validar(){
      this.clearUp()

      if(!validator.isEmail(this.body.email)) this.error.push('Email inválido.')
      if(this.body.password.length < 6 || this.body.password.length > 30) this.error.push('A senha deve ter no mínimo 6 a 30 caracteres.')

    }
    clearUp(){
       for(let i in this.body){
           if(typeof this.body[i] !== 'string')
           this.body[i] = ''
       }
        this.body = {
            name: this.body.name,
            email : this.body.email,
            password: this.body.password
          }
    }

}
module.exports = User