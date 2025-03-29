import { RoastForm } from "@/components/roast-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-transparent bg-clip-text">
            App Roastivator 🔥
          </h1>
          <p className="text-xl text-gray-300">Submit your app idea. We'll roast it, then help you improve it.</p>
        </header>

        <RoastForm />
      </div>
    </main>
  )
}

