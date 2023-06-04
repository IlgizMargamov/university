import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";
import { Ownership } from './Ownership.js';
import { Photo } from "./Photo.js";
import { User } from "./User.js";
import {OwnershipLevels} from "../../enums/OwnershipLevels.js";
import {DataStatuses} from "../../enums/DataStatuses.js";

@Index("album_pkey", ["albumId"], { unique: true })
@Entity("album")
export class Album {
  @Column("bigint", { primary: true, name: "album_id" })
  albumId: string | undefined;

  @Column("varchar", { name: "album_name", length: 9999 })
  albumName: string | undefined;

  @Column("date", { name: "created_at" })
  createdAt: string | undefined;

  @Column("integer", { name: "kilobyte_size" })
  kilobyteSize: number | undefined;

  @Column("date", { name: "last_updated_at", nullable: true })
  lastUpdatedAt: string | null | undefined;

  @Column("varchar", { name: "status" })
  status: string | undefined;

  @OneToOne(() => Ownership, (ownership) => ownership.ownedAlbumAlbum)
  ownership: Ownership | undefined;

  @OneToMany(() => Photo, (photo) => photo.albumLink2)
  photos: Photo[] | undefined;

  @OneToMany(() => User, (user) => user.rootAlbumLink2)
  users: User[] | undefined;
}
