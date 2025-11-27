import { setCookie, deleteCookie } from "jsr:@std/http/cookie";
import { verifyAuth, login} from "./authentication.ts"
import { COOKIE_NAME, Database, isUserPass, quizStructure } from "./imports.ts";

import { sidebar } from "./sidebar.ts";
import { loginForm } from "./loginForm.ts";
import { quizRoute } from "./quizzes/route.ts";

const layout = await Deno.readTextFile('./backend/layout.html');
const scriptJs = await Deno.readTextFile('./script.js')
const css = await Deno.readTextFile("./style.css");
const favicon: Uint8Array = await Deno.readFile("./favicon.ico");

async function authRoutes(req:Request, url:URL): Promise<Response | false>{
  if (req.method === "POST" && url.pathname === "/login") {
    const userPass = Object.fromEntries(new URLSearchParams(await req.text()))

    if(!isUserPass(userPass)){
      return new Response(layout
        .replace("{{CONTENT}}", loginForm("Missing credentials"))
        .replace("{{SIDEBAR}}", ""), { status: 401, headers: { "content-type": "text/html; charset=utf-8" }});
    }
    const {error, msg} = await login(userPass);
    if(error){
      return new Response(layout
        .replace("{{CONTENT}}", loginForm("Invalid credentials"))
        .replace("{{SIDEBAR}}", ""), { status: 401, headers: { "content-type": "text/html; charset=utf-8" }});
    }

    const headers = new Headers();
    setCookie(headers, {name: COOKIE_NAME, value: msg, maxAge: 60 * 60 * 24, httpOnly: true, sameSite: "Lax", path: "/", secure: false});
    headers.set("Location", "/");
    return new Response("Logged in successfully", { status: 303, headers });
  }

  if(req.method === "GET" && url.pathname === "/login") {
    return new Response(layout
      .replace("{{CONTENT}}", loginForm())
      .replace("{{SIDEBAR}}", ""),
      { status: 200, headers: { "content-type": "text/html; charset=utf-8" }});
  }

  if (req.method === "GET" && url.pathname === "/logout") {
    const headers = new Headers();
    deleteCookie(headers, COOKIE_NAME, { path: "/" });
    headers.set("Location", "/login");
    return new Response("Logged out", {status: 303, headers});
  }
  return false
}

function staticRoutes(req:Request, url:URL): Response | false {
  if (req.method === "GET" && url.pathname === "/styles.css") {
    return new Response(css, { headers: { "content-type": "text/css" } });
  }
  if (req.method === "GET" && url.pathname === "/script.js") {
    return new Response(scriptJs, {status: 200, headers: {"content-type": "text/javascript"}});
  }
  if (req.method === "GET" && url.pathname === "/favicon.ico") {
    return new Response(favicon, {
      headers: {"content-type": "image/x-icon","content-length": favicon.byteLength.toString()},
    })
  }
  return false
}



async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const authRoute = await authRoutes(req, url)
  if(authRoute){
    return authRoute
  }
  const staticRoute = staticRoutes(req, url)
  if(staticRoute){
    return staticRoute
  }

  const payload = await verifyAuth(req);
  if (payload === null || !("username" in payload)) {
    const headers = new Headers();
    headers.set("Location", "/login");
    return new Response("Unauthorized - Please Log In", { status: 303, headers});
  }
  const username:string = payload.username as string


  const res = await quizRoute(req, url, username)
  if(res.ok){
    if("html" in res){
      return new Response(layout.replace("{{CONTENT}}", res.html).replace("{{SIDEBAR}}", sidebar(username, quizStructure)),
      { status: 200, headers:{"content-type": "text/html; charset=utf-8"} });
    }else if(res.result){
      return new Response(JSON.stringify({correct:true}), {status:200, headers:{"content-type": "application/json"}})
    }else{
      return new Response(JSON.stringify({correct:false}), {status:200, headers:{"content-type": "application/json"}})

    }
  }

  if (req.method === "GET" && url.pathname === "/") {
    const now = new Date()
    const quizzes = Object.entries(Database[username].groups).reduce<string[]>((acc, [className, quiz]) =>{
      for(const [quizName, status] of Object.entries(quiz)){
        if(quizStructure[className][quizName].opens.getTime() < now.getTime() && 
          quizStructure[className][quizName].closes.getTime() > now.getTime() &&
          status !== "⭐"
        ){
          acc.push(`<li><a href="/quiz/${className}/${quizName}">${quizName} (${className})</a></li>`)
        }
      }
      return acc
    }, [])
    const quizHtml = (quizzes.length === 0
      ? "<p>Det finns inga fler nya Quiz! ⭐ <br> Du kan fortfarande göra om gamla quiz.</p>"
      : `<p>Öppna quiz:</p><ol>${quizzes.join('')}</ol>`
    )
    
    return new Response(layout.replace("{{CONTENT}}",
      `<div class="card"><h2>Hej, ${payload.username}!</h2>${quizHtml}</div>`).replace("{{SIDEBAR}}", sidebar(username, quizStructure)), 
      { status: 200, headers:{"content-type":"text/html"} }
    );
  }

  return new Response(layout.replace("{{CONTENT}}", "Page not found. 404").replace("{{SIDEBAR}}", ""), { status: 404, headers:{"content-type": "text/html; charset=utf-8"} });
}

// --- START SERVER ---
console.log("Server running on http://localhost:8000");
Deno.serve({ port: 8000 }, handler);