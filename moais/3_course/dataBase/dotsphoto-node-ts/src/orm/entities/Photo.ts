import {Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Album } from "./Album.js";
import { PhotoMetadata } from "./PhotoMetadata.js";
import {OwnershipLevels} from "../../enums/OwnershipLevels.js";
import {DataStatuses} from "../../enums/DataStatuses.js";

@Index("idxflyvsagn3mwgt9iktvg3kdsvu", ["albumLink"], {})
@Index("idx62pomox0c940g6mi31pwgq10u", ["metadataLink"], {})
@Index("photo_pkey", ["photoId"], { unique: true })
@Entity("photo")
export class Photo {
  @PrimaryGeneratedColumn({name: "photo_id"})
  photoId: bigint | undefined;

  @Column("varchar", { name: "content" })
  content: string | undefined;

  @Column("date", { name: "created_at" })
  createdAt: string | undefined;

  @Column("varchar", { name: "filename", length: 9999 })
  filename: string | undefined;

  @Column("date", { name: "last_updated_at", nullable: true })
  lastUpdatedAt: string | null | undefined;

  @Column("varchar", { name: "status" })
  status: string | undefined;

  @Column("bigint", { name: "album_link" })
  albumLink: string | undefined;

  @Column("bigint", { name: "metadata_link" })
  metadataLink: string | undefined;

  @ManyToOne(() => Album, (album) => album.photos)
  @JoinColumn([{ name: "album_link", referencedColumnName: "albumId" }])
  albumLink2: Album | undefined;

  @ManyToOne(() => PhotoMetadata, (photoMetadata) => photoMetadata.photos)
  @JoinColumn([{ name: "metadata_link", referencedColumnName: "metadataId" }])
  metadataLink2: PhotoMetadata | undefined;
}
