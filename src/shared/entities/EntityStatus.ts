import { Column, Entity, Index, OneToMany } from "typeorm";
import { Offers } from "./Offers";
import { Stores } from "./Stores";
import { Users } from "./Users";

@Index("PK_EntityStatus", ["entityStatusId"], { unique: true })
@Entity("EntityStatus", { schema: "dbo" })
export class EntityStatus {
  @Column("bigint", { primary: true, name: "EntityStatusId" })
  entityStatusId: string;

  @Column("nvarchar", { name: "Name", length: 100 })
  name: string;

  @OneToMany(() => Offers, (offers) => offers.entityStatus)
  offers: Offers[];

  @OneToMany(() => Stores, (stores) => stores.entityStatus)
  stores: Stores[];

  @OneToMany(() => Users, (users) => users.entityStatus)
  users: Users[];
}
