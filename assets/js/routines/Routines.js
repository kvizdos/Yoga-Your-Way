var PoseImageLocation = "./assets/images/poses/";

var Routine = function(name, description, poses, duration) {
    this.name = name,
    this.description = description,
    this.poses = poses,
    this.duration = duration,
    this.image = PoseImageLocation + name.replace(/\ /g, "_").toLowerCase() + ".svg";
}
