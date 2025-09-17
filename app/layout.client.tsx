// app/layout.client.tsx
"use client"

import { Providers } from "./providers"
import { Header } from "@/components/layout/Header"
import { ReactNode, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { usePathname, useRouter } from "next/navigation"

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const initAuth = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }
    initAuth()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!loading && !user && pathname !== "/") {
      router.replace("/")
    }
  }, [user, loading, pathname, router])

  useEffect(() => {
    if (user) {
      router.replace("/main")
    }
  }, [user, router])
  return (
    <Providers>
      <div className="min-h-screen">
        {!loading && user && (
            <Header />
        )}
        <main className="container mx-auto px-4 py-4">{children}</main>
      </div>
    </Providers>
  )
}
