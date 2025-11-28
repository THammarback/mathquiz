import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { create, verify, getNumericDate, Payload } from "https://deno.land/x/djwt@v3.0.1/mod.ts";
import { getCookies } from "jsr:@std/http/cookie";

import {Database, JWT_KEY, COOKIE_NAME } from "./imports.ts"
import type {UserPass} from "./imports.ts"

export async function verifyAuth(req: Request): Promise<Payload | null> {
  const cookies = getCookies(req.headers);
  const jwt = cookies[COOKIE_NAME];
  if (!jwt) return null;
  try {
    return await verify(jwt, JWT_KEY);
  } catch (_) {
    return null;
  }
}

export async function login(user:UserPass): Promise<{error:boolean, msg:string}>{
  const userRow = Database[user.username]
  if (!userRow) {
    return {error:true, msg:"Invalid credentials"}
  }

  const match = bcrypt.compareSync(user.password, userRow.password);
  if (!match) {
    return {error:true, msg:"Invalid credentials"}
  }
  
  return {error:false, msg: await create({ alg: "HS512", typ: "JWT" },
    { username: user.username, groups: userRow.groups, exp: getNumericDate(60 * 60 * 24)},  
    JWT_KEY)
  }
}
