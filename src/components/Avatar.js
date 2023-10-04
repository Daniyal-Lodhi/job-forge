import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

const Avatar = ({avatar}) => {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dpbbbeutj'
        }
      }); 
const myImage = cld.image(avatar);
 
  return (
    <div>
      <AdvancedImage cldImg={myImage}  />
    </div>
  )
}

export default Avatar
