import "./globals.css"

export const metadata = {
  title: "Tomi Law Office",
  description: "Saskatchewan's Trusted Legal Partner",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}



import './globals.css'