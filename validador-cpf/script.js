function validar(cpf){
    if (typeof cpf !== 'string') return console.log('error')
    let cpfLimpo = cpf.replace(/\D+/g,'')
    const arrayCpf = cpfLimpo.split('')
    const doisDigitos = arrayCpf.splice(-2)
   
    const digito = Array.from(cpfLimpo.slice(0,9))
    const digito2 = Array.from(cpfLimpo.slice(0,10))
    

   let contador = 10
   let contador2 = 11
    
    const calculo = digito.reduce((ac,val) =>{
      ac += (Number(val) * contador)
      --contador
      return ac
    },0)

     const calculo2 = digito2.reduce((ac,val) =>{
      ac += (Number(val) * contador2)
      --contador2
      return ac
    },0)
   

    const result = 11 - (calculo % 11)
    const result2 = 11 - ( calculo2 % 11)
    let valores = [result,result2]
    
    // digito maior que 10 seta 0
      for(let i=0;i<= valores.length;i++){
      if (valores[i]>=10) valores[i] = 0
    }
    
    const cpfValido= valores.join('') === doisDigitos.join('')


    if (cpfValido) return console.log(true)
    
    else return console.log(false)
} 
