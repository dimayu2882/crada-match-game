import { Ticker } from 'pixi.js'

export function handleMatchCellClick(event) {
	const target = event.currentTarget;
	const ticker = new Ticker();
	
	target.customData.isActive = !target.customData.isActive;
	
	if (target.customData.isActive) {
		target.children[1].alpha = 0;
		
		let targetScale = 0.97;
		const scaleSpeed = 0.1;
		
		ticker.add(() => {
			if (target.customData.isActive) {
				const dx = targetScale - target.scale.x;
				const dy = targetScale - target.scale.y;
				
				target.scale.x += dx * scaleSpeed;
				target.scale.y += dy * scaleSpeed;
			}
		});
		
		ticker.start();
	}
}
