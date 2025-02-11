// middleware/validationMiddleware.js
import validator from 'validator';

// Validation constants
const VALID_ROLES = ['Program Manager', 'Inventory Manager'];
const VALID_CATEGORIES = ['Device', 'Furniture', 'Cleaning Material', 'Food Utensil'];
const VALID_CONDITIONS = ['New', 'Good', 'Worn Out', 'Broken'];
const VALID_REPAIR_STATUSES = ['Pending', 'Repaired', 'Disposed'];

// Validate user registration input
const validateRegistration = (req, res, next) => {
  const { full_name, email, password, phone_number, role } = req.body;
  const errors = [];

  // Using object for validation rules
  const validationRules = {
    full_name: {
      valid: full_name?.trim().length >= 2,
      message: 'Full name is required and must be at least 2 characters'
    },
    email: {
      valid: email && validator.isEmail(email),
      message: 'Valid email is required'
    },
    password: {
      valid: password?.length >= 6,
      message: 'Password must be at least 6 characters'
    },
    phone_number: {
      valid: phone_number && validator.isMobilePhone(phone_number),
      message: 'Valid phone number is required'
    },
    role: {
      valid: role && VALID_ROLES.includes(role),
      message: 'Valid role is required'
    }
  };

  // Check each validation rule
  Object.entries(validationRules).forEach(([field, rule]) => {
    if (!rule.valid) errors.push(rule.message);
  });

  return errors.length > 0 
    ? res.status(400).json({ errors }) 
    : next();
};

// Validate inventory item input
const validateInventoryItem = (req, res, next) => {
  const { name, category, serial_number, condition } = req.body;
  const errors = [];

  const validationRules = {
    name: {
      valid: name?.trim().length >= 2,
      message: 'Item name is required and must be at least 2 characters'
    },
    category: {
      valid: category && VALID_CATEGORIES.includes(category),
      message: 'Valid category is required'
    },
    serial_number: {
      valid: !serial_number || serial_number.trim().length >= 3,
      message: 'Serial number must be at least 3 characters'
    },
    condition: {
      valid: !condition || VALID_CONDITIONS.includes(condition),
      message: 'Valid condition is required'
    }
  };

  Object.entries(validationRules)
    .filter(([field, rule]) => !rule.valid)
    .forEach(([field, rule]) => errors.push(rule.message));

  return errors.length > 0 
    ? res.status(400).json({ errors }) 
    : next();
};

// Validate borrowing input
const validateBorrowing = (req, res, next) => {
  const { item_id, borrower_id, expected_return_date } = req.body;
  const errors = [];

  const validationRules = {
    item_id: {
      valid: Boolean(item_id),
      message: 'Item ID is required'
    },
    borrower_id: {
      valid: Boolean(borrower_id),
      message: 'Borrower ID is required'
    },
    expected_return_date: {
      valid: expected_return_date && validator.isDate(expected_return_date),
      message: 'Valid expected return date is required'
    }
  };

  Object.entries(validationRules)
    .filter(([field, rule]) => !rule.valid)
    .forEach(([field, rule]) => errors.push(rule.message));

  return errors.length > 0 
    ? res.status(400).json({ errors }) 
    : next();
};

// Validate damage report input
const validateDamageReport = (req, res, next) => {
  const { item_id, damage_reason, repair_status } = req.body;
  const errors = [];

  const validationRules = {
    item_id: {
      valid: Boolean(item_id),
      message: 'Item ID is required'
    },
    damage_reason: {
      valid: damage_reason?.trim().length >= 10,
      message: 'Detailed damage reason is required (minimum 10 characters)'
    },
    repair_status: {
      valid: !repair_status || VALID_REPAIR_STATUSES.includes(repair_status),
      message: 'Valid repair status is required'
    }
  };

  Object.entries(validationRules)
    .filter(([field, rule]) => !rule.valid)
    .forEach(([field, rule]) => errors.push(rule.message));

  return errors.length > 0 
    ? res.status(400).json({ errors }) 
    : next();
};

export {
  validateRegistration,
  validateInventoryItem,
  validateBorrowing,
  validateDamageReport
};