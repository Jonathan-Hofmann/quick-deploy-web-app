export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-[500px]">
      <h1 className="text-4xl font-bold mb-4">Base Project</h1>
      <p className="text-muted-foreground">Add a supabase connection to the <code className="text-blue-500 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-sm mx-1">.env.local</code> file.</p>
    </main>
  );
}