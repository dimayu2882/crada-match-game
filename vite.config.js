import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	server: {
		port: 8080,
		open: true,
	},
	resolve: {
		alias: {
			'@img': path.resolve(__dirname, './src/assets/img/'),
		},
	},
	build: {
		sourcemap: true
	}
});
