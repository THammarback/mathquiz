import { QuizComponent } from "../../imports.ts"

function validateVolym(inputStr:string, userAnswer:string):boolean{
    if(userAnswer.toLowerCase().endsWith("dl")){
        return Number(inputStr)*2 === Number(userAnswer.substring(0, userAnswer.length-2).trim())*10
    }
    return Number(inputStr)*2 === Number(userAnswer)*10
}

const volym: QuizComponent = function(){
  const n1 = Math.floor(Math.random()*8)+3
  const values = n1.toString()

  const html = /*html*/`<form method="POST" action="/quiz/Matte nivå 1a/Volym" class="card" id="quizForm">
    <h1>Faktorisera</h1>
    <p>Volymen för ett kaffemått är lika stor som en matsked och en tesked tillsammans. Hur många deciliter motsvarar ${n1} kaffemått</p>
    <table>
        <tr><td>Matsked</td><td>15 ml</td></tr>
        <tr><td>Tesked</td><td>5 ml</td></tr>
        <tr><td>kryddmått</td><td>1 ml</td></tr>
    </table>
    <div class="form-group">
      <label for="username">Svar:</label>
      <input type="text" id="svar" name="svar" placeholder="" required>
    </div>
    <button type="submit" class="btn-primary">Svara</button>
  </form>`
  return {values, html}
}

export {volym, validateVolym}