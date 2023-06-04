import express from "express";
import {myDataSource} from "../../app-data-source.js";
import {Album} from "../../orm/entities/Album.js";
import {albumRepository} from "../../orm/repositories/albumRepository.js";

export const albumController = express.Router();

albumController.get('/get',   async (req, res) => {
    let promise =await albumRepository.find();
    console.log(promise);
    res.send(promise);
})