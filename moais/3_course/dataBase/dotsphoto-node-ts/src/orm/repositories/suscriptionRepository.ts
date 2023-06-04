import {myDataSource} from "../../app-data-source.js";
import {Subscription} from "../entities/Subscription.js";

export const subscriptionRepository = myDataSource.getRepository(Subscription);
