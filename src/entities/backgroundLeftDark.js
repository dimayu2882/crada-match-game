import bgUrlLight from '/img/light_room.png';
import bgUrlDark from '/img/dark_room.png';
import { Container } from 'pixi.js'
import { createSprite } from '../helpers/index.js'
import { createPerson } from './index.js'

export default async function createSceneLeft(app) {
	const container = new Container();
	
	const bgLight = await createSprite(bgUrlLight);
	bgLight.width = app.screen.width / 2;
	bgLight.height = app.screen.height;
	bgLight.position.set(0, 0);
	
	const bgDark = await createSprite(bgUrlDark);
	bgDark.width = app.screen.width / 2;
	bgDark.height = app.screen.height;
	bgDark.position.set(0, 0);
	
	const person = await createPerson();
	
	container.addChild(bgDark, bgLight, person);
	
	return container;
}

