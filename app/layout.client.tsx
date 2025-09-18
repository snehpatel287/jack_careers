"use client"

import { Providers } from "./providers"
import { Header } from "@/components/layout/Header"
import { ReactNode, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { usePathname, useRouter } from "next/navigation"

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
        }
        
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        setLoading(false)
        setInitialLoad(false)
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        setUser(session?.user ?? null)
        
        // Handle sign in success
        if (event === 'SIGNED_IN' && session?.user) {
          // Small delay to ensure state is fully updated
          setTimeout(() => {
            if (pathname === '/') {
              router.replace('/main')
            }
          }, 100)
        }
        
        // Handle sign out
        if (event === 'SIGNED_OUT') {
          router.replace('/')
        }
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [pathname, router])

  // Handle route protection after initial load
  useEffect(() => {
    if (!loading && !initialLoad) {
      // Redirect unauthenticated users away from protected routes
      if (!user && pathname !== "/") {
        router.replace("/")
      }
      // Don't auto-redirect authenticated users from "/" - let them stay if they want
      // They can navigate to /main manually or through the auth flow
    }
  }, [user, loading, initialLoad, pathname, router])

  // Show loading spinner during initial auth check
  if (loading || initialLoad) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <Providers>
      <div className="min-h-screen">
        {/* Only show header when user is authenticated AND not on login page */}
        {user && pathname !== "/" && <Header />}
        <main className={`container mx-auto px-4 py-4 ${user && pathname !== "/" ? "pt-8" : ""}`}>
          {children}
        </main>
      </div>
    </Providers>
  )
}