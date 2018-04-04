var angular = require('angular'),
    paginatorComponent = require('./paginator.component');

module.exports = angular
    .module('paginatorModule', [])
    .component(paginatorComponent.name, paginatorComponent);
