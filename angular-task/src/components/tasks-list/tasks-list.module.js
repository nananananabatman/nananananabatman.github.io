let angular = require('angular'),
    tasksListComponent = require('./tasks-list.component');

module.exports = angular
    .module('tasksListModule', [])
    .component(tasksListComponent.name, tasksListComponent);
