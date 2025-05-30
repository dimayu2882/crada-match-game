import { Container, Assets } from 'pixi.js';

import {
	createBackgroundDark, createIceBackground,
	createMatchGrid,
	createPerson,
	createSceneLeft
} from '../entities/index.js'
import { appTextures } from '../common/assets.js';

const createGameContainer = () => {
	const container = new Container();
	container.sortableChildren = true;
	return container;
}

const initializeGameElements = async (app) => {
	const gameContainer = createGameContainer();
	
	const [mathGrid, sceneLeft,
		{ container: bgDark, pendulum, arrow },
		person] = await Promise.all([
		createMatchGrid(app),
		createSceneLeft(app),
		createBackgroundDark(app),
		createPerson()
	]);
	
	const frost = await createIceBackground(app);
	
	person.zIndex = 3;
	pendulum.zIndex = 5;
	arrow.zIndex = 6;
	mathGrid.zIndex = 7;
	frost.zIndex = 8;
	
	gameContainer.addChild(
		mathGrid, sceneLeft, bgDark,
		person, pendulum, arrow, frost
	);
	
	return gameContainer
}

const runGame = async (app) => {
	const gameContainer = await initializeGameElements(app)
	app.stage.addChild(gameContainer)
}

export async function setupGame(app) {
	try {
		if (!appTextures || typeof appTextures !== 'object') {
			throw new Error('appTextures не определен или имеет неверный формат')
		}
		
		const loadPromises = Object.entries(appTextures).map(async ([textureId, url]) => {
			const texture = await Assets.load(url);
			Assets.cache.set(textureId, texture);
		});
		
		await Promise.all(loadPromises);
		
		await runGame(app);
	} catch (error) {
		console.error('Ошибка при инициализации игры:', error);
		throw error;
	}
}

