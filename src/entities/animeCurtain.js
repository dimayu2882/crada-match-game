import { AnimatedSprite, Assets, Container } from 'pixi.js';

export default async function createAnimeCurtain(app) {
	const container = new Container();
	
	// Curtain
	const sheetCurtain = await Assets.load('../img/curtain.json');
	const animatedSpriteCurtain = new AnimatedSprite(Object.values(sheetCurtain.textures));
	
	container.addChild(animatedSpriteCurtain);
	
	animatedSpriteCurtain.animationSpeed = 0.3;
	animatedSpriteCurtain.play();
	animatedSpriteCurtain.scale.x = -2;
	animatedSpriteCurtain.scale.y = 2;
	animatedSpriteCurtain.anchor.x = 1;
	animatedSpriteCurtain.position.set(app.screen.width / 4 + 50, 100);
	animatedSpriteCurtain.zIndex = 1;
	
	// Wind
	const sheetWind = await Assets.load('../img/wind.json');
	const animatedSpriteWind = new AnimatedSprite(Object.values(sheetWind.textures));
	
	container.addChild(animatedSpriteWind);
	
	animatedSpriteWind.animationSpeed = 0.3;
	animatedSpriteWind.play();
	animatedSpriteWind.scale.x = 2;
	animatedSpriteWind.scale.y = -2;
	animatedSpriteWind.anchor.x = 1;
	animatedSpriteWind.position.set(app.screen.width / 2, animatedSpriteWind.height + 100);
	
	return container;
}

