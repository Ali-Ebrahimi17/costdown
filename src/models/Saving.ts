import { ISaving } from '@/types'
import { Schema, model, models, Model } from 'mongoose'

const { ObjectId } = Schema

// Define the schema
export const savingSchema = new Schema(
  {
    categoryId: {
      type: String,
    },
    description: {
      type: String,
    },
    saving: {
      type: Number,
    },
    perUnit: {
      type: Number,
    },
    cutInMonth: {
      type: Number,
    },
    inForecast: {
      type: String,
    },
    owner: {
      type: String,
    },
  },
  { timestamps: true }
)
// Define the  model

const Saving: Model<ISaving> = models?.Saving || model<ISaving>('Saving', savingSchema)

export default Saving
