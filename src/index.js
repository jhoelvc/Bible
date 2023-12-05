import express from 'express';
import cors from 'cors';
import itemsRoutes from './routes/items.routes.js';
import languagesRoutes from './routes/languages.routes.js'
import serviceTypeRoutes from './routes/service_type.routes.js'
import fileStateRoutes from './routes/file_state.routes.js'
import identityDocumentTypeRoutes from './routes/identity_document_type.routes.js'
import fileRoutes from './routes/file.routes.js'
import personRoutes from './routes/person.routes.js'
import packageRoutes from './routes/package.routes.js'
import packageDetailRoutes from './routes/package_detail.routes.js'
import serviceRoutes from './routes/service.routes.js'
import personTypesRoutes from './routes/person_type.routes.js';
import tariffRoutes from './routes/tariff.routes.js';

//const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json())
app.use(itemsRoutes)
app.use(languagesRoutes)
app.use(serviceTypeRoutes)
app.use(fileStateRoutes)
app.use(identityDocumentTypeRoutes)
app.use(fileRoutes)
app.use(personRoutes)
app.use(packageRoutes)
app.use(packageDetailRoutes)
app.use(serviceRoutes)
app.use(personTypesRoutes)
app.use(tariffRoutes)

app.listen(3001)
console.log('Server running on port 3001')