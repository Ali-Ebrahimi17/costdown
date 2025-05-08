import { IStat } from '@/types'
import { Schema, model, models, Model } from 'mongoose'

const { ObjectId } = Schema

// Define the schema
export const statSchema = new Schema(
  {
    name: {
      type: String,
    },
    month: {
      type: String,
    },
    monthNum: {
      type: Number,
    },
    value: {
      type: Number,
    },
    forecast: {
      type: Number,
    },
    target: {
      type: Number,
    },
    budget: {
      type: Number,
    },
  },
  { timestamps: true }
)
// Define the  model

const Stat: Model<IStat> = models?.Stat || model<IStat>('Stat', statSchema)

export default Stat
