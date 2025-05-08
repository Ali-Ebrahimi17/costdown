'use client'

import BarChart from '@/components/charts/demo/BarChart'
import { ICategory, IStat } from '@/types'
import Link from 'next/link'

type Props = {
  categories: ICategory[]
}

export default function LandingPageCharts({ categories }: Props) {
  return (
    <section className='flex justift-center w-100'>
      <div className='flex flex-wrap gap-2 justify-around'>
        {categories.map((cat) => {
          return (
            <Link
              href={`/detail/${cat._id}`}
              key={cat._id}
              className='bg-background w-[355px] mb-1 h-64 rounded-md p-2 border border-gray-600 cursor-pointer hover:text-jcb transition duration-400 ease-in-out hover:scale-105'
            >
              <div className='text-lg font-LatoBold'>{cat.name}</div>
              <div className='text-md text-gray-400 text-sm mt-1'>Owner: {cat.ownerName}</div>
              <div className='h-[150px] -mt-4'>
                <BarChart chartData={cat.monthlyData} savingsData={cat.savings} />
              </div>
              <div className='flex justify-evenly text-sm mt-2 text-center text-gray-300 font-LatoBold'>
                <div>
                  <div>Forecast</div>
                  <div>£{cat.forecast}</div>
                </div>
                <div>
                  <div>Budget</div>
                  <div>£{cat.budget}</div>
                </div>
                <div>
                  <div>Target</div>
                  <div>£{Math.round(cat.budget * 0.9).toLocaleString()}</div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
