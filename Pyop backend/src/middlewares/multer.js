const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create subdirectories for different types of images
const createSubDir = (subDir) => {
  const fullPath = path.join(uploadsDir, subDir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  return fullPath;
};

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = uploadsDir;
    
    // Determine upload path based on fieldname or route
    if (file.fieldname === 'profileImage' || req.route.path.includes('profile')) {
      uploadPath = createSubDir('profiles');
    } else if (file.fieldname === 'serviceImages' || req.route.path.includes('service')) {
      uploadPath = createSubDir('services');
    } else if (file.fieldname === 'partyImages' || req.route.path.includes('party')) {
      uploadPath = createSubDir('parties');
    } else if (file.fieldname === 'vendorImages' || req.route.path.includes('vendor')) {
      uploadPath = createSubDir('vendors');
    } else {
      uploadPath = createSubDir('general');
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const fileName = file.fieldname + '-' + uniqueSuffix + fileExtension;
    cb(null, fileName);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10 // Maximum 10 files
  }
});

// Different upload configurations
const uploadConfigs = {
  // Single image upload
  single: (fieldName = 'image') => upload.single(fieldName),
  
  // Multiple images upload
  multiple: (fieldName = 'images', maxCount = 5) => upload.array(fieldName, maxCount),
  
  // Multiple fields with different names
  fields: (fieldsArray) => upload.fields(fieldsArray),
  
  // Profile image upload
  profileImage: () => upload.single('profileImage'),
  
  // Service images upload
  serviceImages: (maxCount = 5) => upload.array('serviceImages', maxCount),
  
  // Party images upload
  partyImages: (maxCount = 10) => upload.array('partyImages', maxCount),
  
  // Vendor images upload
  vendorImages: (maxCount = 5) => upload.array('vendorImages', maxCount),
  
  // Mixed upload (profile + gallery)
  mixed: () => upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 5 }
  ])
};

// Error handling middleware
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 5MB.'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum allowed files exceeded.'
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected field name for file upload.'
      });
    }
  }
  
  if (err.message === 'Only image files are allowed!') {
    return res.status(400).json({
      success: false,
      message: 'Only image files are allowed!'
    });
  }
  
  next(err);
};

// Helper function to get file URL
const getFileUrl = (req, filename, subDir = 'general') => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}/uploads/${subDir}/${filename}`;
};

// Helper function to delete file
const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

module.exports = {
  upload,
  uploadConfigs,
  handleMulterError,
  getFileUrl,
  deleteFile
};