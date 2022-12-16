const Email = require("../models/emails.model");

module.exports = {
  // Create a new email using async await

  // createEmail: async (req, res) => {
  //   Email.create(req.body)
  //     .then((newEmail) => res.json(newEmail))
  //     .catch((err) => res.status(400).json(err));
  // },

  createEmail: async (req, res) => {
    try {
      const newEmail = await Email.create(req.body);
      res.json(newEmail);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Get all emails using async await
  getAllEmails: async (req, res) => {
    Email.find()
      .then((allEmails) => res.json(allEmails))
      .catch((err) => res.status(400).json(err));
  },
};
