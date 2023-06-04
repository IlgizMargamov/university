import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Album } from "./Album.js";
import { User } from "./User.js";

@Index("ownership_pkey", ["ownedAlbumAlbumId", "userLinkUserId"], {
  unique: true,
})
@Index("idx71jw4fyj5abch0e72v9dao7q", ["ownedAlbumAlbumId"], {})
@Index("uk_71jw4fyj5abch0e72v9dao7q", ["ownedAlbumAlbumId"], { unique: true })
@Index("uk_1fpjvhxf4x5j161fo26gajr46", ["userLinkUserId"], { unique: true })
@Index("idx1fpjvhxf4x5j161fo26gajr46", ["userLinkUserId"], {})
@Entity("ownership")
export class Ownership {
  @Column("bigint", { primary: true, name: "owned_album_album_id" })
  ownedAlbumAlbumId: string | undefined;

  @Column("bigint", { primary: true, name: "user_link_user_id" })
  userLinkUserId: string | undefined;

  @Column("varchar", { name: "ownership_level", length: 255 })
  ownershipLevel: string | undefined;

  @OneToOne(() => Album, (album) => album.ownership)
  @JoinColumn([
    { name: "owned_album_album_id", referencedColumnName: "albumId" },
  ])
  ownedAlbumAlbum: Album | undefined;

  @OneToOne(() => User, (user) => user.ownership)
  @JoinColumn([{ name: "user_link_user_id", referencedColumnName: "userId" }])
  userLinkUser: User | undefined;
}