import { Container, Ticker, Graphics } from 'pixi.js'
import { allTextureKeys } from '../common/assets.js';

import { COLS, ROWS } from '../common/constants.js';
import { createSprite } from '../helpers/index.js';
import createCell from './cell.js';

export default async function   createMatchGrid(app, target) {
	const gameState = {
		activeCells: [],
		clickCount: 0
	};
	
	const parentContainer = new Container();
	const paddings = 32;
	
	const spriteBg = await createSprite(allTextureKeys.wood);
	spriteBg.width = app.screen.width / 2;
	spriteBg.height = app.screen.height;
	
	parentContainer.addChild(spriteBg);
	
	async function createCellsGrid(paddings) {
		const gridContainer = new Container();
		const cells = [];
		
		// Создаем все ячейки
		for (let row = 0; row < ROWS; row++) {
			cells[row] = []
			for (let col = 0; col < COLS; col++) {
				const cell = await createCell(
					app,
					col,
					row,
					paddings
				);
				cells[row][col] = cell;
				gridContainer.addChild(cell.getContainer());
			}
		}
		
		return { gridContainer, cells }
	}
	
	// Функция проверки совпадений
	function checkMatches() {
		if (gameState.activeCells.length !== 3) return false
		
		const counts = {};
		
		for (const cell of gameState.activeCells) {
			const starType = cell.getLabel();
			counts[starType] = (counts[starType] || 0) + 1;
		}
		
		const objSelected = {
			isMatches: Object.values(counts).some(count => count === 3),
			cellLabel: Object.keys(counts)[0],
			cellElement: gameState.activeCells[2].getContainer()
		}
		
		return objSelected;
	}
	
	function handleCellClick(cell) {
		if (gameState.clickCount >= 3 || cell.isActive()) return
		
		cell.activate();
		gameState.activeCells.push(cell);
		gameState.clickCount++;
		
		if (gameState.clickCount === 3) {
			const isMatch = checkMatches();
			handleMatchResult(isMatch);
		}
	}
	
	// Обработка результата совпадения
	function handleMatchResult(objSelected) {
		setTimeout(() => {
			if (objSelected.isMatches) {
				console.log('Super!');
				const cloneCell = cloneCellVisual(objSelected.cellElement.children[2]);
				parentContainer.addChild(cloneCell);
				
				moveToTarget(cloneCell, target, () => {
					const explosion = new Graphics();
					explosion.circle(0, 0, 20);
					explosion.fill({ color: 0xffcc00, alpha: 1 });
					explosion.x = cloneCell.x + cloneCell.width / 2;
					explosion.y = cloneCell.y + cloneCell.height / 2;
					parentContainer.addChild(explosion);

					let scale = 1;
					const explodeTicker = Ticker.shared;
					function explode() {
						scale += 0.2;
						explosion.scale.set(scale);
						explosion.alpha -= 0.05;
						cloneCell.alpha += explodeTicker;

						if (explosion.alpha <= 0) {
							parentContainer.removeChild(cloneCell);
							parentContainer.removeChild(explosion);
							explodeTicker.remove(explode);
						}
					}
					explodeTicker.add(explode);
				});
			}
			resetState();
		}, 1000)
	}
	
	//Анимация перелета к цели
	function moveToTarget(element, getTargetPosition, onComplete) {
		const ticker = Ticker.shared;
		let t = 0;
		const duration = 60;
		const startPos = { x: element.x, y: element.y };
		
		ticker.add(function animate() {
			const globalTarget = getTargetPosition();
			if (!globalTarget) return;
			if (!element.parent || !getTargetPosition) return;
			const targetPosition = element.parent.toLocal(getTargetPosition());
			
			if (t >= duration) {
				element.x = targetPosition.x;
				element.y = targetPosition.y;
				ticker.remove(animate);
				onComplete?.();
				return;
			}
			
			const progress = t / duration;
			const eased = 0.5 - 0.5 * Math.cos(Math.PI * progress);
			const arcY = Math.sin(Math.PI * progress) * 80;
			
			element.x = startPos.x + (targetPosition.x - startPos.x + element.width) * eased;
			element.y = startPos.y + (targetPosition.y - startPos.y - element.height) * eased - arcY;
			
			t++;
		});
	}
	
	// Клонирование ячейки
	function cloneCellVisual(originalSprite) {
		const texture = originalSprite.texture;
		const clone = new originalSprite.constructor(texture);
		
		clone.x = originalSprite.x;
		clone.y = originalSprite.y;
		clone.scale.set(originalSprite.scale.x, originalSprite.scale.y);
		clone.anchor?.set?.(0.5);
		
		return clone;
	}
	
	function resetState() {
		gameState.activeCells.forEach(cell => cell.deactivate());
		gameState.activeCells = [];
		gameState.clickCount = 0;
	}
	
	// Создаем сетку с ячейками
	const { gridContainer, cells } = await createCellsGrid(paddings);
	
	// Настраиваем параметры контейнера сетки
	Object.assign(gridContainer, {
		width: parentContainer.width - paddings,
		height: parentContainer.height - paddings,
		position: { x: paddings / 2, y: paddings / 2 },
		interactive: true,
		customData: {
			isThreeClicksReached: false
		}
	})
	
	// Добавляем обработчик кликов
	gridContainer.on('pointerdown', (event) => {
		const localPos = event.getLocalPosition(gridContainer);
		const col = Math.floor(localPos.x / (gridContainer.width / COLS));
		const row = Math.floor(localPos.y / (gridContainer.height / ROWS));
		
		if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
			handleCellClick(cells[row][col])
		}
	})
	
	parentContainer.addChild(gridContainer);
	
	parentContainer.x = app.screen.width / 2;
	
	return parentContainer;
}
