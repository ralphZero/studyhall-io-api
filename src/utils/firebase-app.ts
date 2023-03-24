import { initializeApp, getApps, App, cert, ServiceAccount } from "firebase-admin/app";
import * as dotenv from 'dotenv';

dotenv.config();

const serviceAccount: ServiceAccount = {
    projectId: process.env.PROJECT_ID as string,
    privateKey: process.env.PRIVATE_KEY as string,
    clientEmail: process.env.CLIENT_EMAIL as string,
};

let app: App;

if (!getApps().length) {
    app = initializeApp({
        credential: cert(serviceAccount)
    });
} else {
    app = getApps()[0]
}

export default app;