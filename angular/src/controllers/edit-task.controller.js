function EditTaskController($location, $routeParams, todoService) {
    let vm = this;

    function onTextChange() {
        todoService.updateTaskText(vm.task.id, vm.text);
        $location.path('/');
    }

    vm.heading = 'Edit a task';
    vm.onTextChange = onTextChange;
    vm.task = todoService.getTaskById($routeParams.id);
    vm.text = vm.task.text;
}

module.exports = EditTaskController;
