module.exports = {
	extends: [
		'eslint-config-ali/typescript/vue',
		'prettier',
		'prettier/@typescript-eslint',
		'prettier/vue'
	],
	rules: {
		'no-console': 'off',
		'@typescript-eslint/no-require-imports': 'off'
	}
};
