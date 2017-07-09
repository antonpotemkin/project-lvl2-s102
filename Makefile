install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js __tests__/fixtures/json/before.json __tests__/fixtures/json/after.json

plain:
	npm run babel-node -- src/bin/gendiff.js --format plain __tests__/fixtures/json/before.json __tests__/fixtures/json/after.json

json:
	npm run babel-node -- src/bin/gendiff.js --format json __tests__/fixtures/json/before.json __tests__/fixtures/json/after.json

publish:
	npm publish

lint:
	npm run eslint -- src

test:
	npm test
