import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SuccessPage = () => {
  return (
    <div className='w-full h-[60vh] flex items-center justify-center flex-col mt-10'>

        <Image src='/success1.avif' alt='Successfull' width={350} height={350}/>
        <h1 className='mb-8 text-3xl mt-2 font-bold uppercase text-green-600'>Order Successfull</h1>
       <div className='flex gap-3 items-center justify-center'>
       <Link href='/'>
            <button className='border p-4 bg-black text-white rounded'>Go to Home</button>
        </Link>
       <Link href='/order'>
            <button className='border p-4 bg-black text-white rounded'>View Order</button>
        </Link>
       </div>
    </div>
  )
}

export default SuccessPage