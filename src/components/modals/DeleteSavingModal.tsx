'use client'

import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import ModalHeader from './common/modal-header'
import ModalFooter from './common/modal-footer'
import { ISaving } from '@/types'

type Props = {
  handleCloseDeleteModal: () => void
  showDeleteModal: boolean
  selectedSaving: ISaving
}

const DeleteSavingModal = ({ handleCloseDeleteModal, showDeleteModal, selectedSaving }: Props) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const message = `Delete £${selectedSaving.saving.toLocaleString()}`

  const submitHandler = async (e: any) => {
    e.preventDefault()

    if (selectedSaving._id.trim().length < 1) {
      toast.error('Error')
      setLoading(false)
      return
    }

    try {
      setLoading(true)

      let data = {
        _id: selectedSaving._id,
      }
      let link = `/api/saving/delete`

      //post user data to back end
      const response = await axios.post(link, { data })

      //handle if data has an error
      if (response.data.error) {
        toast.error(response.data.error)
        setLoading(false)
      }
      if (response.data._id) {
        setLoading(false)
        toast.success('Saving Deleted')
        handleCloseDeleteModal()

        router.refresh()
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error('Somehing went wrong')
      setLoading(false)
      // handleHideAddModal()
    }
  }

  const handleCloseModal = () => {
    handleCloseDeleteModal()
  }
  return (
    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} size='sm' centered className='-mt-10 text-black'>
      <ModalHeader>{message}</ModalHeader>

      <Modal.Body>
        <div className='pt-2 -mb-10 '>Are you sure?</div>
        <div className='flex gap-2 justify-end mt-2'>
          <Button disabled={loading} variant='success' size='sm' onClick={submitHandler} className='py-1'>
            {loading ? 'Loading' : 'Confirm'}
          </Button>
          <Button variant='danger' size='sm' onClick={handleCloseModal}>
            Cancel
          </Button>
        </div>
      </Modal.Body>

      <ModalFooter />
    </Modal>
  )
}

export default DeleteSavingModal
