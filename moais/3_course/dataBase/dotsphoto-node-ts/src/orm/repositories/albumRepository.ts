import {myDataSource} from "../../app-data-source.js";
import {Album} from "../entities/Album.js";

export const albumRepository = myDataSource.getRepository(Album);
