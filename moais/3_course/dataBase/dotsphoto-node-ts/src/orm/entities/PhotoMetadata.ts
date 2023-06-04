import { Column, Entity, Index, OneToMany } from "typeorm";
import { Photo } from "./Photo.js";

@Index("photo_metadata_pkey", ["metadataId"], { unique: true })
@Entity("photo_metadata")
export class PhotoMetadata {
  @Column("bigint", { primary: true, name: "metadata_id" })
  metadataId: string | undefined;

  @Column("integer", { name: "camera_megapixels", nullable: true })
  cameraMegapixels: number | null | undefined;

  @Column("varchar", {
    name: "geolocation",
    nullable: true,
    length: 9999,
  })
  geolocation: string | null | undefined;

  @Column("integer", { name: "height_in_pixels", nullable: true })
  heightInPixels: number | null | undefined;

  @Column("integer", { name: "kilobyte_size", nullable: true })
  kilobyteSize: number | null | undefined;

  @Column("date", { name: "shot_at", nullable: true })
  shotAt: string | null | undefined;

  @Column("integer", { name: "width_in_pixels", nullable: true })
  widthInPixels: number | null | undefined;

  @OneToMany(() => Photo, (photo) => photo.metadataLink2)
  photos: Photo[] | undefined;
}
