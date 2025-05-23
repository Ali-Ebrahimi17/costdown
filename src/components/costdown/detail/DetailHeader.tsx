'use client'

import { TOTAL_VOLUME, TOTAL_VOLUME_ARR } from '@/lib/conatants'
import { formatToCurrency } from '@/lib/helper_functions'
import { ICategory } from '@/types'
import React from 'react'

type Props = {
  category: ICategory
}

export default function DetailHeader({ category }: Props) {
  const targetSaving = +((category?.budget - category?.target) * TOTAL_VOLUME)

  let monthNumArr = [...Array(14).keys()]

  const commSavingArr = monthNumArr.map((num) => {
    const saving = category.savings.filter((item) => item.cutInMonth < num).reduce((acc, curr) => acc + curr.perUnit, 0)

    return +saving
  })

  const annualisedSaving = commSavingArr[13] * TOTAL_VOLUME

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

  const calendarisedSaving = calendarisedSavingArr.reduce((acc, curr) => acc + curr, 0)

  return (
    <div className='flex justify-evenly mb-8 flex-wrap gap-2'>
      <div className='w-30w bg-background border border-gray-600 rounded-md flex justify-between min-w-[300px] text-center'>
        <div className='flex justify-evenly w-100 p-2 '>
          <div>
            <div>Target Saving</div>
            <div className='font-LatoBold'>{formatToCurrency(targetSaving)}</div>
          </div>
          <div>
            <div>Calendarised Saving</div>
            <div className='font-LatoBold'>{formatToCurrency(calendarisedSaving)}</div>
          </div>
          <div>
            <div>Annualised Saving</div>
            <div className='font-LatoBold'>{formatToCurrency(annualisedSaving)}</div>
          </div>
        </div>
      </div>
      <div className='w-30w bg-background border border-gray-600 rounded-md flex justify-between min-w-[300px] text-center'>
        <div className='flex justify-around w-100 p-2'>
          <div>
            <div>Forecast</div>
            <div className='font-LatoBold'>{formatToCurrency(category.forecast)}</div>
          </div>
          <div>
            <div>Budget</div>
            <div className='font-LatoBold'>{formatToCurrency(category?.budget)}</div>
          </div>
          <div>
            <div>Target</div>
            <div className='font-LatoBold'>{formatToCurrency(category?.target)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
