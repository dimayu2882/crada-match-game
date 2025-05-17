import { Sprite, Assets, Container, Graphics } from 'pixi.js';

import bgUrl from '/img/wood.png';
import tileUrl from '/img/tile.png';
import tileActiveUrl from '/img/tile_yellow.png';
import { ROWS, COLS, STARS } from '../constants/index.js';
import { getRandomElement } from '../helpers/index.js';

export default async function createMatchGrid(app) {
	const parentContainer = new Container();
	const paddings = 32;
	const starPadding = 10;
	
	const textureBg = await Assets.load(bgUrl);
	const spriteBg = new Sprite(textureBg);
	
	spriteBg.width = app.screen.width / 2;
	spriteBg.height = app.screen.height;
	
	parentContainer.addChild(spriteBg);
	
	async function createBoard() {
		const mathGridContainer = new Container();
		
		const cells = [];
		const cellSize = Math.min(
			app.screen.width / 2 / COLS,
			app.screen.height / ROWS
		);
		
		for (let row = 0; row < ROWS; row++) {
			cells[row] = [];
			
			for (let col = 0; col < COLS; col++) {
				const cellContainer = new Container();
				
				const tile = Assets.load(tileUrl);
				const cellBg = new Sprite(await tile);
				
				const tileActive = Assets.load(tileActiveUrl);
				const cellBgActive = new Sprite(await tileActive);
				
				const star = Assets.load(getRandomElement(STARS).url);
				const cellStar = new Sprite(await star);
				cellStar.position.set(starPadding, starPadding);
				
				Object.assign(cellContainer, {
					position: {
						x: col * cellSize + cellSize / 2 + col * paddings / 4,
						y: row * cellSize + cellSize / 2
					},
					pivot: { x: cellSize / 2, y: cellSize / 2 },
					interactive: true,
					cursor: 'pointer',
				});
				
				cellContainer.addChild(cellBgActive, cellBg, cellStar);
				
				mathGridContainer.addChild(cellContainer);
			}
		}
		
		Object.assign(mathGridContainer, {
			width: parentContainer.width - paddings,
			height: parentContainer.height - paddings,
			position: { x: paddings / 2, y: paddings / 2 },
		});
		
		parentContainer.addChild(mathGridContainer);
	}
	
	await createBoard();
	
	parentContainer.x = app.screen.width / 2;
	
	app.stage.addChild(parentContainer);
}

