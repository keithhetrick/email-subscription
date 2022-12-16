const Email = require("../models/emails.model");

module.exports = {
  // Create a new email using async await
  createEmail: async (req, res) => {
    Email.create(req.body)
      .then((newEmail) => res.json(newEmail))
      .catch((err) => res.status(400).json(err));
  },

  // Get all emails using async await
  getAllEmails: async (req, res) => {
    Email.find()
      .then((allEmails) => res.json(allEmails))
      .catch((err) => res.status(400).json(err));
  },

  // Get one email using async await
  getOneEmail: async (req, res) => {
    Email.findOne({ _id: req.params.id })
      .then((oneEmail) => res.json(oneEmail))
      .catch((err) => res.status(400).json(err));
  },

  // Update an email using async await
  updateEmail: async (req, res) => {
    Email.findOneAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true,
      new: true,
    })
      .then((updatedEmail) => res.json(updatedEmail))
      .catch((err) => res.status(400).json(err));
  },

  // Delete an email using async await
  deleteEmail: async (req, res) => {
    Email.deleteOne({ _id: req.params.id })
      .then((deletedEmail) => res.json(deletedEmail))
      .catch((err) => res.status(400).json(err));
  },
};
