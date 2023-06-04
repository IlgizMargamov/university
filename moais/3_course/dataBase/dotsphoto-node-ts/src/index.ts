//import * as dotenv from "dotenv";
import express from "express";
import cors from "cors"
import {createConnection, DataSource} from "typeorm";
import { pagination } from "typeorm-pagination";
import { myDataSource } from "./app-data-source.js";
import {Photo} from "./orm/entities/Photo.js";
import {User} from "./orm/entities/User.js";
import {Album} from "./orm/entities/Album.js";

// typeorm-model-generator
import jwt from "jsonwebtoken";
import {getUserNameFromToken} from "./utils/jwtTokenUtils.js";
import {albumController} from "./api/controllers/albumController.js";
import {indexController} from "./api/controllers/indexController.js";
import {photoController} from "./api/controllers/photoController.js";
import {userController} from "./api/controllers/userController.js";

myDataSource
    .initialize()
    .then(x => {
        console.log("Data Source has been initialized!")
        const PORT = process.env.PORT || 8082;
        const app = express();
        app.use(cors({
            origin: ["http://localhost:3000","http://localhost:3000/"],
            methods : ["GET", "HEAD", "POST", "PUT", "DELETE"],
            allowedHeaders: ["authorization", "content-type", "x-auth-token"]
        }));

        const router = express.Router()
        app.use("/", router)
        app.use("/node/resource/album", albumController)
        app.use("/node/resource", indexController)
        app.use("/node/resource/photo", photoController)
        app.use("/node/resource/user", userController)

        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(pagination);

        router.all('*', (r)=>{
            let now = new Date();
            let hour = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();
            let data = `${hour}:${minutes}:${seconds} ${r.method} ${r.url} ${r.get("user-agent")}`;
            console.log(data);
            //fs.appendFile("server.log", data + "\n", function(){});
            if (r.next !=null)
                r.next();// next()
        });

        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

//dotenv.config();
