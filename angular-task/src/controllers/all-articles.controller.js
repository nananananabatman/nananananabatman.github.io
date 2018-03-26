function AllArticlesController($location, articleService) {
    let vm = this;

    function addArticle() {
        $location.path('/add');
    }

    (function onInit() {
        if (articleService.isListExists()) {
            vm.articleList = articleService.getList();
        } else {
            articleService.getListPromise().then(data => {
                vm.articleList = data;
            })
        };
    })();

    vm.addArticle = addArticle;
}

module.exports = AllArticlesController;
