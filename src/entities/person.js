import { Container, Ticker } from 'pixi.js'

import { createSprite } from '../helpers/index.js'
import urlPerson from '/img/woman.png';
import urlPersonShadow from '/img/sh_woman.png';
import urlPersonEyelids from '/img/eyelids_woman.png';

export default async function createPerson() {
	const container = new Container();
	const person = await createSprite(urlPerson);
	const personShadow = await createSprite(urlPersonShadow);
	const personEyelids = await createSprite(urlPersonEyelids);
	
	personShadow.position.set(-21, 4);
	personEyelids.position.set(32, 42);
	
	let fadingOut = true;
	let alphaSpeed = 0.005;
	const ticker = new Ticker();

	ticker.add(() => {
		if (fadingOut) {
			personEyelids.alpha -= alphaSpeed;
			if (personEyelids.alpha <= 0.1) {
				personEyelids.alpha = 0.1;
				fadingOut = false;
			}
		} else {
			personEyelids.alpha += alphaSpeed;
			if (personEyelids.alpha >= 1) {
				personEyelids.alpha = 1;
				fadingOut = true;
			}
		}
	});
	
	ticker.start();
	
	Object.assign(container, {
		scale: 0.5,
		position: { x: 125, y: 232 }
	})
	
	container.addChild(personShadow, person, personEyelids);
	
	return container;
}

