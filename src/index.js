import express from 'express';
import itemsRoutes from './routes/items.routes.js';
import languagesRoutes from './routes/languages.routes.js'
import serviceTypeRoutes from './routes/service_type.routes.js'
import fileStateRoutes from './routes/file_state.routes.js'
import identityDocumentTypeRoutes from './routes/identity_document_type.routes.js'

const app = express();

app.use(express.json())
app.use(itemsRoutes)
app.use(languagesRoutes)
app.use(serviceTypeRoutes)
app.use(fileStateRoutes)
app.use(identityDocumentTypeRoutes)

app.listen(3000)
console.log('Server running on port 3000')