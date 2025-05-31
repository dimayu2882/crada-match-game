import { Container, Ticker, Graphics } from 'pixi.js';

import { allTextureKeys } from '../common/assets.js';
import { createSprite } from '../helpers/index.js';

export default async function createIceBackground(app) {
	const container = new Container();
	container.label = 'frost'
	
	const frost = await createSprite(allTextureKeys.ice);
	frost.width = app.screen.width;
	frost.height = app.screen.height;
	
	const frostMask = new Graphics();
	
	frost.mask = frostMask;
	container.addChild(frost);
	container.addChild(frostMask);
	
	const ticker = new Ticker();
	let frozenHeight = 0;
	ticker.add(() => {
		if (frozenHeight < Math.hypot(app.screen.width, app.screen.height)) {
			frozenHeight += 4;
			frostMask.clear();
			const radius = frozenHeight;
			frostMask.circle(app.screen.width / 2, app.screen.height / 2, radius);
			frostMask.fill(0xffffff);
		}
	});
	
	return { container, ticker };
}
