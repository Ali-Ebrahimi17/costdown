'use client'

import { faker } from '@faker-js/faker'
import 'chart.js/auto'
import { defaults } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { ISaving, IStat } from '@/types'
import { MdHeight } from 'react-icons/md'
import { CURRENT_MONTH_NUM } from '@/lib/conatants'

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels, TimeScale)

defaults.color = 'white'
// defaults.font.family = 'Lato'

type Props = {
  chartData: IStat[] | []
  savingsData: ISaving[] | []
}

const BarChart = ({ chartData, savingsData }: Props) => {
  // const labels = ['PYFY', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'FYF']

  const labels = chartData.map((item) => item.month)
  const values = chartData.map((item) => item.value)
  const budget = chartData.map((item) => item.budget)
  const target = chartData.map((item) => item.target)

  const savings = chartData.map((elem) => {
    return savingsData
      .filter((saving) => elem.monthNum > CURRENT_MONTH_NUM && elem.monthNum > saving.cutInMonth)
      .reduce((acc, curr) => acc + curr.perUnit, 0)
  })

  const cost = values.map((elem, i) => {
    const foundSaving = savings[i]

    return elem - foundSaving
  })

  const largestCost = Math.max.apply(0, values)

  const chartMax = Math.ceil(largestCost / 50) * 50

  const colorArr = [
    '#cbd5e1',
    '#16a34a',
    '#16a34a',
    '#16a34a',
    '#fcb026',
    '#fcb026',
    '#fcb026',
    '#fcb026',
    '#fcb026',
    '#fcb026',
    '#fcb026',
    '#fcb026',
    '#fcb026',
    '#fcb026',
  ]

  const data = {
    labels,
    datasets: [
      {
        label: 'Budget',
        data: budget,
        backgroundColor: '#0284c7',
        borderColor: '#0284c7',
        type: 'line',
        pointStyle: false,
        pointRadius: 0,
        // borderWidth: 3,
        borderDash: [5, 2],
        datalabels: {
          display: false,
        },
        yAxisID: 'y1',
      },
      {
        label: 'Target',
        data: target,
        backgroundColor: '#e11d48',
        borderColor: '#e11d48',
        type: 'line',
        pointStyle: false,
        pointRadius: 0,
        // borderWidth: 3,
        borderDash: [5, 2],
        datalabels: {
          display: false,
        },
        yAxisID: 'y1',
      },
      {
        label: 'Forecast',
        // data: labels.map(() => faker.number.int({ min: 0.1, max: 3 })),
        data: cost,
        // borderColor: 'rgb(255, 99, 132)',
        backgroundColor: colorArr,
        borderRadius: 4,
        datalabels: {
          display: false,
        },
        yAxisID: 'y',
      },
      {
        label: 'Savings',
        // data: labels.map(() => faker.number.int({ min: 0.1, max: 3 })),
        data: savings,
        borderColor: colorArr,
        borderWidth: 2,
        backgroundColor: 'rgba(105, 105, 105, 0.6',
        borderRadius: 4,
        datalabels: {
          display: false,
        },
        yAxisID: 'y',
      },
    ],
  } as any

  const onClick = (event: any, clickedElements: any) => {
    if (clickedElements.length === 0) return
    const { dataIndex, raw } = clickedElements[0].element.$context // the value of the bar
    const barLabel = event.chart.data.labels[dataIndex] // the label of the bar

    // console.log(dataIndex)

    // let faults = dataArr[dataIndex].inspections.map((elem) => {
    //   return [...elem.failures]
    // })

    // console.log(faults.flat())

    // faultsHandler(faults.flat().sort((a, b) => new Date(a.failedAt) - new Date(b.failedAt)))
    // setBackgroundColors(barChartColorHandler(10, dataIndex, 'rgba(53, 162, 235, 0.5)', '#131e3a'))
    // setBorderWidths(barChartBorderWidthHandler(10, dataIndex, 3))

    // filterFaultsForModal(barLabel, 'fault')
  }

  const options = {
    onClick,
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: true,
    },
    layout: {
      padding: {
        top: 20,
      },
    },
    stacked: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          boxHeight: 2,
          // padding: 26,
        },
      },
      title: {
        display: false,
        // text: `${chartTitle}`,
        text: `Chart Title`,
        font: {
          size: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = `${context.dataset.label} : £${context.formattedValue}` || ''
            return label
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        stacked: true,
        grid: {
          display: false,
          color: '#544C4A',
        },
        // title: {
        //   display: true,
        //   text: 'Minutes',
        // },
        // min: 0,
        max: chartMax,
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90,
          font: {
            // family: 'LatoBold',
            size: 9,
            // weight: 'bold',
            // lineHeight: 1.2,
          },
          // Include a dollar sign in the ticks
          // callback: function (value, index, ticks) {
          // 	if (value % 5 === 0) {
          // 		return value
          // 	}
          // 	return null
          // },
        },
      },
      y: {
        type: 'linear',
        display: false,
        position: 'left',
        stacked: true,

        grid: {
          display: true,
          color: '#544C4A',
        },
        title: {
          display: false,
          text: 'Minutes',
        },
      },
      y1: {
        // min: 0,
        max: chartMax,
        type: 'linear',
        display: false,
        position: 'right',

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          let title = context.dataset.label
          // console.log(context)
          // console.log(dataArr[context.dataIndex].inspections)
          // context.label + ': ' + Math.round(context.formattedValue) + '%',

          // return 'DPU ' + title + ': ' + context.formattedValue
          return title + ': ' + context.formattedValue
        },
      },
      // titleFont: {
      //   weight: 'normal',
      // },
      // footerFont: {
      //   weight: 'normal',
      //   size: 15,
      // },
      // bodyFont: {
      //   size: 15,
      // },
    },
  } as any
  return <Bar options={options} data={data} plugins={[ChartDataLabels]} />
}

export default BarChart
