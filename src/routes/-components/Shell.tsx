import Logo from "@/assets/logo.svg?react"
import { NavLink } from "@/components/NavLink"
import { supabase } from "@/lib/supabase"
import { sessionAtom } from "@/store/session"
import { sidebarOpenedAtom as openedAtom } from "@/store/sidebar"
import { AppShell, Burger, Button, ScrollArea } from "@mantine/core"
import { clear } from "idb-keyval"
import { atom, useAtomValue, useSetAtom } from "jotai"
import type { ReactNode } from "react"
import { FaHome } from "react-icons/fa"
import { RealtimeStatus } from "./RealtimeStatus"

const toggleAtom = atom(null, (get, set) => {
	set(openedAtom, !get(openedAtom))
})

export function Shell({ children }: { children: ReactNode }) {
	const opened = useAtomValue(openedAtom)
	const toggle = useSetAtom(toggleAtom)
	const session = useAtomValue(sessionAtom)

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !session || !opened, desktop: !session },
			}}
			padding="md"
		>
			<AppShell.Header className="flex items-center px-4">
				{session && (
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />
				)}

				<RealtimeStatus />
			</AppShell.Header>

			<AppShell.Navbar p="md" className="gap-4">
				<AppShell.Section>
					<Logo className="max-w-full mx-auto block" />
				</AppShell.Section>
				<AppShell.Section grow component={ScrollArea}>
					{([["/", "Home", FaHome]] as const).map(([path, label, Icon]) => (
						<NavLink
							key={path}
							to={path}
							label={label}
							leftSection={<Icon />}
						/>
					))}
				</AppShell.Section>
				{session && (
					<Button
						onClick={() => {
							supabase.auth.signOut()
							clear()
						}}
					>
						Logout
					</Button>
				)}
			</AppShell.Navbar>

			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	)
}
