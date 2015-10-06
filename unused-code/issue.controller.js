// Get list of issues
exports.index = function(req, res) {
  var filter = { project: req.params.id, title: req.query.title, 
    description: req.query.description, assignee: req.query.assignee, 
    created: req.query.created, updated: req.query.updated, 
    creator: req.query.creator, state: req.query.state }; // optional..
//  console.log('filter', filter);
  Issue.find(filter, function (err, issues) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(issues);
  });
};

// Creates a new issue in the DB.
exports.create = function(req, res) {
  Issue.create(req.body, function(err, issue) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(issue);
  });
};