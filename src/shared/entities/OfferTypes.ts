import { Column, Entity, Index, OneToMany } from "typeorm";
import { Offers } from "./Offers";

@Index("PK_OfferTypes", ["offerTypeId"], { unique: true })
@Entity("OfferTypes", { schema: "dbo" })
export class OfferTypes {
  @Column("bigint", { primary: true, name: "OfferTypeId" })
  offerTypeId: string;

  @Column("nvarchar", { name: "Name", length: 100 })
  name: string;

  @OneToMany(() => Offers, (offers) => offers.offerType)
  offers: Offers[];
}
