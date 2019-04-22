var PoseImageLocation = "./assets/images/poses/";

var PoseHandler = function() {
    this.sittingfloor = [],
    this.standing =  [],
    this.twisting = [],
    this.backbending = [],
    this.armbalance = [],
    this.allposes = [],
    this.favPoses = [],
    this.addPose = (pose) => {
        this.getPoses.push(pose);
    },
    this.getPose = (name) => {
        let pose = this.allposes.filter((p) => {
            return p.name == name
        })[0]

        return pose;
    },
    this.getPoses = () => {
        return {
            all: this.allposes,
            sittingfloor: this.sittingfloor,
            twisting: this.twisting,
            backbending: this.backbending,
            armbalance: this.armbalance,
            standing: this.standing,
            favs: this.favPoses
        }
    },
    this.setFav = (id) => {
        // set favorite
    },
    this.initialize = () => {      
        console.warn("Initializing All Poses");  
        // Get all sitting/floor poses
        var sittingfloor = PoseList.filter((pose) => {
            return pose.category == "sittingfloor";
        })

        // Get standing poses
        var standing = PoseList.filter((pose) => {
            return pose.category == "standing";
        })

        // Get all twisting poses
        var twisting = PoseList.filter((pose) => {
            return pose.category == "twisting";
        })

        // Get all backbending poses
        var backbending = PoseList.filter((pose) => {
            return pose.category == "backbending";
        })

        // Get all arm balance poses
        var armbalance = PoseList.filter((pose) => {
            return pose.category == "armbalance";
        })

        // Register all poses
        for(pose in PoseList) {
            let p = PoseList[pose];

            let editedName = p.name.replace(/\ /g, "_").replace(/-/g, "_").toLowerCase();
            let usingCat = p.category;

            // if(editedName !== "half_moon_pose") {
            //     editedName = "t_pose";
            //     usingCat = "t_pose";
            // }

            let newPose = new Pose(p.name, p.description, `/assets/images/poses/${usingCat}/${editedName}/${editedName}_1.svg`, p.category, p.duration, p.amountOfImages);

            this.allposes.push(newPose);
            switch(p.category) {
                case "sittingfloor":
                    this.sittingfloor.push(newPose);
                    break;
                case "standing":
                    this.standing.push(newPose);
                    break;
                case "armbalance":
                    this.armbalance.push(newPose);
                    break;
                case "backbending":
                    this.backbending.push(newPose);
                    break;
                case "twisting":
                    this.twisting.push(newPose);
                    break;
            }
        }

        localStorage.setItem('sittingfloor', JSON.stringify(this.sittingfloor));
        localStorage.setItem('standing', JSON.stringify(this.standing));
        localStorage.setItem('armbalance', JSON.stringify(this.armbalance));
        localStorage.setItem('backbending', JSON.stringify(this.backbending));
        localStorage.setItem('twisting', JSON.stringify(this.twisting));
        localStorage.setItem('allposes', JSON.stringify(this.allposes));

    }
}

var Pose = function(name, description, image, category, duration = 5, amountOfImages = 0) {
    this.name = name,
    this.description = description,
    this.image = './' + image,
    this.amountOfImages = amountOfImages,
    this.category = category,
    this.duration = duration,
    this.audio = image.replace("_1.svg", ".mp3"),
    console.log(this.audio);
}