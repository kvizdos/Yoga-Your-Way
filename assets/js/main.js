try {
    var _RoutineHandler = new routineList('routineContainer', '.prevRoutine', '.currRoutine', '.nextRoutine');
    var _PoseHandler = new PoseHandler();
    var _Navbar = new Navbar(0);
    var _StartPage = new StartPage();
    var _CreatePage = new CreatePage(_RoutineHandler, _PoseHandler);
    var _SettingsPage = new SettingsPage('settingsContainer');
    const _SettingsHandler = new SettingsHandler();
} catch(err) {
    window.location = window.location;
}

var routines = _RoutineHandler.getRoutines();

var PoseImageLocation = "./assets/images/poses/";

var Load = () => {
    $('body').append('<div id="pageHolder"></div>');

    _PoseHandler.initialize();
    if(_SettingsHandler.getSetting('voice') == "") _SettingsHandler.setup();

    if(routines.length == 0) {
        var warmupPoses = [];
        let warmupPose1 = _PoseHandler.getPose("Half-Moon Pose");

        warmupPoses.push(warmupPose1);

        var warmupRoutine = new Routine('Warmup Routine', 'This is the warmup routine for each day.', warmupPoses, '12 minutes', PoseImageLocation + 'standing/half_moon_pose/half_moon_pose_1.svg');
    
        _RoutineHandler.addRoutine(warmupRoutine);
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
        _SettingsPage.render(parent);
    });

    _Navbar.addPage('Start', '', false, (parent) => {
        _StartPage.render(parent, "routine");
    });
    
}
