const newRoutine = new Routine('Set my name!', "Set my description!", [], 0, "");

var CreatePage = function(RH, PH) {
    this.parent,
    this.RoutineHandler = RH,
    this.PoseHandler = PH,
    this.allPoses = [],
    this.registeredPoses = [],
    this.render = (parent) => {
        this.parent = parent;

        this.selectPoseContainer();
    },
    this.handleTaps = () => {
        const poses = this.allPoses;
        $('.selectPose').on('touchend', (e) => {
            let id = e.target.id !== '' ? e.target.id : e.target.parentNode.id
            let poseNum = parseInt(id.split("pose-")[1]);

            let poseCount = newRoutine.getPoses().length;
            let add = false;

            $('#' + id).toggleClass('selected');

            console.log('#' + id + " i");
            $('#' + id + " i")[0].style.transform = "rotate(360deg)";
        
            setTimeout(function() {

                if($('#' + id).hasClass('selected')) {
                    $('#' + id).html('<i class="fas fa-check"></i>');
                    newRoutine.addPose(poses[poseNum]);
                } else {
                    $('#' + id).html('<i class="fas fa-times"></i>');
                    newRoutine.removePose(poses[poseNum]);
                }

            }, 125)
        })
    },


    this.selectPoseContainer = () => {
        let poses = (this.PoseHandler.getPoses()).all;
        this.allPoses = poses;

        let SelectContainer = document.createElement('div');
        SelectContainer.id = "selectContainer";

        let createBtn = document.createElement('button');
        createBtn.innerText = "Continue";
        createBtn.id = "createBtn";
        createBtn.onclick = () => { this.setInfoPage() };

        let PoseList = document.createElement('div');
        PoseList.id = "listContainer";

        let PoseListHeader = document.createElement('p');
        PoseListHeader.className = "sectionHeader";
        PoseListHeader.innerText = "Select Poses:"

        let CatSelector = document.createElement('div');
            CatSelector.style.display = "flex";
            CatSelector.style.overflow = "scroll";
            CatSelector.style.width = "500vw";
        let CatAll = document.createElement('p');
            CatAll.innerText = "ALL";
        
        let CatSitFloor = document.createElement('p');
            CatSitFloor.innerText = "Sitting & Floor";
        
        let CatStanding = document.createElement('p');
            CatStanding.innerText = "Standing";
        
        let CatTwisting = document.createElement('p');
            CatTwisting.innerText = "Twisting";
        
        let CatBackbending = document.createElement('p');
            CatBackbending.innerText = "Backbending";
        
        CatSelector.appendChild(CatAll);
        CatSelector.appendChild(CatSitFloor);
        CatSelector.appendChild(CatStanding);
        CatSelector.appendChild(CatTwisting);
        CatSelector.appendChild(CatBackbending);

        // PoseListHeader.appendChild(CatSelector);

        PoseList.appendChild(PoseListHeader);

        for(pose in poses) {
            let PoseItem = document.createElement('div');
            PoseItem.className = "listItem";

            let PoseImage = document.createElement('img');
            PoseImage.src = poses[pose].image;

            let PoseName = document.createElement('p');

            let tc = poses[pose].category;
            let c = tc == "standing" ? "Standing Posture" :
                    tc == "sittingfloor" ? "Sitting and Floor Posture" : 
                    tc == "backbending" ? "Back-bending Posture" :
                    tc == "twisting" ? "Twist and Abdominal Toner" :
                    "Uncategorized";

            PoseName.innerHTML = `<strong>${poses[pose].name}</strong><br>${c}` ;

            let SelectPose = document.createElement('div');
            SelectPose.className = "selectPose";
            SelectPose.id = "pose-" + pose;

            let SelectPoseTxt = document.createElement('i');
            SelectPoseTxt.className = "fas fa-times";

            SelectPose.appendChild(SelectPoseTxt);

            PoseItem.appendChild(PoseImage);
            PoseItem.appendChild(SelectPose);
            PoseItem.appendChild(PoseName);
            PoseItem.appendChild(SelectPose);

            PoseList.appendChild(PoseItem);
        }

        PoseList.appendChild(document.createElement('br'));
        PoseList.appendChild(document.createElement('br'));
        PoseList.appendChild(document.createElement('br'));

        PoseList.appendChild(createBtn);

        SelectContainer.appendChild(PoseList);

        document.getElementById(this.parent.substr(1)).appendChild(SelectContainer);

    },
    this.setInfoPage = () => {
        let InfoContainer = document.createElement("div");
        InfoContainer.id = "infoContainer";

        let header = document.createElement('p');
        header.className = "sectionHeader";
        header.innerText = "Please fill out the fields below:"

        let setupBtn = document.createElement('button');
        setupBtn.innerText = "Create";
        setupBtn.id = "createBtn";
        setupBtn.onclick = () => { this.registerPose() };

        let routineNameInput = document.createElement('input');
        routineNameInput.name = "name";
        routineNameInput.id = "routineName";
        routineNameInput.placeholder = "Routine Name";

        let routineDescriptionInput = document.createElement('input');
        routineDescriptionInput.name = "description";
        routineDescriptionInput.id = "routineDescription";
        routineDescriptionInput.placeholder = "Routine Description";


        InfoContainer.appendChild(header);
        InfoContainer.appendChild(setupBtn);

        InfoContainer.appendChild(routineNameInput);
        InfoContainer.appendChild(document.createElement('br'));
        InfoContainer.appendChild(routineDescriptionInput);

        let poseHeader = document.createElement('p');
        poseHeader.className = "sectionHeader";
        poseHeader.innerText = "Confirm the poses below are in order:"

        InfoContainer.appendChild(poseHeader);

        // Render the list of poses
        if(true) {
            let PoseList = document.createElement('div');
            PoseList.id = "listContainerConfirmation";

            let poses = newRoutine.getPoses();

            for(pose in poses) {
                let PoseItem = document.createElement('div');
                PoseItem.className = "listItem";

                let PoseName = document.createElement('p');

                let tc = poses[pose].category;
                let c = tc == "standing" ? "Standing Posture" :
                        tc == "sittingfloor" ? "Sitting and Floor Posture" : 
                        tc == "backbending" ? "Back-bending Posture" :
                        tc == "twisting" ? "Twist and Abdominal Toner" :
                        "Uncategorized";

                PoseName.innerHTML = `<strong>${poses[pose].name}</strong><br>${c}` ;

                // PoseItem.appendChild(PoseImage);
                PoseItem.appendChild(PoseName);

                PoseList.appendChild(PoseItem);

                let newPose = this.PoseHandler.getPose(poses[pose].name);

                this.registeredPoses.push(newPose);
            }

            InfoContainer.appendChild(PoseList)

            $('#selectContainer').hide();

        }

        document.getElementById(this.parent.substr(1)).appendChild(InfoContainer);

    },

    this.registerPose = () => {
        let name = $('#routineName').val();
        let description = $('#routineDescription').val();

        if(name == '' || description == '') {alert("Please fill out all of the information."); return;}

        let PoseImageLocation = "./assets/images/poses/";
        let newRoutine = new Routine(name, description, this.registeredPoses, 15, PoseImageLocation + 't_pose_1.svg')

        this.RoutineHandler.addRoutine(newRoutine);

        window.location.reload();
    }
}