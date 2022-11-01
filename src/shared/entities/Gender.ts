import { Column, Entity, Index, OneToMany } from "typeorm";
import { Users } from "./Users";

@Index("PK_Gender", ["genderId"], { unique: true })
@Entity("Gender", { schema: "dbo" })
export class Gender {
  @Column("bigint", { primary: true, name: "GenderId" })
  genderId: string;

  @Column("nvarchar", { name: "Name", length: 100 })
  name: string;

  @OneToMany(() => Users, (users) => users.gender)
  users: Users[];
}
