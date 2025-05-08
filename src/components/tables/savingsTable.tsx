'use client'

import React, { useState } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import AddSavingModal from '../modals/AddSavingModal'
import { ICategory, ISaving } from '@/types'
import EditSavingModal from '../modals/EditSavingModal'
import DeleteSavingModal from '../modals/DeleteSavingModal'

const surveyData = [
  {
    description: '50% reduction in CPU in DOA',
    saving: 300,
    perUnit: 30,
    cutInMonth: 5,
    inForecast: 'No',
    owner: 'CL',
    id: 1,
  },
  {
    description: '50% reduction in CPU in DOA',
    saving: 300,
    perUnit: 30,
    cutInMonth: 5,
    inForecast: 'No',
    owner: 'CL',
    id: 2,
  },
  {
    description: '50% reduction in CPU in DOA',
    saving: 300,
    perUnit: 30,
    cutInMonth: 5,
    inForecast: 'No',
    owner: 'CL',
    id: 3,
  },
  {
    description: '50% reduction in CPU in DOA',
    saving: 300,
    perUnit: 30,
    cutInMonth: 5,
    inForecast: 'No',
    owner: 'CL',
    id: 4,
  },
  {
    description: '50% reduction in CPU in DOA',
    saving: 300,
    perUnit: 30,
    cutInMonth: 5,
    inForecast: 'No',
    owner: 'CL',
    id: 5,
  },
]

type Props = {
  category: ICategory
}

const SavingsTable = ({ category }: Props) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [selectedSaving, setSelectedSaving] = useState({
    _id: '',
    description: '',
    saving: 0,
    cutInMonth: 1,
    inForecast: '',
    owner: '',
    categoryId: '',
    perUnit: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const handleShowAddModal = () => {
    setShowAddModal(true)
  }
  const handleHideAddModal = () => {
    setShowAddModal(false)
  }
  const handleShowEditModal = (item: any) => {
    setSelectedSaving(item)
    setShowEditModal(true)
  }
  const handleHideEditModal = () => {
    setSelectedSaving({
      _id: '',
      description: '',
      saving: 0,
      cutInMonth: 1,
      inForecast: '',
      owner: '',
      categoryId: '',
      perUnit: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    setShowEditModal(false)
  }
  const handleShowDeleteModal = (item: any) => {
    setSelectedSaving(item)
    setShowDeleteModal(true)
  }
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setSelectedSaving({
      _id: '',
      description: '',
      saving: 0,
      cutInMonth: 1,
      inForecast: '',
      owner: '',
      categoryId: '',
      perUnit: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  return (
    <>
      <AddSavingModal showAddModal={showAddModal} handleHideAddModal={handleHideAddModal} categoryId={category._id} />
      {selectedSaving && selectedSaving._id !== '' && (
        <EditSavingModal selectedSaving={selectedSaving} showEditModal={showEditModal} handleHideEditModal={handleHideEditModal} />
      )}
      {selectedSaving && selectedSaving._id !== '' && (
        <DeleteSavingModal selectedSaving={selectedSaving} showDeleteModal={showDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} />
      )}
      <div className='flex flex-col h-100 text-white'>
        {category.name.substring(0, 5) !== 'Total' && (
          <div className='position-absolute -mt-12'>
            <FaPlus className='text-2xl cursor-pointer mb-2 ml-[15px]' onClick={handleShowAddModal} />
          </div>
        )}

        <div className='flex-grow overflow-auto '>
          <table className='table table-dark table-hover uppercase text-sm'>
            <thead>
              <tr className='sticky top-0 divide-x font-LatoBold align-middle'>
                <th className='w-[45px]'>#</th>
                <th className='w-[285px]'>Description</th>
                <th className='w-[105px]'>Expected Saving</th>
                <th className='w-[90px]'>Saving Per Unit</th>
                <th className='w-[70px]'>Cut in Month</th>
                <th className='w-[70px]'>In Forecast</th>
                <th className='w-[150px]'>Owner</th>
                <th className='w-[95px]'>Edit</th>
              </tr>
            </thead>

            <tbody>
              {category.savings &&
                category.savings.map((item, i) => {
                  return (
                    <tr key={item._id} className='divide-x  h-10 hover:bg-darkTableHover '>
                      <td>{i + 1}</td>
                      <td>{item.description}</td>
                      <td>£{item.saving.toLocaleString()}</td>
                      <td>£{item.perUnit}</td>
                      <td>{item.cutInMonth}</td>
                      <td>{item.inForecast}</td>
                      <td>{item.owner}</td>
                      <td>
                        <div className='flex justify-evenly'>
                          <div className='flex justify-center cursor-pointer pt-1 text-contained' onClick={() => handleShowEditModal(item)}>
                            <FaPencilAlt />
                          </div>
                          <div>|</div>
                          <div className='flex justify-center cursor-pointer text-open pt-1' onClick={() => handleShowDeleteModal(item)}>
                            <FaTrashAlt />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default SavingsTable
