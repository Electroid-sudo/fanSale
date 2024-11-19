'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useRouter } from 'next/navigation'
import React from 'react'

const Nav = () => {
  const router = useRouter()
  return (
    <div>
        <div onClick={()=>router.push('/')} className="flex items-center hover:cursor-pointer gap-1 text-sm">
            <div className="">
                fanSALE
            </div>
            <Icon icon={'ic:round-greater-than'}/>
            <div className="">Pop & Rock</div>
            <Icon icon={'ic:round-greater-than'}/>
            <div className="">LAZZA</div>
            <Icon icon={'ic:round-greater-than'}/>
            <div className="">LAZZA</div>
            <Icon icon={'ic:round-greater-than'}/>
            <div className="">TORINO, mer 15/01/2025</div>
        </div>
        </div>
  )
}

export default Nav