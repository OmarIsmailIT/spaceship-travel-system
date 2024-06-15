import { body, param } from "express-validator";

export const validateSpaceshipInput = [
  body('name').notEmpty().withMessage('Name is required').isString().isLength({ max: 255 }).withMessage('Name must be a string with a maximum length of 255 characters'),
  body('capacity').notEmpty().withMessage('Capacity is required').toInt().isInt().withMessage('Capacity must be an integer'),
  body('launch_date').notEmpty().withMessage('Launch date is required').isISO8601().withMessage('Launch date must be a valid date-time format like this YYYY-MM-DD HH:MM:SS'),
  body('status').notEmpty().withMessage('Status is required').isIn(['Active', 'Inactive', 'Maintenance', 'Decommissioned']).withMessage('Status must be one of: Active, Inactive, Maintenance, Decommissioned'),
];

export const validateSpaceshipPartialUpdate = [
  body('name').optional().isString().isLength({ max: 255 }).withMessage('Name must be a string with a maximum length of 255 characters'),
  body('capacity').optional().toInt().isInt().withMessage('Capacity must be an integer'),
  body('launch_date').optional().isISO8601().withMessage('Launch date must be a valid date-time format like this YYYY-MM-DD HH:MM:SS'),
  body('status').optional().isIn(['Active', 'Inactive', 'Maintenance', 'Decommissioned']).withMessage('Status must be one of: Active, Inactive, Maintenance, Decommissioned'),
];
