import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import { notFound } from 'next/navigation'

const Wallet = async () => {

  const session = await getServerSession(authOptions);
  if(!session) notFound()
  console.log(session.user.id)

  return (
    <div>Wallet</div>
  )
}

export default Wallet