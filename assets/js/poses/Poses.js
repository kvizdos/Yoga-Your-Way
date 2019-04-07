var PoseImageLocation = "./assets/images/poses/";

var PoseHandler = function() {
    this.sittingfloor = [],
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
            favs: this.favPoses
        }
    },
    this.setFav = (id) => {
        // set favorite
    },
    this.initialize = () => {        
        // Get all sitting/floor poses
        var sittingfloor = PoseList.filter((pose) => {
            return pose.category == "sittingfloor";
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

            let newPose = new Pose(p.name, p.description, `/assets/images/poses/${p.category}/${p.name.replace(/\ /g, "_").toLowerCase()}.svg`, p.category, p.duration);
        
            this.allposes.push(newPose);
            switch(p.category) {
                case "sittingfloor":
                    this.sittingfloor.push(newPose);
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
        localStorage.setItem('armbalance', JSON.stringify(this.armbalance));
        localStorage.setItem('backbending', JSON.stringify(this.backbending));
        localStorage.setItem('twisting', JSON.stringify(this.twisting));
        localStorage.setItem('allposes', JSON.stringify(this.allposes));

    }
}

var Pose = function(name, description, image, category, duration = 5) {
    this.name = name,
    this.description = description,
    this.image = image,
    this.category = category,
    this.duration = duration
}