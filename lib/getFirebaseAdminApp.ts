import { initializeApp, getApps, getApp } from 'firebase-admin/app';
import { credential } from "firebase-admin";

const GA_ADMIN_CREDENTIALS: any = {
  type: "service_account",
  project_id: "po-hub",
  private_key_id: process.env.FA_PRIVATE_KEY_ID,
  private_key: (process.env.FA_PRIVATE_KEY + '').replaceAll('\\n', '\n'),
  client_email: process.env.FA_CLIENT_EMAIL,
  client_id: process.env.FA_CLIENT_ID,
  auth_uri: process.env.FA_AUTH_URI,
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FA_CLIENT_CERT_URL
};

export const getFirebaseAdminApp = () => {
  try {
    return getApps().length ? getApp() : initializeApp({ credential: credential.cert(GA_ADMIN_CREDENTIALS) });
  } catch (error) {
    console.error('Failed to get/initialize admin app!', error);
  }
}