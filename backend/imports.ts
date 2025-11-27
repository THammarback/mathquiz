import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import {forenkla, validateForenkla} from "./quizzes/matte_nivå_1a/forenkla.ts";
import {linearFormel, validateLinearFormel} from "./quizzes/matte_nivå_1a/linearFormula.ts"
import {faktorisera, validateFaktorisera} from "./quizzes/matte_nivå_1a/faktorisera.ts";
import { straightLine, validateStraightLine } from "./quizzes/matte_nivå_2a/straightLine.ts";
import { validateVolym, volym } from "./quizzes/matte_nivå_1a/volym.ts";
import { sannolikhet, validateSannolikhet } from "./quizzes/matte_nivå_1a/sannolikhet.ts";

export const JWT_KEY = await crypto.subtle.generateKey({ name: "HMAC", hash: "SHA-512" }, true, ["sign", "verify"]);
export const COOKIE_NAME = "auth_token";

export const localeOptions: Intl.DateTimeFormatOptions = {
  day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: 'CET'
};

export type Groups = Record<string, Record<string, "• " | "⭐" | "✅" | "🔒" | "📢">>

export type QuizComponent = () => {values: string, html:string}
export type QuizStructure = Record<string, Record<string, {validate: (inputStr:string, answer:string)=>boolean,component:QuizComponent, opens:Date, closes:Date}>>

export function isGroups(x:unknown): x is Groups {
  return typeof x === "object" && x !== null &&
  Object.entries(x).every(([key, value]) => Object.keys(quizStructure).includes(key) && typeof value === "number")
}

export function shuffleArray<T>(array:T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export interface UserData {
  password: string;
  groups: Groups;
  currentValues: string;
}
export interface UserPass {
  username:string;
  password:string;
}

export function isUserPass(x:unknown): x is UserPass{
  return (typeof x === "object" && x !== null && "username" in x && "password" in x && typeof x.username === "string" && typeof x.password === "string")
}

export const Database: Record<string, UserData> = {
  "Alice":  {password:await bcrypt.hash("password"), groups:{"Matte nivå 1a":{"Förenkla":"• ", "Faktorisera":"• ", "Linjär formel":"• ", "Volym": "• ", "Sannolikhet": "• "}, "Matte nivå 2a":{"Rät linje": "• "}}, currentValues:"Default Answer?"},
  "Bob":    {password:await bcrypt.hash("password"), groups:{"Matte nivå 1a":{"Förenkla":"• ", "Faktorisera":"• ", "Linjär formel":"• ", "Volym": "• ", "Sannolikhet": "• "}, "Matte nivå 2a":{"Rät linje": "• "}}, currentValues:"Default Answer?"},
  "Charlie":{password:await bcrypt.hash("password"), groups:{"Matte nivå 1a":{"Förenkla":"• ", "Faktorisera":"• ", "Linjär formel":"• ", "Volym": "• ", "Sannolikhet": "• "}, "Matte nivå 2a":{"Rät linje": "• "}}, currentValues:"Default Answer?"},
  "David":  {password:await bcrypt.hash("password"), groups:{"Matte nivå 1a":{"Förenkla":"• ", "Faktorisera":"• ", "Linjär formel":"• ", "Volym": "• ", "Sannolikhet": "• "}, "Matte nivå 2a":{"Rät linje": "• "}}, currentValues:"Default Answer?"},
  "Eva":    {password:await bcrypt.hash("password"), groups:{"Matte nivå 1a":{"Förenkla":"• ", "Faktorisera":"• ", "Linjär formel":"• ", "Volym": "• ", "Sannolikhet": "• "}, "Matte nivå 2a":{"Rät linje": "• "}}, currentValues:"Default Answer?"},
  "Frank":  {password:await bcrypt.hash("password"), groups:{"Matte nivå 1a":{"Förenkla":"• ", "Faktorisera":"• ", "Linjär formel":"• ", "Volym": "• ", "Sannolikhet": "• "}, "Matte nivå 2a":{"Rät linje": "• "}}, currentValues:"Default Answer?"},
  "Göte":   {password:await bcrypt.hash("password"), groups:{"Matte nivå 1a":{"Förenkla":"• ", "Faktorisera":"• ", "Linjär formel":"• ", "Volym": "• ", "Sannolikhet": "• "}, "Matte nivå 2a":{"Rät linje": "• "}}, currentValues:"Default Answer?"},
  "Hugo":   {password:await bcrypt.hash("password"), groups:{"Matte nivå 1a":{"Förenkla":"• ", "Faktorisera":"• ", "Linjär formel":"• ", "Volym": "• ", "Sannolikhet": "• "}, "Matte nivå 2a":{"Rät linje": "• "}}, currentValues:"Default Answer?"},
  "Iris":   {password:await bcrypt.hash("password"), groups:{"Matte nivå 1a":{"Förenkla":"• ", "Faktorisera":"• ", "Linjär formel":"• ", "Volym": "• ", "Sannolikhet": "• "}, "Matte nivå 2a":{"Rät linje": "• "}}, currentValues:"Default Answer?"},
  "Jasmin": {password:await bcrypt.hash("password"), groups:{"Matte nivå 1a":{"Förenkla":"• ", "Faktorisera":"• ", "Linjär formel":"• ", "Volym": "• ", "Sannolikhet": "• "}, "Matte nivå 2a":{"Rät linje": "• "}}, currentValues:"Default Answer?"},
  "Kevin":  {password:await bcrypt.hash("password"), groups:{"Matte nivå 1a":{"Förenkla":"• ", "Faktorisera":"• ", "Linjär formel":"• ", "Volym": "• ", "Sannolikhet": "• "}, "Matte nivå 2a":{"Rät linje": "• "}}, currentValues:"Default Answer?"},
  "Lucas":  {password:await bcrypt.hash("password"), groups:{"Matte nivå 1a":{"Förenkla":"• ", "Faktorisera":"• ", "Linjär formel":"• ", "Volym": "• ", "Sannolikhet": "• "}, "Matte nivå 2a":{"Rät linje": "• "}}, currentValues:"Default Answer?"},
  "Martin": {password:await bcrypt.hash("password"), groups:{"Matte nivå 1a":{"Förenkla":"• ", "Faktorisera":"• ", "Linjär formel":"• ", "Volym": "• ", "Sannolikhet": "• "}, "Matte nivå 2a":{"Rät linje": "• "}}, currentValues:"Default Answer?"},
}

const now = new Date()

export const quizStructure: QuizStructure = {
  "Matte nivå 1a":{
    "Volym":{validate:validateVolym, component:volym, opens:new Date(now.getTime() - 2*24*3600000), closes: new Date(now.getTime() - 24*3600000)},
    "Linjär formel":{validate:validateLinearFormel, component:linearFormel, opens:new Date(now.getTime() - 2*24*3600000), closes: new Date(now.getTime() - 24*3600000)},
    "Sannolikhet":{validate:validateSannolikhet, component:sannolikhet, opens:new Date(now.getTime() - 2*24*3600000), closes: new Date(now.getTime() - 24*3600000)},
    "Förenkla":{validate:validateForenkla, component:forenkla, opens:now, closes: new Date(now.getTime() + 24*3600000)},
    "Faktorisera":{validate:validateFaktorisera, component:faktorisera, opens: new Date(now.getTime() + 24*3600000), closes:new Date(now.getTime() + 2*24*3600000)}
  },
  "Matte nivå 2a":{
    "Rät linje":{validate:validateStraightLine, component:straightLine, opens: now, closes:new Date(now.getTime() + 24*3600000)}
  }
}
