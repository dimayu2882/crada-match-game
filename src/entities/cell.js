import { Container, Ticker } from 'pixi.js';
import { allTextureKeys } from '../common/assets.js';

import { COLS, ROWS, STARS } from '../common/constants.js';
import { createSprite, getRandomElement } from '../helpers/index.js';

export default async function createCell(app, col, row, paddings) {
	const cellSize = Math.min(
		app.screen.width / 2 / COLS,
		app.screen.height / ROWS
	)
	
	const cellContainer = new Container()
	
	const [cellBg, cellBgActive] = await Promise.all([
		createSprite(allTextureKeys.tile),
		createSprite(allTextureKeys.tileYellow)
	]);
	const randomStarObject = getRandomElement(STARS)
	const cellStar = await createSprite(randomStarObject.textureKey);
	cellStar.position.set(10, 4)
	
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
			isActive: false
		}
	})
	
	cellContainer.addChild(cellBgActive, cellBg, cellStar)
	
	const cellMethods = {
		activate() {
			cellContainer.customData.isActive = true
			cellBg.alpha = 0
			cellBgActive.alpha = 1
			
			const ticker = new Ticker()
			let scale = 1
			let phase = 'down'
			
			ticker.add(() => {
				if (phase === 'down') {
					scale -= 0.01
					if (scale <= 0.85) phase = 'up'
				} else {
					scale += 0.01
					if (scale >= 1) {
						scale = 1
						ticker.stop()
					}
				}
				cellContainer.scale.set(scale)
			})
			ticker.start()
		},
		
		deactivate() {
			cellContainer.customData.isActive = false
			cellContainer.scale.set(1)
			cellBg.alpha = 1
			cellBgActive.alpha = 0
		},
		
		getContainer() {
			return cellContainer
		},
		
		getLabel() {
			return cellContainer.label
		},
		
		isActive() {
			return cellContainer.customData.isActive
		}
	}
	
	cellMethods.deactivate()
	
	return cellMethods
}
