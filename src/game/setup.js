import { createMatchGrid } from '../entities/index.js';

export async function setupGame(app) {
	await createMatchGrid(app);
}
