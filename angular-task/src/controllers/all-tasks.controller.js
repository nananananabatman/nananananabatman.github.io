function AllTasksController($location, todoService) {
    let vm = this;

    function addTask() {
        $location.path('/add');
    }

    function filterTodos() {
        vm.filteredList = {
            doneTasks: [],
            newTasks: []
        };

        vm.todoList.forEach(item => {
            if (item.done) {
                vm.filteredList.doneTasks.push(item);
            } else {
                vm.filteredList.newTasks.push(item);
            }
        });
    }

    function onDateChange() {
        let filterByDate = item => item.date === todoService.getStringDate(vm.date);

        filterTodos();

        if (vm.date) {
            vm.filteredList.doneTasks = vm.filteredList.doneTasks.filter(filterByDate);
            vm.filteredList.newTasks = vm.filteredList.newTasks.filter(filterByDate);
        }
    }

    function onTextChange() {
        let filterByText = item => item.text[0] === vm.letter;

        filterTodos();

        if (vm.letter.length === 1) {
            vm.filteredList.doneTasks = vm.filteredList.doneTasks.filter(filterByText);
            vm.filteredList.newTasks = vm.filteredList.newTasks.filter(filterByText);
        }
    }

    function updateData(newList) {
        vm.todoList = newList;
        filterTodos();
    }

    function updateTaskStatus(id) {
        todoService.updateTaskStatus(id);
        updateData(todoService.getList());
    }

    (function onInit() {
        if (todoService.isListExists()) {
            updateData(todoService.getList());
        } else {
            todoService.getListPromise().then(data => updateData(data))
        };
    })();

    vm.addTask = addTask;
    vm.onDateChange = onDateChange;
    vm.onTextChange = onTextChange;
    vm.updateTaskStatus = updateTaskStatus;
}

module.exports = AllTasksController;
