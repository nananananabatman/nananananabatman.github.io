let angular = require('angular'),
    articlesListComponent = require('./articles-list.component');

require('../paginator/paginator.module');

module.exports = angular
    .module('articlesListModule', ['paginatorModule'])
    .component(articlesListComponent.name, articlesListComponent);
