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
	
	const [sceneLeft,
		{ container: bgDark, pendulum, arrow, getTargetPosition },
		person] = await Promise.all([
		createSceneLeft(app),
		createBackgroundDark(app),
		createPerson()
	]);
	
	const {
		container: frost,
		ticker: frostTicker
	} = await createIceBackground(app);
	
	person.zIndex = 3;
	pendulum.zIndex = 5;
	arrow.zIndex = 6;
	frost.zIndex = 8;
	
	gameContainer.addChild(sceneLeft, bgDark,
		person, pendulum, arrow, frost
	);
	
	const mathGrid = await createMatchGrid(app, getTargetPosition);
	mathGrid.zIndex = 7;
	
	gameContainer.addChild(mathGrid);
	
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

