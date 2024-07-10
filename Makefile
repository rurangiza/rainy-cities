

all: run

run:
	@npm start

install:
	npm install -g typescript
	npm install -g ts-node
	npm install -g nodemon

setup:
	npm init --yes
	tsc --init
	npm install @types/node