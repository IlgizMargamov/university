import {myDataSource} from "../../app-data-source.js";
import {Ownership} from "../entities/Ownership.js";

export const ownershipRepository = myDataSource.getRepository(Ownership);
