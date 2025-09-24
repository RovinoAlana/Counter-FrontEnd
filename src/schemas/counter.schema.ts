import * as yup from 'yup'

export const VCounterSchema = yup.object().shape({
  name: yup.string().required('Nama counter wajib diisi'),
  max_queue: yup
    .number()
    .required('Deskripsi counter wajib diisi')
    .min(1, 'Antrian maksimal harus minimal 1')
    .typeError('Antrian maksimal harus berupa angka'),
  is_active: yup.boolean().required('Status counter wajib diisi'),
})

export type ICounterSchema = yup.InferType<typeof VCounterSchema>

export const VReleaseQueueSchema = yup.object().shape({
  queueNumber: yup.string().required('Nomor antrian wajib diisi'),
})

export type IReleaseQueueSchema = yup.InferType<typeof VReleaseQueueSchema>
