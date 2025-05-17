import { Sprite, Assets } from 'pixi.js';
import bgUrl from '/img/wood.png';

export default async function createBackground(app) {
	const texture = await Assets.load(bgUrl);
	
	const sprite = new Sprite(texture);
	sprite.width = app.screen.width;
	sprite.height = app.screen.height;
	app.stage.addChild(sprite);
}

