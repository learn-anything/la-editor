import { LAEditor } from '@/components/la-editor'

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl p-6 py-12 sm:px-6 lg:px-8">
      <LAEditor placeholder="Add description..." editorClassName="min-h-72" />
    </main>
  )
}
