import { ICategory } from '@/types'
import { Schema, model, models, Model } from 'mongoose'

const { ObjectId } = Schema

// Define the schema
export const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
    },
    forecast: {
      type: Number,
    },
    budget: {
      type: Number,
    },
    target: {
      type: Number,
    },
    targetCalendarisedSaving: {
      type: String,
    },
    targetAnnualisedSaving: {
      type: String,
    },

    monthlyData: {
      type: Array,
      default: [],
    },
    savings: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

// Define the  model
const Category: Model<ICategory> = models?.Category || model<ICategory>('Category', categorySchema)

export default Category
