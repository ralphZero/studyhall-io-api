import { initializeApp, getApps, App, cert } from "firebase-admin/app";
import * as dotenv from 'dotenv';

dotenv.config();

const serviceAccount = {
    projectId: process.env.project_id as string,
    privateKey: process.env.private_key as string,
    clientEmail: process.env.client_email as string,
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