export default function DefaultLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return <main className="mx-auto w-full max-w-screen-xl px-3 py-10">{children}</main>
}
