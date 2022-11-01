import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Offers } from "./Offers";
import { StoreDocuments } from "./StoreDocuments";
import { Users } from "./Users";
import { EntityStatus } from "./EntityStatus";

@Index("PK_Stores", ["storeId"], { unique: true })
@Entity("Stores", { schema: "dbo" })
export class Stores {
  @PrimaryGeneratedColumn({ type: "bigint", name: "StoreId" })
  storeId: string;

  @Column("nvarchar", { name: "Name", length: 50 })
  name: string;

  @Column("nvarchar", { name: "Description", length: 50 })
  description: string;

  @OneToMany(() => Offers, (offers) => offers.store)
  offers: Offers[];

  @OneToMany(() => StoreDocuments, (storeDocuments) => storeDocuments.store)
  storeDocuments: StoreDocuments[];

  @ManyToOne(() => Users, (users) => users.stores)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: Users;

  @ManyToOne(() => EntityStatus, (entityStatus) => entityStatus.stores)
  @JoinColumn([
    { name: "EntityStatusId", referencedColumnName: "entityStatusId" },
  ])
  entityStatus: EntityStatus;
}
