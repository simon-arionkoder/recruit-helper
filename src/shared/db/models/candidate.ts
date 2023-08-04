import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("candidate", {schema: 'recruit_helper'})
export class Candidate {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    unique_id: string

    @Column("text")
    name: string

    @Column("text")
    position: string

    @Column("text")
    years_experience: string

    @Column("text")
    country: string

    @Column("text")
    company: string

    @Column()
    status: string
}

