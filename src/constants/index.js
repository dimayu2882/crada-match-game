import bgUrl from '@img/wood.png'
import { Assets, Sprite } from 'pixi.js'

const ROWS = 7;
const COLS = 6;
const CELL_SIZE = 60;
const STARS =
	[
		{
			name: 'star_blue',
			url: 'src/assets/img/star_blue.png',
		},
		{
			name: 'star_gray',
			url: 'src/assets/img/star_gray.png',
		},
		{
			name: 'star_green',
			url: 'src/assets/img/star_green.png',
		},
		{
			name: 'star_ice',
			url: 'src/assets/img/star_ice.png',
		},
		{
			name: 'star_orange',
			url: 'src/assets/img/star_orange.png',
		},
		{
			name: 'star_pink',
			url: 'src/assets/img/star_pink.png',
		},
		{
			name: 'star_purple',
			url: 'src/assets/img/star_purple.png',
		},
		{
			name: 'star_red',
			url: 'src/assets/img/star_red.png',
		},
		{
			name: 'star_wood',
			url: 'src/assets/img/star_wood.png',
		},
		{
			name: 'star_yellow',
			url: 'src/assets/img/star_yellow.png',
		}
	];

export { ROWS, COLS, CELL_SIZE, STARS };
