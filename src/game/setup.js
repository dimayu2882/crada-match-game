import { createMatchGrid } from '../entities/index.js';

export async function setupGame(app) {
	
	//Добавление на сцену контейнера с ячейками
	const mathGrid = await createMatchGrid(app);
	app.stage.addChild(mathGrid.parentContainer);
}
