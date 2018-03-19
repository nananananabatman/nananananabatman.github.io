function AppService($resource) {
    let list;

    function addNewTask(task) {
        list.push(task);
    }

    function getList() {
        return list;
    }

    function getListPromise() {
        return $resource('./todo.json').get().$promise.then(data => {
            list = data.array

            return list;
        });
    }

    function getStringDate(date) {
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }

    function getTaskById(id) {
        return list.find(item => item.id === id);
    }

    function isListExists() {
        return !!list;
    }

    function updateTaskStatus(id) {
        let task = getTaskById(id);

        task.done = !task.done;
    }

    function updateTaskText(id, newText) {
        list.find(item => item.id === id).text = newText;
    }

    return {
        addNewTask: addNewTask,
        getList: getList,
        getListPromise: getListPromise,
        getStringDate: getStringDate,
        getTaskById: getTaskById,
        isListExists: isListExists,
        updateTaskStatus: updateTaskStatus,
        updateTaskText: updateTaskText
    };
}

module.exports = AppService;
