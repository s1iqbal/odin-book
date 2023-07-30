import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Context from './Pages/Context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Context id={''} username={''} email={''}>
            <App />
        </Context>
    </BrowserRouter>
)
