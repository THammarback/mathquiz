import { QuizComponent } from "../../imports.ts"

function validateFaktorisera(inputStr:string, userAnswer:string):boolean{
  const [n1, n2, n3] = inputStr.split(' ')
  const correctAnswers = [`${n1}(${n2}x+${n3})`, `${n1}(${n3}+${n2}x)`, `(${n2}x+${n3})${n1}`, `(${n3}+${n2}x)${n1}`]
  return correctAnswers.includes(userAnswer.replaceAll(/\s/g, ''))
}

const faktorisera: QuizComponent = function(){
  const n1 = Math.floor(Math.random()*5)+3
  let n2, n3;
  do{
    n2 = Math.floor(Math.random()*4)+2
    n3 = (Math.floor(Math.random()*4)+1)*2+1
  } while(n2 === n3)
  const values = `${n1} ${n2} ${n3}`

  const html = /*html*/`<form method="POST" action="/quiz/Matte nivå 1a/Faktorisera" class="card" id="quizForm">
    <h1>Faktorisera</h1>
    <p>Faktorisera uttrycket: ${n1*n2}x+${n3*n1} genom att bryta ut största möjliga faktor</p>
    <div class="form-group">
      <label for="username">Svar:</label>
      <input type="text" id="svar" name="svar" placeholder="" required>
    </div>
    <button type="submit" class="btn-primary">Svara</button>
  </form>`
  return {values, html}
}

export {faktorisera, validateFaktorisera}