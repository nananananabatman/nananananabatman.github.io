var ELEMENTS_ON_PAGE = 5;

function PaginatorController($timeout) {
    var vm = this;

    function onInit() {
        vm.pages = [];

        $timeout(function() {
            for (var i = 0; i < Math.ceil(vm.articlesCount / ELEMENTS_ON_PAGE); ++i) {
                vm.pages.push({
                    startIndex: i * ELEMENTS_ON_PAGE,
                    endIndex: i * ELEMENTS_ON_PAGE + ELEMENTS_ON_PAGE
                });
            }

            vm.setPage(0);
        }, 0);
    }

    function setPage(pageIndex) {
        vm.updatePage({indices: vm.pages[pageIndex]});
    }

    vm.$onInit = onInit;
    vm.setPage = setPage;
}

module.exports = {
    name: 'paginator',
    template: require('./paginator.html'),
    controller: PaginatorController,
    controllerAs: 'paginatorCtrl',
    bindings: {
        articlesCount: '<',
        updatePage: '&'
    }
};
