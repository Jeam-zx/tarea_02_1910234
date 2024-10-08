import { defineConfig } from 'vite';

// Export the vite config
export default defineConfig({
    // Set the root directory
    root: 'src',
    // Configure the dev server to open the browser automatically
    server: {
        open: true,
    },
});