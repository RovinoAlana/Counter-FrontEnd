import * as yup from 'yup'

export const VLoginSchema = yup.object().shape({
  username: yup.string().required('Username wajib diisi').max(50, "Maksimal 50 karakter"),
  password: yup.string().required('Password wajib diisi').min(8, 'Password minimal 8 karakter'),
})

export type ILoginSchema = yup.InferType<typeof VLoginSchema>

export const VCreateAdminSchema = yup.object().shape({
  username: yup.string().required('Username wajib diisi'),
  password: yup.string().required('Password wajib diisi').min(8, 'Password minimal 8 karakter'),
  email: yup.string().required('Email wajib diisi').email('Email harus valid'),
  name: yup.string().required('Nama wajib diisi'),
})

export type ICreateAdminSchema = yup.InferType<typeof VCreateAdminSchema>

export const VUpdateAdminSchema = yup.object().shape(
  {
    username: yup.string().required('Username wajib diisi'),
    password: yup.string().when('password', {
      is: (value: string) => value && value.trim() !== '',
      then: schema => schema.min(8, 'Password minimal 8 karakter'),
      otherwise: schema => schema.optional(),
    }),
    email: yup.string().email('Email harus valid').nullable(),
    name: yup.string().nullable(),
  },
  [['password', 'password']]
)

export type IUpdateAdminSchema = yup.InferType<typeof VUpdateAdminSchema>
