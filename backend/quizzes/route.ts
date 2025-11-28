import { Database, quizStructure, localeOptions } from "../imports.ts";
import { leaderboard } from "../leaderboard.ts"

export async function quizRoute(req:Request, url:URL, username:string): Promise<{ok:true, html:string} | {ok:true, result:boolean} | {ok:false}> {
    if(!url.pathname.startsWith('/quiz')){
        return {ok:false}
    }
    const [_1, _2, className, quiz] = decodeURI(url.pathname).split('/')
    if(!(className in quizStructure)){
        return {ok:false}
    }
    if(!(className in Database[username].groups)){
        return {ok:false}
    }
    if(quiz === undefined){
        return {ok:true, html:leaderboard(username, className)}
    }
    
    if(!(quiz in quizStructure[className])){
        return {ok:false}
    }

    if(req.method === "GET"){
        if((new Date()).getTime() < quizStructure[className][quiz].opens.getTime()){
            return {ok:true, html:`Quiz:et öppnar ${quizStructure[className][quiz].opens.toLocaleString('sv-SE', localeOptions)}`}
        }
        const {values, html} = quizStructure[className][quiz].component()
        Database[username].currentValues = values
        return {ok:true, html}
    }
    if(req.method === "POST"){
        if(quizStructure[className][quiz].validate(Database[username].currentValues, await req.text())){
            if((new Date()).getTime() < quizStructure[className][quiz].closes.getTime()){
                Database[username].groups[className][quiz] = '⭐'
            }else if(Database[username].groups[className][quiz] === "• "){
                Database[username].groups[className][quiz] = '✅'
            }
            return {ok:true, result:true}
        }else{
            return {ok:true, result:false}
        }
    }
    return {ok:false}
}
