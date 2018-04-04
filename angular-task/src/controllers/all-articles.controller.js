function AllArticlesController($location, articleService) {
    var vm = this;

    function addArticle() {
        $location.path('/add');
    }

    (function onInit() {
        if (articleService.isListExists()) {
            vm.articleList = articleService.getList();
        } else {
            articleService.getListPromise().then(function(data) {
                vm.articleList = data;
            })
        };
    })();

    vm.addArticle = addArticle;
}

module.exports = AllArticlesController;
