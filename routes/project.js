exports.viewProject = function(req, res) { 
    console.log("The project name is: " + req.params.name);
  res.render('project', {
    'jumboName': req.params.name,
    'jumboDescription': 'one-sentence description of project',
    'projectName': req.params.name
  });
};