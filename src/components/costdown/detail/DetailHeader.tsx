'use client'

import { TOTAL_VOLUME, TOTAL_VOLUME_ARR } from '@/lib/conatants'
import { ICategory } from '@/types'
import React from 'react'

type Props = {
  category: ICategory
}

export default function DetailHeader({ category }: Props) {
  const targetSaving = +((category?.budget - category?.target) * TOTAL_VOLUME).toFixed(2)

  let monthNumArr = [...Array(14).keys()]

  const commSavingArr = monthNumArr.map((num) => {
    const saving = category.savings.filter((item) => item.cutInMonth < num).reduce((acc, curr) => acc + curr.perUnit, 0)

    return +saving.toFixed(2)
  })

  const annualisedSaving = (commSavingArr[13] * TOTAL_VOLUME).toLocaleString()

  const calendarisedSavingArr = commSavingArr.map((item, i) => {
    let num = 0

    if (i > 1) {
      let sum = commSavingArr[i] - commSavingArr[i - 1]
      let totalOfTotArr = TOTAL_VOLUME_ARR.filter((_, index) => index < i).reduce((acc, curr) => acc + curr, 0)
      let times = TOTAL_VOLUME - totalOfTotArr
      num = sum * times
    }

    return num
  })

  const calendarisedSaving = calendarisedSavingArr.reduce((acc, curr) => acc + curr, 0).toLocaleString()

  return (
    <div className='flex justify-evenly mb-8 flex-wrap gap-2'>
      <div className='w-30w bg-background border border-gray-600 rounded-md flex justify-between min-w-[300px] text-center'>
        <div className='flex justify-evenly w-100 p-2 '>
          <div>
            <div>Target Saving</div>
            <div className='font-LatoBold'>£{targetSaving.toLocaleString()}</div>
          </div>
          <div>
            <div>Calendarised Saving</div>
            <div className='font-LatoBold'>£{calendarisedSaving}</div>
          </div>
          <div>
            <div>Annualised Saving</div>
            <div className='font-LatoBold'>£{annualisedSaving}</div>
          </div>
        </div>
      </div>
      <div className='w-30w bg-background border border-gray-600 rounded-md flex justify-between min-w-[300px] text-center'>
        <div className='flex justify-around w-100 p-2'>
          <div>
            <div>Forecast</div>
            <div className='font-LatoBold'>£{+category.forecast.toFixed(2).toLocaleString()}</div>
          </div>
          <div>
            <div>Budget</div>
            <div className='font-LatoBold'>£{+category?.budget.toFixed(2).toLocaleString()}</div>
          </div>
          <div>
            <div>Target</div>
            <div className='font-LatoBold'>£{+category?.target.toFixed(2).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
