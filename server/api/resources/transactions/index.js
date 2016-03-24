'use strict';

const _ = require('lodash');
const express = require('express');

const controller = require('./controller');

const router = express.Router();

// Retrieve a list of every `transaction` resource
router.get('/', controller.read);

// Create a new `transaction` resource
router.post('/', controller.create);

// Return a single `transaction` resource
router.get('/:id', controller.read);

// Update a `transaction` resource
router.patch('/:id', controller.update);

// Delete a `transaction` resource
router.delete('/:id', controller.delete);

module.exports = router;
