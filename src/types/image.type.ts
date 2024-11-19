export interface FileUpload {
    name: string; // Name of the file
    size: number; // Size of the file in bytes
    key: string; // Unique key identifying the file
    lastModified: number; // Timestamp of last modification
    serverData: any | null; // Server-specific metadata or null
    url: string; // Direct URL to access the file
    appUrl: string; // Application-specific URL to access the file
    customId: string | null; // Optional custom identifier or null
    type: string; // MIME type of the file
    fileHash: string; // Hash of the file for integrity verification
  }