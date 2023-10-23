import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});
const uploadAvatar = async (avatar, username) => {

    var opt = {
        public_id: `${username.substring(0, 16).replace(" ", "-")}-${Date.now()}`,
        folder: 'jbfAvatar',
        resource_type: 'auto',
        upload_preset: 'jbf_preset'
    }
    // jbf_preset

    var avatar_Pid;
    await cloudinary.uploader.upload(avatar, opt, (error, result) => {
        if (error) {
            console.log(error)
        }
        console.log("avatar at signup upload done", result.public_id)
        avatar_Pid = result.public_id;
    })
    return avatar_Pid;
}
export default uploadAvatar;

