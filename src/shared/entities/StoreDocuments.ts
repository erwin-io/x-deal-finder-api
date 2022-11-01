import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Stores } from "./Stores";

@Index("PK_StoreDocuments", ["storeDocumentId"], { unique: true })
@Entity("StoreDocuments", { schema: "dbo" })
export class StoreDocuments {
  @PrimaryGeneratedColumn({ type: "bigint", name: "StoreDocumentId" })
  storeDocumentId: string;

  @Column("nvarchar", { name: "FileName" })
  fileName: string;

  @Column("bigint", { name: "EntityStatusId", default: () => "(1)" })
  entityStatusId: string;

  @ManyToOne(() => Stores, (stores) => stores.storeDocuments)
  @JoinColumn([{ name: "StoreId", referencedColumnName: "storeId" }])
  store: Stores;
}
