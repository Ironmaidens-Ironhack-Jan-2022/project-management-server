const router = require("express").Router();
const Project = require("../models/Project.model");

// - POST /api/projects
//   Project.create()
//   req.body


router.post("/", (req, res) => {

  const projectDetails = {
    title: req.body.title,
    description: req.body.description,
    tasks: []
  }

  Project.create(projectDetails)
    .then( projectCreated => {
      res.status(201).json(projectCreated)
    })
    .catch( err => {
      console.log("error creating a new project", err);
      res.status(500).json({
        message: "error creating a new project",
        error: err
      });
    })

})

module.exports = router;
