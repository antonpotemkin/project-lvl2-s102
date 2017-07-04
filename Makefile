install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js jsons/before.json jsons/after.json

publish:
	npm publish

lint:
	npm run eslint -- src

test:
	npm test
