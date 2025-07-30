import Header from "@/components/Header"
import InboxList from "@/components/InboxList"

export default function InboxPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">Chat Inbox</h1>
          <p className="text-neutral-600 text-sm">Manage conversations for your listings</p>
        </div>

        <InboxList />
      </main>
    </div>
  )
}
