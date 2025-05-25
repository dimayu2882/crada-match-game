import {
	Container,
	Graphics,
	AnimatedSprite,
	Assets,
	Ticker,
} from 'pixi.js'

import { allTextureKeys } from '../common/assets.js'
import { createSprite } from '../helpers/index.js'
import { createPendulum } from './index.js'

export default async function createBackgroundDark(app) {
	const container = new Container();
	container.label = 'dark';
	
	const pendulum = await createPendulum(app);
	pendulum.position.set(app.screen.width / 3 + pendulum.width, 0);
	pendulum._zIndex = 100;
	
	// 1. Фон
	const bgDark = await createSprite(allTextureKeys.darkRoom);
	bgDark.width = app.screen.width / 2;
	bgDark.height = app.screen.height;
	container.addChild(bgDark);
	
	// 2. Маска
	const mask = new Graphics();
	container.addChild(mask);
	bgDark.mask = mask;

	// 3. Анимация маски
	const animateMask = () => {
		const totalWidth = bgDark.width;
		let currentWidth = 0;
		const speed = 2;

		const ticker = new Ticker();
		ticker.add(() => {
			if (currentWidth < totalWidth) {
				currentWidth += speed;
				mask.clear()
					.rect(bgDark.width - currentWidth, 0, currentWidth, bgDark.height)
					.fill(0xFFFFFF);
				pendulum.position.set(app.screen.width / 2 - pendulum.width / 2 - currentWidth, 0);
			} else {
				ticker.stop();
				ticker.destroy();
			}
		});
		ticker.start();
	};

	animateMask();
	
	async function createAnimation(container) {
		try {
			// 1. Массив путей к изображениям
			const imagePaths = [
				"/img/curtain/curtain_frame_1.png",
				"/img/curtain/curtain_frame_2.png",
				"/img/curtain/curtain_frame_3.png",
				"/img/curtain/curtain_frame_4.png"
			];
			
			// 2. Загрузка всех изображений
			const textures = await Promise.all(
				imagePaths.map(path => Assets.load(path))
			);
			
			// 3. Создание анимации
			const animatedSprite = new AnimatedSprite(textures);
			animatedSprite.animationSpeed = 0.1;
			animatedSprite.play();
			
			// 4. Добавление на сцену
			container.addChild(animatedSprite);
			
			return animatedSprite;
		} catch (error) {
			console.error('Ошибка создания анимации:', error);
			
			// Fallback - красный квадрат
			const fallback = new Graphics()
				.rect(0, 0, 100, 100)
				.fill(0xFF0000);
			container.addChild(fallback);
			return fallback;
		}
	}

	const curtainAnim = await createAnimation(container);
	
	container.addChild(curtainAnim);
	container.addChild(pendulum);
	
	return { container, pendulum };
}
