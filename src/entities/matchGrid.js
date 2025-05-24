import { Container } from 'pixi.js';

import bgUrl from '/img/wood.png';
import { ROWS, COLS } from '../constants/index.js';
import { createSprite } from '../helpers/index.js';
import createCell from './cell.js';

export default async function   createMatchGrid(app) {
	const gameState = {
		activeCells: [],
		clickCount: 0
	};
	
	const parentContainer = new Container();
	const paddings = 32;
	
	const spriteBg = await createSprite(bgUrl);
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
		
		return Object.values(counts).some(count => count === 3);
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
	function handleMatchResult(isMatch) {
		setTimeout(() => {
			if (isMatch) {
				console.log('Super!')
			}
			resetState();
		}, 1000)
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

