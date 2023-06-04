import jwt from "jsonwebtoken";
import {Request} from "express";

export function getUserNameFromToken(token : string | undefined) : string{
    if (token === undefined) return "";
    const payload = jwt.decode(token);
    // @ts-ignore
    return payload != null ? payload["preferred_username"] : "";
}

export function getToken(req: Request){
    const authHeader = req.headers['authorization']
    return authHeader && authHeader.split(' ')[1];
}

export function getUserName(req : Request){
    return getUserNameFromToken(getToken(req));
}