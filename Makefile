install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js __tests__/fixtures/before.json __tests__/fixtures/after.json

publish:
	npm publish

lint:
	npm run eslint -- src

test:
	npm test
