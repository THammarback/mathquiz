import { Database } from "./imports.ts"; 

export function leaderboard(username: string, className:string) {
    return /*HTML*/`<div class="card">${Object.entries(database).reduce<string>((acc, [currentName, {groups}])=>{
    if(className in groups){
        acc += `
            <div class="user-line ${username===currentName ? "highlight" : ""}">
                <span>${currentName}</span>
                <span>${Object.values(database[currentName].groups[className]).filter(x => x === '⭐' || x === '✅').join('')}</span>
            </div>`
    }
    return acc
    }, "")}</div>`
}
