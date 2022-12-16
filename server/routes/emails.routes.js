const EmailController = require("../controllers/emails.controller");

module.exports = (app) => {
  app.post("/api/emails", EmailController.createEmail);
  app.get("/api/emails", EmailController.getAllEmails);
};
