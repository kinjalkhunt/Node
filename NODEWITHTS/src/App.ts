import express from 'express';
import AppDataSource from './DATABASECONFIG/Connection'; // Make sure to import your DataSource
import { StudentMarks } from './ENTITIES/ADMIN/StudentMarks';
import { studentDetail } from './ENTITIES/ADMIN/StudentDetail';

const app = express();
app.use(express.json());

// Initialize the DataSource
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    
    // CRUD operations for StudentDetail
    // Create StudentDetail
    app.post('/add-student-detail', async (req, res) => {
      try {
        const { name, course } = req.body;
        const studentDetailRepository = AppDataSource.getRepository(studentDetail);

        const newStudentDetail = studentDetailRepository.create({ name, course });
        await studentDetailRepository.save(newStudentDetail);

        res.status(201).json({ message: 'Student detail added successfully!', newStudentDetail });
      } catch (error) {
        res.status(500).json({ message: 'Error adding student detail', error });
      }
    });

    // Read StudentDetail by ID
    app.get('/student-detail/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const studentDetailRepository = AppDataSource.getRepository(studentDetail);

        const student = await studentDetailRepository.findOneBy({ studentid: parseInt(id) });
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }

        res.json(student);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving student detail', error });
      }
    });

    // Update StudentDetail by ID
    app.put('/update-student-detail/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const { name, course } = req.body;
        const studentDetailRepository = AppDataSource.getRepository(studentDetail);

        const student = await studentDetailRepository.findOneBy({ studentid: parseInt(id) });
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }

        student.name = name || student.name;
        student.course = course || student.course;

        await studentDetailRepository.save(student);

        res.json({ message: 'Student detail updated successfully!', student });
      } catch (error) {
        res.status(500).json({ message: 'Error updating student detail', error });
      }
    });

    // Delete StudentDetail by ID
    app.delete('/delete-student-detail/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const studentDetailRepository = AppDataSource.getRepository(studentDetail);

        const result = await studentDetailRepository.delete({ studentid: parseInt(id) });
        if (result.affected === 0) {
          return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ message: 'Student detail deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting student detail', error });
      }
    });

    // CRUD operations for StudentMarks
    // Create StudentMarks
    app.post('/add-student-marks', async (req, res) => {
      try {
        const { studentid, marks } = req.body;
        const studentRepository = AppDataSource.getRepository(studentDetail);
        const studentMarksRepository = AppDataSource.getRepository(StudentMarks);

        const student = await studentRepository.findOneBy({ studentid });
        if (!student) {
          return res.status(400).json({ message: 'Student not found. Please provide a valid student ID.' });
        }

        const newStudentMark = studentMarksRepository.create({ marks, student });
        await studentMarksRepository.save(newStudentMark);

        res.status(201).json({ message: 'Student marks added successfully!', newStudentMark });
      } catch (error) {
        res.status(500).json({ message: 'Error adding student marks', error });
      }
    });

    // Read StudentMarks by ID
    app.get('/student-marks/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const studentMarksRepository = AppDataSource.getRepository(StudentMarks);

        const marks = await studentMarksRepository.findOne({
          where: { student: { studentid: parseInt(id) } },
        });
        if (!marks) {
          return res.status(404).json({ message: 'Marks not found' });
        }

        res.json(marks);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving student marks', error });
      }
    });

    // Update StudentMarks by ID
    app.put('/update-student-marks/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const { marks } = req.body;
        const studentMarksRepository = AppDataSource.getRepository(StudentMarks);
        const studentRepository = AppDataSource.getRepository(studentDetail);

        const student = await studentRepository.findOneBy({ studentid: parseInt(id) });
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }

        const studentMarks = await studentMarksRepository.findOne({
          where: { student: { studentid: parseInt(id) } },
        });
        if (!studentMarks) {
          return res.status(404).json({ message: 'Marks not found' });
        }

        studentMarks.marks = marks || studentMarks.marks;
        await studentMarksRepository.save(studentMarks);

        res.json({ message: 'Student marks updated successfully!', studentMarks });
      } catch (error) {
        res.status(500).json({ message: 'Error updating student marks', error });
      }
    });

    // Delete StudentMarks by ID
    app.delete('/delete-student-marks/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const studentMarksRepository = AppDataSource.getRepository(StudentMarks);

        const result = await studentMarksRepository.delete({
          student: { studentid: parseInt(id) },
        });
        if (result.affected === 0) {
          return res.status(404).json({ message: 'Marks not found' });
        }

        res.json({ message: 'Student marks deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting student marks', error });
      }
    });

    // Default route
    app.get('/', (req, res) => {
      res.send('Hello world! This is the first project of Node with TypeScript.');
    });

    // const app = process.env.SERVER_PORT;

    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Listening on port ${process.env.SERVER_PORT}`);
    });
  })
  .catch((error) => console.log('Error during Data Source initialization:', error));
