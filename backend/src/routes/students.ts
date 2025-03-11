import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import Student from '../models/Student';
import auth from '../middleware/auth';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Images only (jpeg, jpg, png)'));
    }
  }
});

// Get all students (admin only)
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    if (req.user?.role !== 'admin' && req.user?.role !== 'staff') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const students = await Student.find().populate('user', 'username email');
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Get student by ID
router.get('/:id', auth, async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id).populate('user', 'username email');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Check if user is admin/staff or the student themselves
    if (req.user?.role !== 'admin' && req.user?.role !== 'staff' && 
        student.user.toString() !== req.user?.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Create new student profile
router.post('/', auth, upload.single('photo'), async (req: Request, res: Response) => {
  try {
    const {
      studentId,
      firstName,
      lastName,
      dateOfBirth,
      program,
      enrollmentDate,
      graduationYear
    } = req.body;
    
    // Check if student ID already exists
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student ID already exists' });
    }
    
    const newStudent = new Student({
      user: req.user?.id,
      studentId,
      firstName,
      lastName,
      dateOfBirth,
      program,
      enrollmentDate,
      graduationYear,
      photo: req.file ? req.file.path : 'default.jpg'
    });
    
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Update student profile
router.put('/:id', auth, upload.single('photo'), async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Check if user is admin/staff or the student themselves
    if (req.user?.role !== 'admin' && req.user?.role !== 'staff' && 
        student.user.toString() !== req.user?.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.photo = req.file.path;
    }
    
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    
    res.json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

export default router; 