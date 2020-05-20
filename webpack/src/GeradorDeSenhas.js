import './assets/css/style.css'

function GeradorSenha(){
    const result = document.querySelector('.password')
    const inputText = document.querySelector('[name="quantidade"]')
    const btn = document.querySelector('button')

    const letrasMinuscula = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const letrasMaiuscula = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

    this.iniciar = () =>{
        btn.onclick = ()=>{
            this.gerarSenha()
        }
    }
    this.gerarSenha = ()=>{
      let qtdMax= Number(inputText.value)
      let senha = []


      const checked1 = document.querySelector('[name="numeros"]')
      const checked2 = document.querySelector('[name="letraMai"]')
      const checked3 = document.querySelector('[name="letraMin"]')
    
      for(let i= 0 ; i < qtdMax;i++){
        //gerando números de 0 a 26
           let letraAleatoria = Math.floor( Math.random()  * 26 )
           let letraAleatoria2 = letraAleatoria

           checked1.checked && senha.push(Math.floor( Math.random()  * 9 )) 

           checked2.checked && senha.push(this.gerarLetra(letraAleatoria,letrasMaiuscula))

           checked3.checked && senha.push(this.gerarLetra(letraAleatoria2,letrasMinuscula)) 
      }
      
      result.innerHTML = senha.join('').slice(0,qtdMax)
    }
    //gerando a letra a partir da letraAleatória
    this.gerarLetra = (idLetra,letra)=>{
      for(let i=0;i< 26;i++)
      if(i=== idLetra) return letra[i]
    }


}
const novaSenha = new GeradorSenha()
novaSenha.iniciar()