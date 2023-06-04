import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Ownership } from "./Ownership.js";
import { Album } from "./Album.js";
import { Subscription } from "./Subscription.js";

@Index("idxn4swgcf30j6bmtb4l4cjryuym", ["nickname"], {})
@Index("uk_n4swgcf30j6bmtb4l4cjryuym", ["nickname"], { unique: true })
@Index("idx1cmuxr3stga2p0vxoi839qbp0", ["rootAlbumLink"], {})
@Index("idxjlc10xekr5jneqdeeygp8ai1q", ["subscriptionLink"], {})
@Index("user_pkey", ["userId"], { unique: true })
@Entity("user")
export class User {
  @Column("bigint", { primary: true, name: "user_id" })
  userId: string | undefined;

  @Column("varchar", { name: "email", nullable: true, length: 9999 })
  email: string | null | undefined;

  @Column("varchar", {
    name: "full_name",
    nullable: true,
    length: 9999,
  })
  fullName: string | null | undefined;

  @Column("varchar", { name: "nickname", unique: true, length: 9999 })
  nickname: string | undefined;

  @Column("bigint", { name: "root_album_link" })
  rootAlbumLink: string | undefined;

  @Column("bigint", { name: "subscription_link" })
  subscriptionLink: string | undefined;

  @OneToOne(() => Ownership, (ownership) => ownership.userLinkUser)
  ownership: Ownership | undefined;

  @ManyToOne(() => Album, (album) => album.users)
  @JoinColumn([{ name: "root_album_link", referencedColumnName: "albumId" }])
  rootAlbumLink2: Album | undefined;

  @ManyToOne(() => Subscription, (subscription) => subscription.users)
  @JoinColumn([
    { name: "subscription_link", referencedColumnName: "subscriptionId" },
  ])
  subscriptionLink2: Subscription | undefined;

}
