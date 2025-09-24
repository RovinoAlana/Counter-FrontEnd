export interface ISSEEvent<T = unknown> {
  event: SSEEvent
  data: T
  id?: string
  retry?: number
}

export type SSEEvent =
  | 'cleanup'
  | 'cleanup_by_status'
  | 'cache_cleanup'
  | 'queue_claimed'
  | 'queue_released'
  | 'queue_called'
  | 'queue_skipped'
  | 'queue_reset'
  | 'all_queues_reset'
