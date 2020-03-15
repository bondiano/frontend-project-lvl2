install:
	npm install
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage
build:
	rm -rf dist
	npm run build