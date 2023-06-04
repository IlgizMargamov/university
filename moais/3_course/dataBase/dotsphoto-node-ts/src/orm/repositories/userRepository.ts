import {myDataSource} from "../../app-data-source.js";
import {User} from "../entities/User.js";

export const userRepository = myDataSource.getRepository(User);

const lolUser = myDataSource
    .manager
    .find(User, {where: {nickname: "lol"}})