// Get list of comments
exports.index = function(req, res) {
  var filter = { commentedOn: req.params.id, content: req.query.content, 
    postedBy: req.query.postedBy, created: req.query.created, 
    updated: req.query.updated }; // optional..
  Comment.find(filter, function (err, comments) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(comments);
  });
};

// Creates a new comment in the DB.
exports.create = function(req, res) {
  Comment.create(req.body, function(err, comment) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(comment);
  });
};

