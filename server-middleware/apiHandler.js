// This simple API handler helps Vercel properly recognize your SSR app
export default function (req, res, next) {
  // For API routes
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'API is running' }))
    return
  }

  // Add cache headers for static assets
  if (req.url.startsWith('/_nuxt/')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Pass to next middleware
  next()
}
