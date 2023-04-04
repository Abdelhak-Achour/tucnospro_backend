import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export function verifyToken(req, res, next)
{
    const token = req.headers.auth;

    if(token)
    {
        jwt.verify(token, process.env.JWTSECRET, (err) => {
            if(err) return res.sendStatus(403);
            next();
        });
    }
    else
    {
        res.sendStatus(401);
    }
}