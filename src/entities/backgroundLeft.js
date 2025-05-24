import bgUrlLight from '/img/light_room.png';
import { Container } from 'pixi.js'
import { createSprite } from '../helpers/index.js'

export default async function createSceneLeft(app) {
	const container = new Container();
	
	const bgLight = await createSprite(bgUrlLight);
	bgLight.width = app.screen.width / 2;
	bgLight.height = app.screen.height;
	bgLight.position.set(0, 0);
	
	container.addChild(bgLight);
	
	return container;
}

