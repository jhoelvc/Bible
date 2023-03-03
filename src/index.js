import express from 'express';
import itemsRoutes from './routes/items.routes.js';
import languagesRoutes from './routes/languages.routes.js'
import serviceTypeRoutes from './routes/service_type.routes.js'
import fileStateRoutes from './routes/file_state.routes.js'
import identityDocumentTypeRoutes from './routes/identity_document_type.routes.js'
import fileRoutes from './routes/file.routes.js'
import clientRoutes from './routes/client.routes.js'
import packageRoutes from './routes/package.routes.js'
import providerRoutes from './routes/provider.routes.js'
import serviceRoutes from './routes/service.routes.js'

const app = express();

app.use(express.json())
app.use(itemsRoutes)
app.use(languagesRoutes)
app.use(serviceTypeRoutes)
app.use(fileStateRoutes)
app.use(identityDocumentTypeRoutes)
app.use(fileRoutes)
app.use(clientRoutes)
app.use(packageRoutes)
app.use(providerRoutes)
app.use(serviceRoutes)

app.listen(3000)
console.log('Server running on port 3000')