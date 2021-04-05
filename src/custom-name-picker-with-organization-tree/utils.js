var _ = require('lodash');

function getOrgTree() {
  return {
    name: 'Greenwell',
    id: 'Greenwell',
    children: [
      {
        name: 'Business',
        id: 'Business',
        children: [
          {
            name: 'Marketing',
            id: 'Marketing'
          },
          {
            name: 'Sales',
            id: 'Sales'
          }
        ]
      },
      {
        name: 'Development',
        id: 'Development',
        children: [
          {
            name: 'Mobile',
            id: 'Mobile'
          },
          {
            name: 'Cloud',
            id: 'Cloud'
          },
          {
            name: 'AI',
            id: 'AI'
          }
        ]
      }
    ]
  }
}

function generateRandomMembers(department) {
  var count = _.random(3, 6);
  var result = [];
  var names = getNames();
  var titles = getTitles();
  for(let index = 0; index < count; index++) {
    let nameIndex = _.random(0, names.length-1);
    let titleIndex = _.random(0, titles.length-1);
    let randomEmailSuffix = _.random(1, 100);
    let person = {
      name: names[nameIndex],
      email: _.snakeCase(names[nameIndex]) + randomEmailSuffix + '@greenwell.com',
      department: department,
      title: titles[titleIndex]
    };
    result.push(person);
  }
  return result;
}

function getNames() {
  return [
    'Samantha',
    'Frank',
    'Bruce',
    'Peppa',
    'George'
  ];
}

function getTitles() {
  return [
    'Engineer',
    'Manager',
    'Sales',
    'Marketing',
    'Director'
  ];
}

module.exports = {generateRandomMembers, getOrgTree};
