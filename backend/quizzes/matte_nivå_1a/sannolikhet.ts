import { QuizComponent, shuffleArray } from "../../imports.ts"

function validateSannolikhet(inputStr:string, userAnswer:string):boolean{ 
  const [gul, blå] = inputStr.split(' ').map(Number)
  return userAnswer === `${gul}/${gul+blå}×${gul-1}/${gul+blå-1}`
}


const sannolikhet: QuizComponent = function(){
  const gul = Math.floor(Math.random()*8)+3
  const blå = Math.floor(Math.random()*8)+3
  const values = `${gul} ${blå}`
  
  const answers = [
    `${gul}/${gul+blå}×${gul}/${gul+blå}`,
    `${gul}/${gul+blå}×${gul-1}/${gul+blå}`,
    `${gul}/${gul+blå}×${gul}/${gul+blå-1}`,
    `${gul}/${gul+blå}×${gul-1}/${gul+blå-1}`,
    `${blå}/${gul+blå}×${gul}/${gul+blå-1}`
  ]
  shuffleArray(answers)

  const html = /*html*/`<form method="POST" action="/quiz/Matte nivå 1a/Sannolikhet" class="card" id="quizForm">
    <h1>Faktorisera</h1>
    <p>Lena har en påse med ${gul} gula och ${blå} blå stenar. Hon tar två stycken stenar utan att titta vilken färg de har. Vilken beräkning kan användas för att bestämma sannolikheten för att hon tar två gula stenar?</p>
     <div class="form-group radio">
        <input type="radio" id="svarA" name="svar" value="${answers[0]}">
        <label for="svarA">${answers[0]}</label><br>

        <input type="radio" id="svarB" name="svar" value="${answers[1]}">
        <label for="svarB">${answers[1]}</label><br>

        <input type="radio" id="svarC" name="svar" value="${answers[2]}">
        <label for="svarC">${answers[2]}</label><br>

        <input type="radio" id="svarD" name="svar" value="${answers[3]}">
        <label for="svarD">${answers[3]}</label><br>

        <input type="radio" id="svarE" name="svar" value="${answers[4]}">
        <label for="svarE">${answers[4]}</label><br>
    </div>
    <button type="submit" class="btn-primary">Svara</button>
  </form>`
  return {values, html}
}

export {sannolikhet, validateSannolikhet}