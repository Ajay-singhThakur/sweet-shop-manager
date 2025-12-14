const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Sweet = require('../models/Sweet');

// @route   GET /api/sweets/featured
// @desc    Get random sweets for the public home page
// @access  Public (No auth middleware)
router.get('/featured', async (req, res) => {
  try {
    // Get 3 random sweets using MongoDB aggregation
    const sweets = await Sweet.aggregate([{ $sample: { size: 3 } }]);
    res.json(sweets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/sweets
// @desc    Add a new sweet
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    const newSweet = new Sweet({ name, category, price, quantity });
    const sweet = await newSweet.save();
    res.status(201).json(sweet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/sweets
// @desc    Get all sweets
// @access  Private (as per requirements)
router.get('/', auth, async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({ date: -1 });
    res.json(sweets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/sweets/:id
// @desc    Delete a sweet
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ msg: 'Sweet not found' });
    }

    // Check user role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'User not authorized to delete' });
    }

    await sweet.deleteOne();
    res.json({ msg: 'Sweet removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Sweet not found' });
    }
    res.status(500).send('Server Error');
  }
});
// @route   POST /api/sweets/:id/purchase
// @desc    Purchase a sweet (Decrease quantity)
// @access  Private
router.post('/:id/purchase', auth, async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ msg: 'Sweet not found' });

    if (sweet.quantity <= 0) {
      return res.status(400).json({ msg: 'Out of stock' });
    }

    sweet.quantity -= 1;
    await sweet.save();
    res.json(sweet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/sweets/:id/restock
// @desc    Restock a sweet (Increase quantity)
// @access  Private (Admin only)
router.post('/:id/restock', auth, async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ msg: 'Sweet not found' });

    // Check permissions
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const { quantity } = req.body;
    // Ensure quantity is a valid number
    const qtyToAdd = parseInt(quantity);
    if (!qtyToAdd || qtyToAdd <= 0) {
       return res.status(400).json({ msg: 'Invalid quantity' });
    }

    sweet.quantity += qtyToAdd;
    await sweet.save();
    res.json(sweet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;