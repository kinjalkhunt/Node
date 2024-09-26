import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { studentDetail } from "./StudentDetail";

@Entity({name: 'StudentMarks'})
export class StudentMarks {
    @PrimaryGeneratedColumn()
    studentid: number | undefined;

    @Column({type: 'int'})
    marks: number | undefined;

    // Many marks entries belong to one student
    @ManyToOne(() => studentDetail, (studentDetail) => studentDetail.marks,{
          onDelete: 'CASCADE', // Delete marks if student is deleted
        onUpdate: 'CASCADE', // Update marks if student is updated
        nullable: false // Make this column required
    })
    student: studentDetail | undefined;
}
