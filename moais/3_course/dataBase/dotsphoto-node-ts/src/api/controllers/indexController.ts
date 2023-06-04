import express from "express";

export const indexController = express.Router();

indexController.get('/', (req, res, next) => {
    res.send('Hello World!')
})
