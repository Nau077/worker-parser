ROOT:=$(shell pwd)

.PHONY: build/server
build/server: SHELL=bash
build/server:
	@cd server; \
	rm -rf node_modules; \
	exec npm install

.PHONY: run/server
run/server: SHELL=bash
run/server:
	@cd server; \
	exec npm run dev

.PHONY: build/client
build/client: SHELL=bash
build/client:
	@cd client; \
	rm -rf node_modules; \
	exec npm install

.PHONY: run/client
run/client: SHELL=bash
run/client:
	@cd client; \
	exec npm run serve

run:
	make -j 2 run/client run/server
.PHONY: run

