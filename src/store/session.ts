import type { Session } from "@supabase/supabase-js"
import { get } from "idb-keyval"
import { atom } from "jotai"

export const sessionAtom = atom<Session | null>(
	((await get("session")) as Session) ?? null,
)
