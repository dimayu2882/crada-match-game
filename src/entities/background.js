import { Assets } from 'pixi.js';
import { allTextureKeys } from '../common/assets.js'
import { createSprite } from '../helpers/index.js'

export default async function createBackground(app) {
	const sprite = createSprite(Assets.cache.get(allTextureKeys.lightRoom));
	sprite.width = app.screen.width;
	sprite.height = app.screen.height;
	app.stage.addChild(sprite);
}

