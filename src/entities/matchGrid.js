import { Sprite, Assets, Container } from 'pixi.js';

import bgUrl from '/img/wood.png';
import { ROWS, COLS } from '../constants/index.js';
import { handleMatchCellClick } from '../game/handleMatchCellClick.js'
import createCell from './cell.js'

export default async function createMatchGrid(app) {
	const parentContainer = new Container();
	const paddings = 32;
	
	const textureBg = await Assets.load(bgUrl);
	const spriteBg = new Sprite(textureBg);
	
	spriteBg.width = app.screen.width / 2;
	spriteBg.height = app.screen.height;
	
	parentContainer.addChild(spriteBg);
	
	async function createBoard() {
		const mathGridContainer = new Container();
		
		const cells = [];
		
		for (let row = 0; row < ROWS; row++) {
			cells[row] = [];
			
			for (let col = 0; col < COLS; col++) {
				const cellContainer = await createCell(app, col, row, paddings);
				
				mathGridContainer.addChild(cellContainer);
				
				cellContainer.on('pointerdown', handleMatchCellClick)
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
	
	return parentContainer;
}

