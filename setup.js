const { build } = require('esbuild')
const db = require('./db/db.js')

build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  minify: true,
  outfile: 'static/i.js',
  logLevel: 'info',
})

if (process.env.UPDATE_DB) {
  console.log('updating DB!!!')
  db.setup()
}
