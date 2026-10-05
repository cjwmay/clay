(async () => {
	try {
		if (process.env.NODE_ENV === 'development') {
			await import('@clayui/css/src/scss/atlas.scss');
		}
		else {
			await import('@clayui/css/lib/css/atlas.css');
		}
	}
	catch (error) {
		console.error(`${error.name}: ${error.message}`);
	}
})();

const spritemap = require('@clayui/css/lib/images/icons/icons.svg');
import React, {useEffect} from 'react';
import svg4everybody from 'svg4everybody';
import {Provider} from '@clayui/provider';


const withColorScheme = (Story, context) => {
	const scheme = context.globals.colorScheme || 'light';

	useEffect(() => {
		document.documentElement.setAttribute('data-color-scheme', scheme);
	}, [scheme]);

	return <Story />;
};

export const decorators = [
	withColorScheme,
	(Story) => {
		useEffect(() => {
			svg4everybody({
				polyfill: true,
			});
		}, []);

		return (
			<Provider spritemap={spritemap}>
				<div>
					<Story />
				</div>
			</Provider>
		);
	},
];

export const parameters = {
	options: {
		storySort: {
			order: ['Design System', ['Application', 'Components', 'Charts']],
		},
	},
};

export const globalTypes = {
	colorScheme: {
		name: 'Color scheme',
		description: 'Clay color scheme — switch between all four modes',
		defaultValue: 'light',
		toolbar: {
			icon: 'contrast',
			items: [
				{value: 'light', title: 'Light'},
				{value: 'dark', title: 'Dark'},
				{value: 'light-high-contrast', title: 'Light High Contrast'},
				{value: 'dark-high-contrast', title: 'Dark High Contrast'},
			],
			showName: true,
			dynamicTitle: true,
		},
	},
};
