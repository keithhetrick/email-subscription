const EmailController = require("../controllers/emails.controller");

module.exports = (app) => {
  app.post("/api/emails", EmailController.createEmail);
  app.get("/api/emails", EmailController.getAllEmails);
  app.get("/api/emails/:id", EmailController.getOneEmail);
  app.put("/api/emails/:id", EmailController.updateEmail);
  app.delete("/api/emails/:id", EmailController.deleteEmail);
};
