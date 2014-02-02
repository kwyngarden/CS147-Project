
/*
 * GET home page.
 */

exports.view = function(req, res){
  var Entities = require('html-entities').AllHtmlEntities;
  var entities = new Entities();
  var decodedDescription = entities.decode('human-computer interaction &middot; social computing &middot; crowdsourcing');

  res.render('index', {
    'jumboName': 'Michael Bernstein',
    'jumboDescription': decodedDescription,
    'projects': [
      { 'name': 'Waiting in Line',
        'image': 'lorempixel.people.1.jpeg',
        'id': 'project1'
      },
      { 'name': 'Needfinding',
        'image': 'lorempixel.city.1.jpeg',
        'id': 'project2'
      },
      { 'name': 'Prototyping',
        'image': 'lorempixel.technics.1.jpeg',
        'id': 'project3'
      },
      { 'name': 'Heuristic Evaluation',
        'image': 'lorempixel.abstract.1.jpeg',
        'id': 'project4'
      },
      { 'name': 'Visualization',
        'image': 'lorempixel.abstract.8.jpeg',
        'id': 'project5'
      },
      { 'name': 'Social design',
        'image': 'lorempixel.people.2.jpeg',
        'id': 'project6'
      },
      { 'name': 'Gestural interaction',
        'image': 'lorempixel.technics.2.jpeg',
        'id': 'project7'
      },
      { 'name': 'Design tools',
        'image': 'lorempixel.city.2.jpeg',
        'id': 'project8'
      }
    ]
  });
};