import {myDataSource} from "../../app-data-source.js";
import {Photo} from "../entities/Photo.js";

export const photoRepository = myDataSource.getRepository(Photo);
