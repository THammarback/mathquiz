import { QuizComponent } from "../../imports.ts"

const constantMap:Record<number, number[]> = {
  2:[4, 5, 8, 10, 12],
  3:[2, 3, 5, 6, 12],
  4:[2, 5, 6, 8, 10],
  5:[1, 2, 4, 5, 10],
  6:[2, 3, 4, 8, 12],
  7:[2, 7, 10, 14, 21],
  8:[2, 4, 5, 6, 10],
  9:[2, 3, 4, 6, 12],
  10:[2, 4, 5, 8, 10],
  11:[2, 4, 5, 10, 11],
  12:[2, 3, 4, 6, 10],
  13:[2, 4, 5, 10, 13],
  14:[2, 4, 5, 7, 10],
  15:[2, 3, 5, 6, 12],
  16:[2, 4, 5, 8, 10],
  17:[2, 4, 5, 10, 17],
  18:[3, 4, 5, 6, 12],
  19:[2, 4, 5, 10, 19]
}

function validateStraightLine(inputStr:string, answer:string):boolean{
  const [k, kSign, m, mSign] = inputStr.split(' ').map(Number)
  const [A,B,C,D] = answer.replaceAll(/\s/g, '').toLowerCase().split('£')
  console.log(A,B,C,D)
  console.log(m*mSign, -m/k*mSign*kSign, k*kSign, m*mSign)

  return Number(A) === m*mSign && Number(B) === -m/k*mSign*kSign && Number(C) === k*kSign && Number(D) !== m*mSign
} 


const straightLine: QuizComponent = function(){
  const rand1 = Math.floor(Math.random()*18)+2
  const rand2 = Math.floor(Math.random()*5)

  const k = constantMap[rand1][rand2]
  const kSign = (Math.random() > 0.5 ? 1:-1)
  const m = rand1
  const mSign = (Math.random() > 0.5 ? 1:-1)
  
  const values = `${k} ${kSign} ${m} ${mSign}`
  const html = /*html*/`<form method="POST" action="/quiz/Matte nivå 2a/Rät linje" class="card" id="quizForm">
    <h1>Rät linje</h1>
    <p>En rät linje med ekvationen y = ${kSign>0?'':'-'}${k}x ${mSign>0?'+':'-'} ${m} är ritad i ett koordinatsystem.</p>
    <div class="form-group">
      <label for="svarA">A) Vilket värde har y då linjen skär y-axeln?</label>
      <input type="text" id="svarA" name="svarA" placeholder="" required>

      <label for="svarB">B) Vilket värde har x då linjen skär x-axeln?</label>
      <input type="text" id="svarB" name="svarB" placeholder="" required>

      <label for="svarC">C) Ge ett exempel på en linje som är parallell med linjen y = ${kSign>0?'':'-'}${k}x ${mSign>0?'+':'-'} ${m}</label>
      <span>
        y=<input type="text" id="svarC" name="svarC" placeholder="" required>x+<input type="text" id="svarD" name="svarD" placeholder="" required>
      </span>

    </div>
    <button type="submit" class="btn-primary">Svara</button>
  </form>`
  return {html, values}
}
export {straightLine, validateStraightLine}