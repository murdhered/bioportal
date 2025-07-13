export const metadata = {
  title: 'BioPortal',
  description: 'All in one link.',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
