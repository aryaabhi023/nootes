const conf = {
    appwrite_Url: String(import.meta.env.VITE_APPWRITE_URL),
    appwrite_ProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwrite_databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwrite_collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwrite_collectionId2: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID2),
    appwrite_bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  };
  
  export default conf;