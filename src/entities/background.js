import { Sprite, Assets } from 'pixi.js';
import bgUrl from '@img/wood.png';

export async function createBackground(app) {
	const texture = await Assets.load(bgUrl);
	
	const bg = new Sprite(texture);
	bg.width = app.screen.width;
	bg.height = app.screen.height;
	app.stage.addChild(bg);
}

