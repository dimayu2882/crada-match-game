import { Sprite, Assets, Container } from 'pixi.js'

import tileUrl from '/img/tile.png';
import tileActiveUrl from '/img/tile_yellow.png';
import { COLS, ROWS, STARS } from '../constants/index.js'
import { getRandomElement } from '../helpers/index.js'

export default async function createCell(app, col, row, paddings) {
	const cellSize = Math.min(
		app.screen.width / 2 / COLS,
		app.screen.height / ROWS
	);
	
	const cellContainer = new Container();
	
	const tile = Assets.load(tileUrl);
	const cellBg = new Sprite(await tile);
	
	const tileActive = Assets.load(tileActiveUrl);
	const cellBgActive = new Sprite(await tileActive);
	
	const randomStarObject = getRandomElement(STARS);
	
	const star = Assets.load(randomStarObject.url);
	const cellStar = new Sprite(await star);
	cellStar.position.set(10, 6);
	
	Object.assign(cellContainer, {
		position: {
			x: col * cellSize + cellSize / 2 + col * paddings / 4,
			y: row * cellSize + cellSize / 2
		},
		pivot: { x: cellSize / 2, y: cellSize / 2 },
		interactive: true,
		cursor: 'pointer',
		label: `${randomStarObject.name}`,
		customData: {
			isActive: false,
		}
	});
	
	cellContainer.addChild( cellBgActive, cellBg, cellStar);
	
	return cellContainer;
}

