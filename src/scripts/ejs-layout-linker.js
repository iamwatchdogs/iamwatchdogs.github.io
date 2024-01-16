const homeContent = require("../templates/layouts/home.ejs");
const aboutContent = require("../templates/layouts/about.ejs");
const expContent = require("../templates/layouts/exp.ejs");
const projectsContent = require("../templates/layouts/projects.ejs");
const contactContent = require("../templates/layouts/contact.ejs");

document.getElementById("home").innerHTML = homeContent(null);
document.getElementById("about").innerHTML = aboutContent(null);
document.getElementById("exp-edu").innerHTML = expContent(null);
document.getElementById("projects").innerHTML = projectsContent(null);
document.getElementById("contact").innerHTML = contactContent(null);
