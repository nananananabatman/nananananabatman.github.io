function AppService($resource) {
    let list = [];

    function addNewArticle(task) {
        list.push(task);
    }

    function getList() {
        return list;
    }

    function getListPromise() {
        return $resource('./articles.json').get().$promise.then(data => {
            list = data.array

            return list;
        });
    }

    function getArticleById(id) {
        return list.find(item => item.id === id);
    }

    function isListExists() {
        return !!list.length;
    }

    function updateArticle(id, newTitle, newContent) {
        var article = list.find(item => item.id === id);

        article.title = newTitle;
        article.content = newContent;
    }

    return {
        addNewArticle: addNewArticle,
        getList: getList,
        getListPromise: getListPromise,
        getArticleById: getArticleById,
        isListExists: isListExists,
        updateArticle: updateArticle
    };
}

module.exports = AppService;
