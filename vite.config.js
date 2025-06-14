import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	server: {
		port: 8080,
		open: true,
	},
	build: {
		sourcemap: true
	}
});
