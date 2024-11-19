import React from 'react'
import {Loader} from 'lucide-react'

const Loading = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <Loader size={150} color='rgba(0, 136, 202, 0.75) ' className='animate-spin delay-[5000ms]'/>
    </div>
  )
}

export default Loading