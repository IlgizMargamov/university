import {Column, Entity, Index, OneToMany} from "typeorm";
import {Subscription} from "./Subscription.js";
import {DataStatuses} from "../../enums/DataStatuses.js";

@Index("subscription_product_pkey", ["productId"], { unique: true })
@Entity("subscription_product")
export class SubscriptionProduct {
  @Column("bigint", { primary: true, name: "product_id" })
  productId: bigint | undefined;

  @Column("integer", { name: "available_space_gb" })
  availableSpaceGb: number | undefined;

  @Column("integer", { name: "period_months" })
  periodMonths: number | undefined;

  @Column("integer", { name: "price" })
  price: number | undefined;

  @Column("varchar", { name: "product_name", length: 9999 })
  productName: string | undefined;

  @Column("boolean", { name: "show_ads" })
  showAds: boolean | undefined;

  @Column("varchar", {name:"status", default: DataStatuses.ACTIVE })
  status: string | undefined;

  @OneToMany(() => Subscription, (subscription) => subscription.productLink2)
  subscriptions: Subscription[] | undefined;
}
