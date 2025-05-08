import { NextResponse } from 'next/server'

import connectDB from '@/lib/db'
import Saving from '@/models/Saving'

export async function POST(req: Request) {
  await connectDB()

  const { data } = await req.json()

  if (!data) return NextResponse.json(null)



  const found = await Saving.findById(data._id)

  if (!found) return NextResponse.json(null)

  await Saving.findOneAndDelete({ _id: found._id })

  if (found) {
    return NextResponse.json({ _id: found._id })
  } else {
    return NextResponse.json(null)
  }
}
