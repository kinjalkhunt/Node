import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { StudentMarks } from "./StudentMarks";

@Entity({name: 'studentDetail'})
export class studentDetail {
    @PrimaryGeneratedColumn()
    studentid: number | undefined

    @Column({type: 'varchar', length: '30'})
    name: string | undefined
     
    @Column({type: 'varchar', length: '30'})
    course: string | undefined

    // One student can have many marks
    @OneToMany(() => StudentMarks, (studentMarks) => studentMarks.student)
    marks: StudentMarks[] | undefined;
}
