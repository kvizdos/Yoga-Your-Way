var Routine = function(name, description, poses, duration, image) {
    this.name = name,
    this.description = description,
    this.poses = poses,
    this.duration = duration,
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
