import React, { useState } from 'react'
import { Ring } from '@uiball/loaders'


const SignUpLoader = ({loading}) => {
    
    return (
        <div className='flex justify-center'>

           { loading && <Ring
                size={30}
                speed={1.5}
                color="white"
            />}
        </div>
    )
}

export default SignUpLoader
