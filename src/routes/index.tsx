import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
      <nav aria-label="Legal" className="mt-8 flex gap-4 text-sm">
        <Link to="/privacy" className="underline underline-offset-4">
          Privacy Policy
        </Link>
        <Link to="/terms" className="underline underline-offset-4">
          Terms of Service
        </Link>
      </nav>
    </div>
  )
}
