import { Modal } from '@components/UI/Modal'
import { Tooltip } from '@components/UI/Tooltip'
import { ChatAlt2Icon, GlobeAltIcon, UsersIcon } from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Dispatch, FC, useState } from 'react'

interface Props {
  setOnlyFollowers: Dispatch<string>
  onlyFollowers: string
}

const SelectReferenceModule: FC<Props> = ({
  setOnlyFollowers,
  onlyFollowers
}) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const ONLY_FOLLOWERS = 'Only followers can comment or mirror'
  const SISMO_BADGES = 'Sismo badge restrictions'
  const EVERYONE = 'Everyone can comment or mirror'

  return (
    <>
      <Tooltip
        placement="top"
        content={
          onlyFollowers == 'everyone'
            ? EVERYONE
            : onlyFollowers == 'followers'
            ? ONLY_FOLLOWERS
            : onlyFollowers == 'sismo-badges'
            ? SISMO_BADGES
            : EVERYONE
        }
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => {
            setShowModal(!showModal)
          }}
          aria-label="Choose Reference Module"
        >
          <div className="text-brand">
            {onlyFollowers ? (
              <UsersIcon className="w-5 h-5" />
            ) : (
              <GlobeAltIcon className="w-5 h-5" />
            )}
          </div>
        </motion.button>
      </Tooltip>
      <Modal
        title="Select who to comment or mirror"
        icon={<ChatAlt2Icon className="w-5 h-5 text-brand" />}
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className="py-3.5 px-5 space-y-3">
          <button
            type="button"
            className={clsx(
              { 'border-green-500': onlyFollowers == 'everyone' },
              'w-full p-3 border rounded-xl dark:border-gray-700/80 flex justify-between items-center'
            )}
            onClick={() => {
              setOnlyFollowers('everyone')
              setShowModal(false)
            }}
          >
            <div className="flex items-center space-x-3">
              <GlobeAltIcon className="w-5 h-5 text-brand" />
              <div>{EVERYONE}</div>
            </div>
            {onlyFollowers == 'everyone' && (
              <CheckCircleIcon className="w-7 text-green-500" />
            )}
          </button>
          <button
            type="button"
            className={clsx(
              { 'border-green-500': onlyFollowers == 'followers' },
              'w-full p-3 border rounded-xl dark:border-gray-700/80 flex justify-between items-center'
            )}
            onClick={() => {
              setOnlyFollowers('followers')
              setShowModal(false)
            }}
          >
            <div className="flex items-center space-x-3">
              <UsersIcon className="w-5 h-5 text-brand" />
              <div>{ONLY_FOLLOWERS}</div>
            </div>
            {onlyFollowers == 'followers' && (
              <CheckCircleIcon className="w-7 h-7 text-green-500" />
            )}
          </button>

          <button
            type="button"
            className={clsx(
              { 'border-green-500': onlyFollowers == 'sismo-badges' },
              'w-full p-3 border rounded-xl dark:border-gray-700/80 flex justify-between items-center'
            )}
            onClick={() => {
              setOnlyFollowers('sismo-badges')
              setShowModal(false)
            }}
          >
            <div className="flex items-center space-x-3">
              <img
                className="w-5 h-5 text-brand"
                src="https://alpha.sismo.io/assets/logo.svg"
              />
              <div>{SISMO_BADGES}</div>
            </div>
            {onlyFollowers == 'sismo-badges' && (
              <CheckCircleIcon className="w-7 h-7 text-green-500" />
            )}
          </button>
        </div>
      </Modal>
    </>
  )
}

export default SelectReferenceModule
