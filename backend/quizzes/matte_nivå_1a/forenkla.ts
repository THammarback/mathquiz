import { QuizComponent } from "../../imports.ts"

function validateForenkla(inputStr:string, userAnswer:string):boolean{
  const [n1, n2, n3, n4, n5] = inputStr.split(' ').map(Number)
  const correctAnswers = [`${n1+n3*n4}x+${n2+n3*n5}`, `${n2+n3*n5}+${n1+n3*n4}x`]
  return correctAnswers.includes(userAnswer.replaceAll(/\s/g, '').toLowerCase())
}


const forenkla: QuizComponent = function() {
  const n1 = Math.floor(Math.random()*5)+2
  const n2 = Math.floor(Math.random()*8)+1
  const n3 = Math.floor(Math.random()*3)+2
  const n4 = Math.floor(Math.random()*7)+2
  const n5 = Math.floor(Math.random()*8)+1

  const values = `${n1} ${n2} ${n3} ${n4} ${n5}`
  
  const html = /*html*/`<form method="POST" action="/quiz/Matte nivå 1a/Förenkla" class="card" id="quizForm">
    <h1>Förenkla</h1>
    <p>Förenkla uttrycket: ${n1}x + ${n2} + ${n3}(${n4}x + ${n5}) så långt som möjligt.</p>
    <div class="form-group">
      <label for="username">Svar:</label>
      <input type="text" id="svar" name="svar" placeholder="" required>
    </div>
    <button type="submit" class="btn-primary">Svara</button>
  </form>`
  return {values, html}
}

export {forenkla, validateForenkla}