'use server'

import User from '@/models/User'
import { userData } from '@/db_seed_data/userData'
import bcrypt from 'bcryptjs'
import socket from '@/lib/socket'

import connectDB from '@/lib/db'

export const startInspection = async (bay: string, serialNumber: string) => {
  await connectDB()
  try {
    console.log('BAY => ', bay)
    console.log('SERIAL => ', serialNumber)
    // ? web socket test start

    let data = {
      serial: serialNumber,
      bay: bay,
    }
    console.log('started')
    socket.emit('start', data)

    return { success: true }
  } catch (error) {
    console.log(error)
    throw error
  }
}
export const endInspection = async (bay: string) => {
  await connectDB()
  try {
    console.log(bay)
    // ? web socket test start
    console.log('end')
    socket.emit('end', { bay })

    // setTimeout(function () {
    //   console.log('finished')
    //   socket.emit('dpuUpdating', false)
    // }, 3000)

    return { success: true }
  } catch (error) {
    console.log(error)
    throw error
  }
}
