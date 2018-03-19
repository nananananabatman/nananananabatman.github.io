function AddTaskController($location, todoService) {
    let vm = this;

    function onTextChange() {
        let today = new Date();

        todoService.addNewTask({
            text: vm.text,
            date: todoService.getStringDate(today),
            done: false,
            id: Math.random().toString(36).substr(2, 5)
        });

        $location.path('/');
    }

    vm.heading = 'Add a new task';
    vm.onTextChange = onTextChange;
}

module.exports = AddTaskController;
