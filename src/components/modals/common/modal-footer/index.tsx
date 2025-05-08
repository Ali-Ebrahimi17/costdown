import Image from 'next/image'

const ModalFooter = () => {
  return (
    <div className='bg-jcb flex justify-between h-11 text-black'>
      <div className=' flex h-100 pl-2 pt-2.5'>
        <div>
          <Image src={`/images/logos/jcb-logo.png`} alt='Logo' width={75} height={24} />
        </div>
        <div className='ml-2'>
          <Image src={`/images/logos/df.png`} alt='Jcb Logo' width={133} height={24} />
        </div>
      </div>
    </div>
  )
}

export default ModalFooter
