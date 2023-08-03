import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("positions", {schema: 'recruit_helper'})
export class Positions {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}

