const btn = document.querySelector('.btn')
const result = document.querySelector('.resultado')
const json = '../person.json'

// Lançando números aleatórios de 0 a 24
 function rand(){  
  const id = Math.random() * 24
  return Math.floor(id)
}

btn.addEventListener('click',()=>{
  return requestValues()
})

// Vinculando o id do arquivo json com o número aleatório
async function requestValues(){
   try{
    const idRandom = rand()
    const req = await fetch(json)

    if(req.status !== 200) throw new Error(req.status)

    const res = await req.json()
    const person = res.persons

    for(let personId of person){

      if(idRandom === personId.id) {

      result.innerText = personId.name

      stylePerson(personId.id)

      }

     }
  }catch(e){
      console.log(e)
    }
}

//Atribuindo estilos a um grupo determinado de id 
function stylePerson(id){
  if(id <= 5 )  result.style.background ='rgb(70, 190, 246)'

  else if  (id > 5 && id <= 10 ) result.style.background ='rgb(146, 243, 101)'
  
  else if(id > 10 && id <= 16)  result.style.background = 'rgb(246, 91, 70)'

  else if(id > 16) result.style.background ='#0ff'
}



/*function requestValues(){
   const idRandom = rand()
   fetch(json)
   .then(res=> {
     if(res.status !== 200) throw new Error( res.status)
     return res.json()
    } )
   .then(res=>{
    const person = res.persons

    for(let values of person){
    if(idRandom === values.id) result.innerHTML = values.name
   }
  }).catch(e=>{
    console.log(e)
  })
}*/
