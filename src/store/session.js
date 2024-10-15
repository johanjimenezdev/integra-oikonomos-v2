import { create } from 'zustand'

const useSession = create(set => ({
  session: {},
  updateSession: (userData, auth) =>
    set(() => ({ session: { ...userData, auth: auth } }))
}))

export { useSession }
