import { NextResponse } from 'next/server'

import connectDB from '@/lib/db'
import Saving from '@/models/Saving'
import { ISaving } from '@/types'
import { TOTAL_VOLUME } from '@/lib/conatants'
// api/user/fetch-by-id
export async function POST(req: Request) {
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
    ...data,
    perUnit: +perUnit.toFixed(2),
    cutInMonth: fixedCutIn,
    saving,
  }

  const created = await Saving.create(newData)

  if (created) {
    return NextResponse.json(created)
  } else {
    return NextResponse.json(null)
  }
}
