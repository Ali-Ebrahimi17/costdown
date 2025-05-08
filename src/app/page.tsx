import BarChart from '@/components/charts/demo/BarChart'
import LandingPageCharts from '@/components/costdown/landing-page/LandingPageCharts'
import SummaryHeader from '@/components/costdown/landing-page/SummaryHeader'
import { notFound } from 'next/navigation'

import MainHeader from '@/components/layout/MainHeader'
import { getGraphData } from './actions/costActions'

export default async function Home() {
  const data = await getGraphData()

  if (!data) return notFound()

  const categories = data.categories

  return (
    <>
      <MainHeader mainText='Costdown' subText='Loadall' />

      {/* <SummaryHeader categories={categories} /> */}
      <LandingPageCharts categories={categories} />
    </>
  )
}
