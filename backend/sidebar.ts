import { Database, QuizStructure , localeOptions} from "./imports.ts";

export function sidebar(username: string, quizStructure: QuizStructure) {
  let sidebarContent = "";
  const now = new Date()
  for (const className of Object.keys(Database[username].groups)) {
    if (className in quizStructure) {
      let lists = ""
      for (const quizName of Object.keys(quizStructure[className])) {
        let span = ""
        let star = Database[username].groups[className][quizName]
        if(quizStructure[className][quizName].opens.getTime() > now.getTime()){
          span += `<p>Öppnar ${quizStructure[className][quizName].opens.toLocaleString('sv-SE', localeOptions)}</p>`
          star = '🔒'
        }else if(quizStructure[className][quizName].closes.getTime() > now.getTime()){
          if(Database[username].groups[className][quizName] !== "⭐"){
            star = '📢'
            span += `<p>Stänger ${quizStructure[className][quizName].closes.toLocaleString('sv-SE', localeOptions)}</p>`
          }
        }
        lists += `<li><a href="/quiz/${className}/${quizName}"><span>${star}${quizName}</span>${span}</a></li>`;
      }
      sidebarContent += `
        <div class="category-group">
            <div class="category-header">
                <a href="/quiz/${className}" class="category-link">${className}</a>
                <button type="button" class="toggle-btn" aria-label="Toggle list">
                    <span class="arrow">▼</span>
                </button>
            </div>
            
            <ol class="category-list">${lists}</ol>
        </div>`
    } else {
      console.log(`User ${username} is assigned to class ${className} which does not exists (${Object.keys(quizStructure).join(', ')})`);
    }
  }
  return /*html*/ `
    <nav class="sidebar">
      <aside>
        <div>
          <a href="/"><h1>Math Quiz!</h1></a>
        </div>
        <div>${sidebarContent}</div>
      </aside>
      <a href="/settings">Inställningar ⚙️</a>
      </nav>
  `;
}