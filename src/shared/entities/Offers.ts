import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Stores } from "./Stores";
import { OfferTypes } from "./OfferTypes";
import { EntityStatus } from "./EntityStatus";

@Index("PK_Offers", ["offerId"], { unique: true })
@Entity("Offers", { schema: "dbo" })
export class Offers {
  @PrimaryGeneratedColumn({ type: "bigint", name: "OfferId" })
  offerId: string;

  @Column("nvarchar", { name: "Name", length: 250 })
  name: string;

  @Column("nvarchar", { name: "Description" })
  description: string;

  @ManyToOne(() => Stores, (stores) => stores.offers)
  @JoinColumn([{ name: "StoreId", referencedColumnName: "storeId" }])
  store: Stores;

  @ManyToOne(() => OfferTypes, (offerTypes) => offerTypes.offers)
  @JoinColumn([{ name: "OfferTypeId", referencedColumnName: "offerTypeId" }])
  offerType: OfferTypes;

  @ManyToOne(() => EntityStatus, (entityStatus) => entityStatus.offers)
  @JoinColumn([
    { name: "EntityStatusId", referencedColumnName: "entityStatusId" },
  ])
  entityStatus: EntityStatus;
}
