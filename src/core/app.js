import { Application } from 'pixi.js';
import { initDevtools } from '@pixi/devtools';

export async function createApp() {
	const app = new Application();
	await app.init({
		background: '#1099bb',
		antialias: true,
		width: 600,
		height: 852,
	});
	
	// Store the application in the global scope for debugging purposes
	globalThis.__PIXI_APP__ = app;
	await initDevtools({ app });
	
	document.getElementById('pixi-container').appendChild(app.canvas);
	return app;
}
