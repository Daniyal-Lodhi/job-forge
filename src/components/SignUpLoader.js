import React, { useState } from 'react'
import { Ring } from '@uiball/loaders'


const SignUpLoader = ({loading,color,size}) => {
    
    return (
        <div className='flex justify-center'>

           { loading && <Ring
                size = {size || 30}
                speed={1.5}
                color={`${color?color:'white'}`}
            />}
        </div>
    )
}

export default SignUpLoader
