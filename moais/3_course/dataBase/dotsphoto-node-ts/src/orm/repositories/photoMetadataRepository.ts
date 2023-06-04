import {myDataSource} from "../../app-data-source.js";
import {PhotoMetadata} from "../entities/PhotoMetadata.js";

export const photoMetadataRepository = myDataSource.getRepository(PhotoMetadata);
