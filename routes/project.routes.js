const router = require("express").Router();
const Project = require("../models/Project.model");
const Task = require("../models/Task.model");
const mongoose = require("mongoose");

router.post("/", (req, res) => {

  const projectDetails = {
    title: req.body.title,
    description: req.body.description,
    tasks: []
  }

  Project.create(projectDetails)
    .then(projectCreated => {
      res.status(201).json(projectCreated)
    })
    .catch(err => {
      console.log("error creating a new project", err);
      res.status(500).json({
        message: "error creating a new project",
        error: err
      });
    })

})


router.get('/', (req, res, next) => {
  Project.find()
    .populate('tasks')
    .then(allProjects => res.json(allProjects))
    .catch(err => res.json(err));
});



router.get('/:projectId', (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Project.findById(projectId)
    .populate('tasks')
    .then(project => res.json(project))
    .catch(err => res.status(500).json(err));
});



router.put('/:projectId', (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const projectDetails = {
    title: req.body.title,
    description: req.body.description,
    tasks: req.body.tasks,
  }

  Project.findByIdAndUpdate(projectId, projectDetails, { new: true })
    .then((updatedProject) => res.json(updatedProject))
    .catch(error => res.status(500).json(error));
});



router.delete('/:projectId', (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Project.findByIdAndRemove(projectId)
    .then( deteletedProject => {
      return Task.deleteMany( { _id: { $in: deteletedProject.tasks } } );
    })
    .then(() => res.json({ message: `Project with ${projectId} is removed successfully.` }))
    .catch(error => res.status(500).json(error));
});


module.exports = router;
