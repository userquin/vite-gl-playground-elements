import { defineConfig } from 'vite'
import { promises as fs } from 'fs'

const virtualTSWS = `\0playground-typescript-worker.js`
const virtualWS = `/sandbox/playground-service-worker.js`
const virtualPage = `/sandbox/playground-service-worker-proxy.html`

let outputDir = 'dist'

export default defineConfig({
  plugins: [
      {
          name: "playground-elements-plugin:dev",
          enforce: "pre",
          configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const uri = req.url
                let data: [string, string] | undefined

                if (uri === virtualWS) {
                    data = [
                        "application/javascript",
                        await fs.readFile('node_modules/playground-elements/playground-service-worker.js', 'utf-8')
                    ]
                }

                if (uri === virtualPage) {
                    data = [
                        "text/html",
                        await fs.readFile('node_modules/playground-elements/playground-service-worker-proxy.html', 'utf-8')
                    ]
                }

                if (data) {
                    res.setHeader("Content-Type", data[0])
                    res.end(data[1])
                    return
                }

                next();
            })
          },
          resolveId(id) {
            if (id .endsWith("/playground-typescript-worker.js"))
             return virtualTSWS

            return undefined
          },
          async load(id) {
            if (id === virtualTSWS) {
                return await fs.readFile("node_modules/playground-elements/playground-typescript-worker.js", "utf-8");
            }

            return undefined
          }
      },
      {
          name: "playground-elements-plugin:build",
          enforce: "post",
          apply: 'build',
          configResolved(config) {
              outputDir = config.build.outDir
          },
          async closeBundle() {
              await fs.mkdir(`${outputDir}/sandbox`, { recursive: true })
              let code = await fs.readFile('node_modules/playground-elements/playground-service-worker.js', 'utf-8')
              await fs.writeFile(`${outputDir}/sandbox/playground-service-worker.js`, code, 'utf-8')
              code = await fs.readFile('node_modules/playground-elements/playground-service-worker-proxy.html', 'utf-8')
              await fs.writeFile(`${outputDir}/sandbox/playground-service-worker-proxy.html`, code, 'utf-8')
          }
      },
  ]
})
