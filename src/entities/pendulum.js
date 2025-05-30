import { Container } from 'pixi.js'

import { allTextureKeys } from '../common/assets.js'
import { STARS } from '../common/constants.js'
import { createSprite, getRandomElement } from '../helpers/index.js'

export default async function createPendulum(app) {
	const container = new Container();
	
	// Pendulum
	const pendulum = await createSprite(allTextureKeys.pendulum);
	pendulum.height = app.screen.height;
	
	// Random star
	const randomStarObject = getRandomElement(STARS);
	const randomStar = await createSprite(randomStarObject.textureKey);
	
	container.addChild(pendulum, randomStar);
	
	randomStar.position.set(container.width / 2 - randomStar.width / 2, container.height - randomStar.height * 2 + 10);
	
	return container;
}
