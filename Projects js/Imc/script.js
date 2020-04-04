
function validar (){
    const peso = document.querySelector('.peso')
    const altura = document.querySelector('.altura')
    const msg = document.querySelector('.msg')
    msg.style.color = 'red'

  
    if(!peso.value || !altura.value) return msg.innerHTML= 'Os dois campos são obrigatórios!'

    if(isNaN(peso.value) || isNaN(altura.value)) return msg.innerHTML= 'Os campos precisam ser numéricos!'

    else calcular(peso,altura,msg)
}


function calcular(peso,altura,msg){

    const imc = peso.value / (altura.value * 2)
    Number.parseFloat(imc)

    msg.style.color='blue'

    if(imc > 39.9 && imc <= 80) return msg.innerHTML = `Seu IMC é ${imc.toFixed(2)} (Obesidade Grau 3)`
    if(imc >= 34.9 && imc < 39.9 ) return msg.innerHTML = `Seu IMC é ${imc.toFixed(2)} (Obesidade Grau 2)`
    if(imc >= 29.9 && imc < 34.9 ) return msg.innerHTML = `Seu IMC é ${imc.toFixed(2)} (Obesidade Grau 1)`
    if(imc >= 24.9 && imc < 29.9) return msg.innerHTML = `Seu IMC é ${imc.toFixed(2)} (Acima do peso)`
    if(imc >= 18.5 && imc < 24.9) return msg.innerHTML = `Seu IMC é ${imc.toFixed(2)} (Peso normal)`
    if(imc < 18.5 && imc > 7) return msg.innerHTML = `Seu IMC é ${imc.toFixed(2)} (Abaixo do peso)`

    else msg.innerHTML = 'IMC inválido'
}