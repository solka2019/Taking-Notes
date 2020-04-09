// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // This function collect html code for the notes page.
  app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  // If no matching page route is found, the default is set to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
