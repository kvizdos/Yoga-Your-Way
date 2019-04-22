var Routine = function(name, description, poses, duration, image) {
    this.name = name,
    this.description = description,
    this.poses = poses,
    this.getDuration = () => {
        let total = 0;
        for(pose of this.poses) {
            total += pose.duration;
        }
        return Math.ceil(total / 60);
    },
    this.duration = "~" + this.getDuration() + " minutes";
    this.image = image,
    this.getPoses = () => {
        return this.poses;
    },
    this.addPose = (pose) => {
        this.poses.push(pose);
    },
    this.removePose = (pose) => {
        this.poses = this.poses.filter((p) => {
            return p.name !== pose.name
        })
    }
}
