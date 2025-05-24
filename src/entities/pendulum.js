import { Container } from 'pixi.js'

import pendulumUrl from '/img/pendulum.png';
import { createSprite } from '../helpers/index.js'

export default async function createPendulum(app) {
	const container = new Container();
	
	const pendulum = await createSprite(pendulumUrl);
	pendulum.anchor.set(0, .2);
	
	container.addChild(pendulum);
	
	return container;
}

