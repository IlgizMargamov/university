import express from "express";
import {myDataSource} from "../../app-data-source.js";
import {Photo} from "../../orm/entities/Photo.js";
import {photoRepository} from "../../orm/repositories/photoRepository.js";
import {getUserName} from "../../utils/jwtTokenUtils.js";

export const photoController = express.Router();

photoController.get('/', async (req, res) => {
    let userName = getUserName(req);
    //let promise  = await photoRepository.find({where:{ userName}});
    //console.log(promise)
    //res.status(200).send(promise)
})

photoController.post('/', (req, res) => {
    res.send('post photo of user')

})

photoController.get('/ids', (req, res) => {
    res.send('ids of photos of user')
})

/*
app.get('/photo', (req, res) => {
    res.send('id of photos of user: '+req.query.id)
})
*/

photoController.get('/:id',  (req, res) =>{
    res.send('id of photos of user: ' + req.params.id)
})
