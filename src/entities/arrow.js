import { Container, Ticker } from 'pixi.js'

import { allTextureKeys } from '../common/assets.js'
import { createSprite } from '../helpers/index.js'

export default async function createArrow() {
	const arrowContainer = new Container();
	arrowContainer.label = 'arrow';
	
	// Arrow
	const arrow = await createSprite(allTextureKeys.arrow);
	arrow.scale.set(-.5, .5);
	
	// Lines
	const lines = new Container();
	const lineSprites = [];
	
	for (let i = 0; i < 3; i++) {
		const line = await createSprite(allTextureKeys.line);
		line.x = i * line.width + 10 * i;
		lines.addChild(line);
		lineSprites.push(line);
	}
	
	lines.x = - arrow.width * 2 - 20;
	arrowContainer.addChild(arrow, lines);

	// Анимация с волной (фазовый сдвиг)
	let time = 2;
	Ticker.shared.add(() => {
		time += 0.05;
		
		lineSprites.forEach((line, i) => {
			const phase = i * 0.3;
			line.x = i * line.width + 10 * i + Math.sin(time - phase) * 8;
		});
		
		arrow.x = Math.sin(time) * 8;
	});
	
	return arrowContainer;
}
