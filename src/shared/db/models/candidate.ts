import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("candidate", {schema: 'recruit_helper'})
export class Candidate {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    unique_id: string

    @Column()
    name: string

    @Column("text")
    about: string

    @Column()
    status: string
}

