declare global {
  interface Window {
    a: string;
    // Add your window interface extensions here
  }

  interface ImportMetaEnv {
    readonly VITE_ENV: string;
    readonly VITE_BASE_URL: string;
    readonly VITE_PRE: string;
    readonly VITE_PORT: string;
    readonly VITE_GLOB_APP_TITLE: string;
    readonly VITE_DROP_CONSOLE: string;
    readonly VITE_BUILD_GZIP: string;
    readonly VITE_MOCK: string;
    readonly VITE_APP_PROJECT_NAME: string;
    readonly VITE_SERVICE_URL: string;
    readonly VITE_OSS_SERVICE_URL: string;
    readonly NODE_ENV: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
