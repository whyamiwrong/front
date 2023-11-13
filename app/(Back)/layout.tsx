export const metadata = {
  title: '맞왜틀 API',
  description: '맞왜틀 API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko-KR">
      <body>{children}</body>
    </html>
  )
}
