import { Assets, Sprite } from 'pixi.js';

export function getRandomElement(array) {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

export async function createSprite(url) {
	const texture = await Assets.load(url);
	return new Sprite(texture);
}
