'use server'

import connectDB from '@/lib/db'
import { stringifyForComponent } from '@/lib/helper_functions'
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

      let obj = {
        ...item,
        monthlyData: foundStats,
        savings: savingsArr,
      }
      return obj
    })

    return {
      categories: stringifyForComponent(populatedCategories),
    }
  } catch (error) {
    console.log(error)
  }
}

export const getGraphDataById = async (id: string) => {
  try {
    await connectDB()

    const category = await Category.findById(id).lean()
    if (!category) return null

    const stats = await Stat.find({ name: category.name }).sort({ monthNum: 1 }).lean()
    const savingsArr = await Saving.find({ categoryId: id })

    const populatedCategory = {
      ...category,
      monthlyData: stats,
      savings: savingsArr,
    }

    return {
      category: stringifyForComponent([populatedCategory]),
    }
  } catch (error) {
    console.log(error)
  }
}
