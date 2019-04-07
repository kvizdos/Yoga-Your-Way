try {
    var _RoutineHandler = new routineList('routineContainer', '.prevRoutine', '.currRoutine', '.nextRoutine');
    var _PoseHandler = new PoseHandler();
    var _Navbar = new Navbar(0);
    var _StartPage = new StartPage();
    var _CreatePage = new CreatePage(_RoutineHandler, _PoseHandler);
} catch(err) {
    window.location = window.location;
}

var routines = _RoutineHandler.getRoutines();

var PoseImageLocation = "./assets/images/poses/";

var Load = () => {
    _PoseHandler.initialize();

    if(routines.length == 0) {

        var warmupPoses = [];
        let warmupPose1 = _PoseHandler.getPose("Corpse Pose");
        let warmupPose2 = _PoseHandler.getPose("Child Pose");
        let warmupPose3 = _PoseHandler.getPose("Double Leg Raises");

        warmupPoses.push(warmupPose1);
        warmupPoses.push(warmupPose2);
        warmupPoses.push(warmupPose3);

        var warmupRoutine = new Routine('Warmup Routine', 'This is the warmup routine for each day.', warmupPoses, '12 minutes', PoseImageLocation + 't_pose_1.svg');
        var middleRoutine = new Routine('Middle Routine', 'This is the middle routine for each day.', [], '8 minutes', PoseImageLocation + 't_pose_2.svg');
        var cooldownRoutine = new Routine('Cooldown Routine', 'This is the cooldown routine for each day.', [], '20 minutes', PoseImageLocation + 't_pose_3.svg');

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
        _CreatePage.render(parent);
        _CreatePage.handleTaps();
    });
    _Navbar.addPage('Settings', 'cog', true, (parent) => {
        $(parent).append("Settings page");
    });

    _Navbar.addPage('Start', '', false, (parent) => {
        _StartPage.render(parent, "routine");
    });
    
}
