import { getGraphDataById } from '@/app/actions/costActions'

import BarChartInfo from '@/components/charts/demo/BarChartInfo'
import DetailHeader from '@/components/costdown/detail/DetailHeader'
import MainHeader from '@/components/layout/MainHeader'
import SavingsTable from '@/components/tables/savingsTable'

import { notFound } from 'next/navigation'

type Props = {
  params: { id: string }
}

export default async function CostDetailPage({ params }: Props) {
  const id = params.id

  const data = await getGraphDataById(id)

  if (!data) return notFound()

  if (data.category.length === 0) {
    return notFound()
  }

  return (
    <div>
      <MainHeader mainText={`${data.category[0].name}`} subText={`${data.category[0].ownerName} ` || 'TBC'} />
      <DetailHeader category={data.category[0]} />
      <div className='flex flex-wrap gap-8 justify-evenly'>
        <div className='w-6/12 h-[600px]  rounded-md min-w-96'>
          <div className='text-2xl text-center font-LatoBold mt-1'>Monthly Cost Breakdown</div>
          <div className='w-full h-[550px]'>
            <BarChartInfo chartData={data.category[0].monthlyData} savingsData={data.category[0].savings} />
          </div>
        </div>
        <div className='flex flex-1 w-full h-[600px] rounded-md'>
          <div>
            <div className='text-2xl text-center font-LatoBold mt-1 mb-3'>Saving Opportunities</div>
            <div className='w-full h-[520px] flex '>
              <SavingsTable category={data.category[0]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
