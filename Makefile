default: clean build run

clean:
	$(info [+] Deleting whatevers on port 80")
	docker kill $$(docker ps --filter ancestor=pms/frontend --format "{{.ID}}")
build:
	$(info [+] Dockerising container with tag name pms/frontend ...")
	docker build -f Dockerfile -t pms/frontend .
run:
	$(info [+] Starting app on port :80 ...")
	docker run -d -p 80:80 --rm pms/frontend