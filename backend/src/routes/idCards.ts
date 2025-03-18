import express, { Request, Response, Router } from 'express';
import QRCode from 'qrcode';
import IdCard from '../models/IdCard';
import Student from '../models/Student';
import auth from '../middleware/auth';

const router: Router = express.Router();

// Generate a unique card number
const generateCardNumber = (): string => {
  const prefix = 'KEWI';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

// Generate QR code for a student
const generateQRCode = async (studentId: string, cardNumber: string): Promise<string> => {
  const data = JSON.stringify({
    studentId,
    cardNumber,
    timestamp: Date.now()
  });
  
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(data);
    return qrCodeDataUrl;
  } catch (error) {
    throw new Error('Failed to generate QR code');
  }
};

// Issue a new ID card
router.post('/issue/:studentId', auth, async (req: Request, res: Response) => {
  try {
    // Only admin and staff can issue cards
    if (req.user?.role !== 'admin' && req.user?.role !== 'staff') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Check if student already has an active card
    const existingCard = await IdCard.findOne({ 
      student: student._id,
      status: 'active'
    });
    
    if (existingCard) {
      return res.status(400).json({ message: 'Student already has an active ID card' });
    }
    
    const cardNumber = generateCardNumber();
    
    // Set expiry date (typically 4 years from issue)
    const issueDate = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 4);
    
    // Generate QR code
    const qrCode = await generateQRCode(student.studentId, cardNumber);
    
    // Create new ID card
    const newIdCard = new IdCard({
      student: student._id,
      cardNumber,
      issueDate,
      expiryDate,
      qrCode,
      status: 'active'
    });
    
    await newIdCard.save();
    res.status(201).json(newIdCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Get ID card by student ID
router.get('/student/:studentId', auth, async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Check if user is admin/staff or the student themselves
    if (req.user?.role !== 'admin' && req.user?.role !== 'staff' && 
        student.user.toString() !== req.user?.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const idCard = await IdCard.findOne({ student: student._id }).sort({ createdAt: -1 });
    if (!idCard) {
      return res.status(404).json({ message: 'ID card not found' });
    }
    
    res.json(idCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Report lost/damaged card
router.post('/report/:cardId', auth, async (req: Request, res: Response) => {
  try {
    const { reason, notes } = req.body;
    
    const idCard = await IdCard.findById(req.params.cardId);
    if (!idCard) {
      return res.status(404).json({ message: 'ID card not found' });
    }
    
    const student = await Student.findById(idCard.student);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Check if user is admin/staff or the student themselves
    if (req.user?.role !== 'admin' && req.user?.role !== 'staff' && 
        student.user.toString() !== req.user?.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Update card status
    idCard.status = reason as 'lost' | 'damaged';
    
    // Add to reissue history
    idCard.reissueHistory.push({
      requestDate: new Date(),
      reason: reason as 'lost' | 'damaged' | 'expired' | 'other',
      status: 'pending',
      notes
    });
    
    await idCard.save();
    res.json(idCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Process reissue request (admin/staff only)
router.put('/reissue/:cardId', auth, async (req: Request, res: Response) => {
  try {
    if (req.user?.role !== 'admin' && req.user?.role !== 'staff') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { requestStatus, notes } = req.body;
    
    const idCard = await IdCard.findById(req.params.cardId);
    if (!idCard) {
      return res.status(404).json({ message: 'ID card not found' });
    }
    
    // Get the latest reissue request
    const latestRequest = idCard.reissueHistory[idCard.reissueHistory.length - 1];
    if (!latestRequest || latestRequest.status !== 'pending') {
      return res.status(400).json({ message: 'No pending reissue request found' });
    }
    
    // Update request status
    latestRequest.status = requestStatus as 'pending' | 'approved' | 'rejected' | 'completed';
    if (notes) {
      latestRequest.notes = notes;
    }
    
    // If approved, issue a new card
    if (requestStatus === 'approved') {
      // Mark current card as reissued
      idCard.status = 'reissued';
      await idCard.save();
      
      // Generate new card
      const cardNumber = generateCardNumber();
      const issueDate = new Date();
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 4);
      
      // Generate QR code
      const student = await Student.findById(idCard.student);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      
      const qrCode = await generateQRCode(student.studentId, cardNumber);
      
      // Create new ID card
      const newIdCard = new IdCard({
        student: idCard.student,
        cardNumber,
        issueDate,
        expiryDate,
        qrCode,
        status: 'active'
      });
      
      await newIdCard.save();
      res.json({ message: 'New ID card issued', oldCard: idCard, newCard: newIdCard });
    } else {
      await idCard.save();
      res.json(idCard);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Verify ID card
router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { cardNumber, studentId } = req.body;
    
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found', valid: false });
    }
    
    const idCard = await IdCard.findOne({ 
      cardNumber,
      student: student._id
    });
    
    if (!idCard) {
      return res.status(404).json({ message: 'ID card not found', valid: false });
    }
    
    // Check if card is active and not expired
    const isActive = idCard.status === 'active';
    const isExpired = new Date() > new Date(idCard.expiryDate);
    
    if (!isActive) {
      return res.json({ 
        message: `ID card is ${idCard.status}`, 
        valid: false,
        status: idCard.status
      });
    }
    
    if (isExpired) {
      return res.json({ 
        message: 'ID card is expired', 
        valid: false,
        status: 'expired'
      });
    }
    
    // Card is valid
    res.json({
      message: 'ID card is valid',
      valid: true,
      student: {
        id: student._id,
        studentId: student.studentId,
        name: `${student.firstName} ${student.lastName}`,
        program: student.program
      },
      card: {
        cardNumber: idCard.cardNumber,
        issueDate: idCard.issueDate,
        expiryDate: idCard.expiryDate
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

export default router; 