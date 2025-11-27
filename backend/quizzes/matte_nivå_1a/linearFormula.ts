import { QuizComponent, shuffleArray } from "../../imports.ts"

function validateLinearFormel(inputStr:string, userAnswer:string):boolean{
  const [n1, n2] = inputStr.split(' ')
  return `y = ${n1} + ${n2}x` === userAnswer
}

const linearFormel: QuizComponent = function() {
  const n1 = (Math.floor(Math.random()*10)+1)*100
  const n2 = (Math.floor(Math.random()*6)+1)*15

  const answers = [
    `y = ${n2} + x + ${n1}`,
    `y = ${n1}x + ${n2}`,
    `y = ${n2}x`,
    `y = ${n1} + ${n2}x`, // correct
    `y = ${n2}x + ${n1}x`
  ]
  shuffleArray(answers)

  const values = `${n1} ${n2}`

  const html = /*html*/`<form method="POST" action="/quiz/Matte nivå 1a/Linjär formel" class="card" id="quizForm">
    <h1>Förenkla</h1>
    <p>Charlie ska hyra en bil. Startavgiften är ${n1} kr. Dessutom kostar det ${n2} kr för varje mil hon kör. Vilken formel beskriver den totala kostnaden y kr för x mil som Charlie kör?</p>
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

export {linearFormel, validateLinearFormel}