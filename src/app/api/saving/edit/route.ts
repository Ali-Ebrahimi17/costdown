import { NextResponse } from 'next/server'

import connectDB from '@/lib/db'
import Saving from '@/models/Saving'
import { ISaving } from '@/types'
import { TOTAL_VOLUME } from '@/lib/conatants'
// api/user/fetch-by-id
export async function PUT(req: Request) {
  await connectDB()

  const { data } = await req.json()

  if (!data) return NextResponse.json(null)

  const totalVolume = TOTAL_VOLUME

  const perUnit = +data.saving / totalVolume
  const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const cutInMonth = monthsArr.indexOf(data.cutInMonth) + 1
  const saving = +data.saving

  const fixedCutIn = cutInMonth === 0 ? 99 : cutInMonth

  const newData = {
    description: data.description,
    perUnit: +perUnit.toFixed(2),
    cutInMonth: fixedCutIn,
    saving,
    inForecast: data.inForecast,
    owner: data.owner,
  }

  const found = await Saving.findById(data._id)

  await Saving.findByIdAndUpdate(data._id, newData)

  if (found) {
    await Saving.findByIdAndUpdate(data._id, newData)
    return NextResponse.json(found)
  } else {
    return NextResponse.json(null)
  }
}
