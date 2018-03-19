function TasksListController($location) {
    let vm = this;

    function onDaysChange() {
        if (vm.daysFilter) {
            vm.filteredList = vm.list.filter(item => {
                return (new Date() - new Date(item.date)) / 1000 / 60 / 60 / 24 <= vm.daysFilter;
            });
        }
    }

    function onTaskClick(id) {
        $location.path('/' + id + '/edit');
    }

    function updateStatus(id) {
        vm.updateTaskStatus({id: id});
    }

    vm.onDaysChange = onDaysChange;
    vm.onTaskClick = onTaskClick;
    vm.updateStatus = updateStatus;
}

module.exports = {
    name: 'tasksList',
    template: require('./tasks-list.html'),
    controller: TasksListController,
    controllerAs: 'tasksListCtrl',
    bindings: {
        list: '<',
        newTasks: '@',
        tasksTitle: '@',
        updateTaskStatus: '&'
    }
};
