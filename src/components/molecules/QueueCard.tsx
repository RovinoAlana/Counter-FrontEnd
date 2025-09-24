'use client'
import React from 'react'
import Card from '../atoms/Card'
import { EQueueStatus, IQueue } from '@/interfaces/services/queue.interface'
import { cn } from '@/utils/classname.util'
import Badge from '../atoms/Badge'

interface QueueCardProps {
  queue: IQueue
  className?: string
}

const QueueCard: React.FC<QueueCardProps> = ({ queue, className }) => {
  const getBadgeVariant = () => {
    switch (queue.status) {
      case 'CLAIMED':
        return 'warning'
      case 'CALLED':
        return 'primary'
      case 'SERVED':
        return 'success'
      case 'SKIPPED':
        return 'danger'
      default:
        return 'default'
    }
  }

  const getStatusText = () => {
    switch (queue.status) {
      case 'CLAIMED':
        return 'Menunggu'
      case 'CALLED':
        return 'Sedang Dilayani'
      case 'SERVED':
        return 'Selesai'
      case 'SKIPPED':
        return 'Dilewati'
      default:
        return 'Unknown'
    }
  }

  // Format time from ISO string
  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Card
      variant="outline"
      className={cn('transition-all', queue.status === 'CALLED' ? 'border-blue-500 bg-blue-50' : '', className)}
    >
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-bold text-gray-900">{queue.queueNumber}</h3>
          <Badge variant={getBadgeVariant()}>{getStatusText()}</Badge>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div>
            {queue.counter ? <span>Counter: {queue.counter.name}</span> : <span>Belum ditugaskan ke counter</span>}
          </div>
          <div>{formatTime(queue.createdAt)}</div>
        </div>
      </div>
    </Card>
  )
}

export default QueueCard
