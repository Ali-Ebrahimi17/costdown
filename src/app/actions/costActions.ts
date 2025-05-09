'use server'

import connectDB from '@/lib/db'
import { capitalizeFirstLetterOfAllWords, stringifyForComponent } from '@/lib/helper_functions'
import Category from '@/models/Category'
import Stat from '@/models/Stat'
import Saving from '@/models/Saving'
import { ICategory, IStat, ISaving } from '@/types'

export const getGraphData = async () => {
  try {
    await connectDB()

    const categories = await Category.find().lean()
    const stats = await Stat.find().lean()
    const savings = await Saving.find({ inForecast: 'No' }).lean()

    const populatedCategories = categories.map((item) => {
      const foundStats = stats.filter((elem: IStat) => elem.name === item.name).sort((a, b) => a.monthNum - b.monthNum)
      const savingsArr = savings.filter((sav) => sav.categoryId === item._id.toString()).sort()

      const fyfStat = foundStats.find((stat) => stat.month == 'FYF')

      const catValue = fyfStat ? fyfStat.value : 0
      const catBudget = fyfStat ? fyfStat.budget : 0

      const catTarget = item.name === 'Direct Labour' ? catValue * 0.966491377 : catBudget * 0.9

      let obj = {
        ...item,
        forecast: catValue,
        budget: catBudget,
        target: catTarget,
        monthlyData: foundStats,
        savings: savingsArr,
      }
      return obj
    })

    let names = ['nonbom', 'vpo']

    const totals = []

    for (let name of names) {
      const cats = categories.filter((cat) => cat.group === name)
      const ids = cats.map((cat) => cat._id.toString())

      const names = cats.map((cat) => cat.name)

      const monthNumbers = [...Array(14).keys()]

      const foundStats = stats.filter((elem: IStat) => names.includes(elem.name))

      const statsArr = monthNumbers.map((mon) => {
        const foundName = foundStats.find((item) => item.monthNum === mon)
        let foundMonth = foundName ? foundName.month : 'n/a'

        const valueSum = foundStats.filter((stat) => stat.monthNum === mon).reduce((acc, curr) => acc + curr.value, 0)
        const targetSum = foundStats.filter((stat) => stat.monthNum === mon).reduce((acc, curr) => acc + curr.target, 0)
        const budgetSum = foundStats.filter((stat) => stat.monthNum === mon).reduce((acc, curr) => acc + curr.budget, 0)

        let obj = {
          month: foundMonth,
          monthNum: mon,
          value: valueSum,
          budget: budgetSum,
          target: targetSum,
        }
        return obj
      })

      const savingsArr = savings.filter((sav) => ids.includes(sav.categoryId)).sort()

      let title = name === 'nonbom' ? 'Total Non-Bom' : 'Total VPO'

      let obj = {
        _id: name,
        name: title,
        ownerName: 'John Godfrey',
        monthlyData: statsArr.sort((a, b) => a.monthNum - b.monthNum),
        savings: savingsArr,
        budget: statsArr.sort((a, b) => a.monthNum - b.monthNum)[statsArr.length - 1].budget,
        forecast: statsArr.sort((a, b) => a.monthNum - b.monthNum)[statsArr.length - 1].value,
        target: statsArr.sort((a, b) => a.monthNum - b.monthNum)[statsArr.length - 1].value * 0.9,
      }
      totals.push(obj)
    }

    return {
      categories: stringifyForComponent([...populatedCategories, ...totals]),
    }
  } catch (error) {
    console.log(error)
  }
}

export const getGraphDataById = async (id: string) => {
  try {
    await connectDB()

    const totals = ['nonbom', 'vpo']

    if (totals.includes(id)) {
      const categories = await Category.find({ group: id }).lean()
      const stats = await Stat.find().lean()
      const savings = await Saving.find().lean()

      const totals = []

      const names = [id]
      for (let name of names) {
        const cats = categories.filter((cat) => cat.group === name)
        const ids = categories.map((cat) => cat._id.toString())

        const names = cats.map((cat) => cat.name)

        const monthNumbers = [...Array(14).keys()]

        const foundStats = stats.filter((elem: IStat) => names.includes(elem.name))

        const statsArr = monthNumbers.map((mon) => {
          const foundName = foundStats.find((item) => item.monthNum === mon)
          let foundMonth = foundName ? foundName.month : 'n/a'

          const valueSum = foundStats.filter((stat) => stat.monthNum === mon).reduce((acc, curr) => acc + curr.value, 0)
          const targetSum = foundStats.filter((stat) => stat.monthNum === mon).reduce((acc, curr) => acc + curr.target, 0)
          const budgetSum = foundStats.filter((stat) => stat.monthNum === mon).reduce((acc, curr) => acc + curr.budget, 0)

          let obj = {
            month: foundMonth,
            monthNum: mon,
            value: valueSum,
            budget: budgetSum,
            target: targetSum,
          }
          return obj
        })

        const savingsArr = savings
          .filter((sav) => ids.includes(sav.categoryId))
          .map((item) => {
            const foundCat = categories.find((i) => i._id.toString() === item.categoryId)

            const description = foundCat ? foundCat.name : item.description

            let obj = {
              ...item,
              description,
            }
            return obj
          })
          .sort()

        let title = name === 'nonbom' ? 'Total Non-Bom' : 'Total VPO'

        let obj = {
          _id: name,
          name: title,
          ownerName: 'John Godfrey',
          monthlyData: statsArr.sort((a, b) => a.monthNum - b.monthNum),
          savings: savingsArr,
          budget: statsArr.sort((a, b) => a.monthNum - b.monthNum)[statsArr.length - 1].budget,
          forecast: statsArr.sort((a, b) => a.monthNum - b.monthNum)[statsArr.length - 1].value,
          target: statsArr.sort((a, b) => a.monthNum - b.monthNum)[statsArr.length - 1].target,
        }
        totals.push(obj)
      }

      return {
        category: stringifyForComponent(totals),
      }
    } else {
      const category = await Category.findById(id).lean()
      if (!category) return null

      const foundStats = await Stat.find({ name: category.name }).sort({ monthNum: 1 }).lean()
      const savingsArr = await Saving.find({ categoryId: id })

      const fyfStat = foundStats.find((stat) => stat.month == 'FYF')

      const catValue = fyfStat ? fyfStat.value : 0
      const catBudget = fyfStat ? fyfStat.budget : 0

      const catTarget = category.name === 'Direct Labour' ? catValue * 0.966491377 : catBudget * 0.9

      const populatedCategory = {
        ...category,
        forecast: catValue,
        budget: catBudget,
        target: catTarget,
        monthlyData: foundStats,
        savings: savingsArr,
      }

      return {
        category: stringifyForComponent([populatedCategory]),
      }
    }
  } catch (error) {
    console.log(error)
  }
}
