function EditArticleController($location, $routeParams, articleService) {
    let vm = this;

    function onArticleChange() {
        articleService.updateArticle(vm.article.id, vm.title, vm.content);
        $location.path('/');
    }

    vm.heading = 'Edit an article';
    vm.onArticleChange = onArticleChange;
    vm.article = articleService.getArticleById($routeParams.id);
    vm.content = vm.article.content;
    vm.title = vm.article.title;
}

module.exports = EditArticleController;
