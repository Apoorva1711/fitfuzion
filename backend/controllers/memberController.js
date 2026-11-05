const Member = require('../models/Member');

exports.joinMembership = async (req, res) => {
  try {
    const { fullName, email, phone, plan } = req.body;
    if (!fullName || !email || !phone || !plan) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMember = await Member.create({ fullName, email, phone, plan });
    res.status(201).json({ message: 'Registration submitted successfully!', member: newMember });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
