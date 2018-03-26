function ArticlesListController($location) {
    let vm = this;

    function onArticleClick(id) {
        $location.path('/' + id + '/edit');
    }

    function onPageUpdate(indices) {
        vm.page = vm.list.slice(indices.startIndex, indices.endIndex);
    }

    vm.onArticleClick = onArticleClick;
    vm.onPageUpdate = onPageUpdate;
}

module.exports = {
    name: 'articlesList',
    template: require('./articles-list.html'),
    controller: ArticlesListController,
    controllerAs: 'articlesListCtrl',
    bindings: {
        list: '<'
    }
};
