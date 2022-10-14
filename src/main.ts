import './style.css'
import 'playground-elements'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <playground-ide editable-file-system line-numbers resizable sandbox-base-url="/sandbox/">
    
    </playground-ide>
  </div>
`
