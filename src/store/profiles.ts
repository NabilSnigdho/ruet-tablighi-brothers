import type { Database } from "@/lib/supabase.types"
import { createStore } from "idb-keyval"
import { atom } from "jotai"

export const profilesAtom = atom<
	Database["public"]["Tables"]["profiles"]["Row"][]
>([])

export const profilesStore = createStore("profiles-store", "profiles")
