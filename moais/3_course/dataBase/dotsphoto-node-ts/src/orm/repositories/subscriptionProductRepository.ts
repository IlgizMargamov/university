import {myDataSource} from "../../app-data-source.js";
import {SubscriptionProduct} from "../entities/SubscriptionProduct.js";

export const subscriptionProductRepository = myDataSource.getRepository(SubscriptionProduct);
