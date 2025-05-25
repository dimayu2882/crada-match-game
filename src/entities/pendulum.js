import { Container } from 'pixi.js'

import { allTextureKeys } from '../common/assets.js'
import { createSprite } from '../helpers/index.js'

export default async function createPendulum() {
	const container = new Container();
	
	const pendulum = await createSprite(allTextureKeys.pendulum);
	pendulum.anchor.set(0, .2);
	
	container.addChild(pendulum);
	
	return container;
}
