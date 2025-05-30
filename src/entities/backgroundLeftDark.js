import {
	Container,
	Graphics,
	Ticker
} from 'pixi.js'

import { allTextureKeys } from '../common/assets.js'
import { createSprite } from '../helpers/index.js'
import createArrow from './arrow.js'
import { createPendulum, createAnimeCurtain } from './index.js'

export default async function createBackgroundDark(app) {
	const container = new Container()
	container.label = 'dark'
	
	// Pendulum
	const pendulum = await createPendulum(app);
	pendulum.position.set(app.screen.width / 3 + pendulum.width, 0);
	
	// Arrow
	const arrow = await createArrow(app);
	
	// 1. Фон
	const bgDark = await createSprite(allTextureKeys.darkRoom)
	bgDark.width = app.screen.width / 2
	bgDark.height = app.screen.height
	container.addChild(bgDark)
	
	// 2. Маска
	const mask = new Graphics()
	container.addChild(mask)
	container.mask = mask
	
	// 3. Анимация маски
	const animateMask = () => {
		const totalWidth = bgDark.width
		let currentWidth = 0
		const speed = 1
		
		const ticker = new Ticker()
		ticker.add(() => {
			if (currentWidth < totalWidth) {
				currentWidth += speed
				const t = currentWidth / totalWidth
				const eased = 0.5 - 0.5 * Math.cos(Math.PI * t) // easeInOutSine
				const easedWidth = eased * totalWidth
				mask.clear()
					.rect(bgDark.width - easedWidth, 0, easedWidth, bgDark.height)
					.fill(0xFFFFFF)
				pendulum.position.set(app.screen.width / 2 - pendulum.width / 2 - easedWidth, 0);
				arrow.position.set(
					app.screen.width / 2 + pendulum.width / 3 - easedWidth,
					app.screen.height / 2 - arrow.height
				);
			} else {
				ticker.stop()
				ticker.destroy()
			}
		});
		ticker.start();
	}
	
	animateMask();
	
	const animContainer = await createAnimeCurtain(app);
	
	container.addChild(animContainer);
	
	return { container, pendulum, arrow }
}
