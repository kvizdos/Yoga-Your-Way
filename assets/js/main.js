var _RoutineHandler = new routineList('routineContainer', '.prevRoutine', '.currRoutine', '.nextRoutine');
var routines = _RoutineHandler.getRoutines();

var _Navbar = new Navbar(0);


var Load = () => {
    if(routines.length == 0) {
        var warmupRoutine = new Routine('Warmup Routine', 'This is the warmup routine for each day.', [], '12 minutes');
        var middleRoutine = new Routine('Middle Routine', 'This is the middle routine for each day.', [], '8 minutes');
        var cooldownRoutine = new Routine('Cooldown Routine', 'This is the cooldown routine for each day.', [], '20 minutes');
    
        _RoutineHandler.addRoutine(warmupRoutine);
        _RoutineHandler.addRoutine(middleRoutine);
        _RoutineHandler.addRoutine(cooldownRoutine);

    } 

    _Navbar.addPage('Browse', 'book-open', true, (parent) => {
        routines = _RoutineHandler.setup(parent);
        _RoutineHandler.render();
        _RoutineHandler.handleSwipes();
    });
    _Navbar.addPage('Create', 'plus', true, (parent) => {
        $(parent).append("Create page");
    });
    _Navbar.addPage('Settings', 'cog', true, (parent) => {
        $(parent).append("Settings page");
    });

    _Navbar.addPage('Play', 'cog', false, (parent) => {
        $(parent).append("Play page");
    });
}
