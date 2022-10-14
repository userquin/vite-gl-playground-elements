import './style.css'
import 'playground-elements'
import sandbox from 'virtual:pg-sandbox'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <playground-ide editable-file-system line-numbers resizable sandbox-base-url="${sandbox}">
    
    </playground-ide>
  </div>
`
