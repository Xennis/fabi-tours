export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto w-full max-w-(--breakpoint-xl) px-3 py-10">{children}</main>
}
