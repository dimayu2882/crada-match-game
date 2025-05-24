import {
	createBackgroundDark,
	createMatchGrid,
	createPerson,
	createSceneLeft
} from '../entities/index.js'

export async function setupGame(app) {
	
	//контейнера с ячейками
	const mathGrid = await createMatchGrid(app);
	
	//левый контейнер
	const sceneLeft = await createSceneLeft(app);
	
	//левый контейнер вторая сцена
	
	const {container: bgDark, pendulum} = await createBackgroundDark(app);
	
	const person = await createPerson();
	pendulum._zIndex = 100;
	
	app.stage.addChild(mathGrid, sceneLeft, bgDark, person);
}
