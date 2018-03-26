function AddArticleController($location, articleService) {
    let vm = this;

    function onArticleChange() {
        articleService.addNewArticle({
            title: vm.title,
            content: vm.content,
            id: Math.random().toString(36).substr(2, 5)
        });

        $location.path('/');
    }

    vm.heading = 'Add a new article';
    vm.onArticleChange = onArticleChange;
}

module.exports = AddArticleController;
