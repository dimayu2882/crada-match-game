import {
	Container,
	Graphics,
	Ticker
} from 'pixi.js'

import { allTextureKeys } from '../common/assets.js'
import { createSprite } from '../helpers/index.js'
import { createPendulum, createAnimeCurtain } from './index.js'

export default async function createBackgroundDark(app) {
	const container = new Container()
	container.label = 'dark'
	
	const pendulum = await createPendulum(app)
	pendulum.position.set(app.screen.width / 3 + pendulum.width, 0)
	
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
		const speed = 2
		
		const ticker = new Ticker()
		ticker.add(() => {
			if (currentWidth < totalWidth) {
				currentWidth += speed
				mask.clear()
					.rect(bgDark.width - currentWidth, 0, currentWidth, bgDark.height)
					.fill(0xFFFFFF)
				pendulum.position.set(app.screen.width / 2 - pendulum.width / 2 - currentWidth, 0)
			} else {
				ticker.stop()
				ticker.destroy()
			}
		})
		ticker.start()
	}
	
	animateMask();
	
	const animContainer = await createAnimeCurtain(app);
	
	container.addChild(animContainer);
	container.addChild(pendulum);
	
	return { container, pendulum }
}
