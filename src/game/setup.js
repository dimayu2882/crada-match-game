import { Container, Graphics, TextStyle, Text, Texture, Sprite } from 'pixi.js';

import { createBackground } from '../entities/background.js';

export async function setupGame(app) {
	await createBackground(app);
}
