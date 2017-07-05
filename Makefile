install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js __tests__/fixtures/json/before.json __tests__/fixtures/json/after.json

publish:
	npm publish

lint:
	npm run eslint -- src

test:
	npm test
