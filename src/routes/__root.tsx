import { supabase } from "@/lib/supabase"
import { sessionAtom } from "@/store/session"
import { MantineProvider, createTheme } from "@mantine/core"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Outlet, createRootRoute } from "@tanstack/react-router"
import { useAtom } from "jotai"
import { Suspense, useEffect } from "react"
import { TanStackRouterDevtools } from "./-components/TanStackRouterDevtools"

import "virtual:uno.css"
import "@mantine/core/styles.css"
import { set } from "idb-keyval"
import { Shell } from "./-components/Shell"

const queryClient = new QueryClient()

const theme = createTheme({
	primaryColor: "green",
})

export const Route = createRootRoute({
	component: function Root() {
		const [session, setSession] = useAtom(sessionAtom)

		useEffect(() => {
			supabase.auth.getSession().then(({ data: { session } }) => {
				setSession(session)
				set("session", session)
			})

			const {
				data: { subscription },
			} = supabase.auth.onAuthStateChange((_event, session) => {
				setSession(session)
				set("session", session)
			})

			return () => subscription.unsubscribe()
		}, [setSession])

		return (
			<MantineProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<Shell>
						{!session ? (
							<div className="max-w-prose mx-auto">
								<Auth
									supabaseClient={supabase}
									appearance={{ theme: ThemeSupa }}
									providers={["google"]}
								/>
							</div>
						) : (
							<Outlet />
						)}
						<Suspense>
							<TanStackRouterDevtools position="bottom-right" />
						</Suspense>
					</Shell>
				</QueryClientProvider>
			</MantineProvider>
		)
	},
})
