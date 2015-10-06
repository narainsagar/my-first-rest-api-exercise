// Get list of projects
exports.index = function(req, res) {
  var filter = { title: req.query.title, owner: req.query.owner, 
    created: req.query.created, updated: req.query.updated }; // optional..
//  console.log('filter', filter);
  Project.find(filter, function (err, projects) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(projects);
  });
};

// Creates a new project in the DB.
exports.create = function(req, res) {
  Project.create(req.body, function(err, project) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(project);
  });
};
