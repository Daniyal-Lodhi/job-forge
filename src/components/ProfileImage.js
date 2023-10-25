import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

const ProfileImage = ({profileImage}) => {

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dpbbbeutj'
    }
  });

  // cld.image returns a CloudinaryImage with the configuration set.
  const myImage = cld.image(profileImage);


  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  )
};
export default ProfileImage;