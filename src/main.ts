import './style.css'
import 'playground-elements'
import sandbox from 'virtual:pg-sandbox'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <playground-ide editable-file-system line-numbers resizable sandbox-base-url="${sandbox}">
        <script type="sample/html" filename="index.html">
<!doctype html>
<body>
  <script src="./index.js">&lt;/script>
</body>
        </script>
        <script type="sample/ts" filename="index.ts">
    document.body.textContent = 'Hello!';
        </script>
    </playground-ide>
  </div>
`
