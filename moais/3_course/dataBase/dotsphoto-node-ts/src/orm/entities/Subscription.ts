import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { SubscriptionProduct } from "./SubscriptionProduct.js";
import { User } from "./User.js";

@Index("idxew1a7rq5ge07o55y7otpxwcth", ["productLink"], {})
@Index("subscription_pkey", ["subscriptionId"], { unique: true })
@Entity("subscription")
export class Subscription {
  @Column("bigint", { primary: true, name: "subscription_id" })
  subscriptionId: string | undefined;

  @Column("date", { name: "date_from" })
  dateFrom: string | undefined;

  @Column("date", { name: "date_to" })
  dateTo: string | undefined;

  @Column("bigint", { name: "product_link" })
  productLink: string | undefined;

  @ManyToOne(
    () => SubscriptionProduct,
    (subscriptionProduct) => subscriptionProduct.subscriptions
  )
  @JoinColumn([{ name: "product_link", referencedColumnName: "productId" }])
  productLink2: SubscriptionProduct | undefined;

  @OneToMany(() => User, (user) => user.subscriptionLink2)
  users: User[] | undefined;
}
