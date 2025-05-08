import { ZodIssue } from 'zod'
import { Types, Document, PopulatedDoc } from 'mongoose'

type ActionResult<T> = { status: 'success'; data: T } | { status: 'error'; error: string | ZodIssue[] }

// Subdocument definition
interface IDivision {
  name: string
  roles: string[]
}

export interface IUser extends Document {
  email: string
  password: string
  name: string
  app: string
  divisions: IDivision[]
  emailVerified: boolean
  emailVerifiedAt?: Date
  varificationToken?: string
  varificationTokenExpires?: Date
  resetToken?: string
  resetTokenExpires?: string
  lastActive: Date
  canUpload: boolean
  // common
  _id: string
  createdAt: Date
  updatedAt: Date
}

export interface IStat {
  name: string
  month: string
  monthNum: number
  forecast: number
  target: number
  budget: number
  value: number
  // common
  _id: string
  createdAt: Date
  updatedAt: Date
}

export interface ISaving {
  categoryId: string
  description: string
  saving: number
  perUnit: number
  cutInMonth: number
  inForecast: string
  owner: string
  // common
  _id: string
  createdAt: Date
  updatedAt: Date
}
export interface ICategory {
  name: string
  ownerName: string
  forecast: number
  budget: number
  target: number
  monthlyData: IStat[]
  savings: ISaving[]
  targetCalendarisedSaving: number | null
  targetAnnualisedSaving: number | null
  // common
  _id: string
  createdAt: Date
  updatedAt: Date
}
