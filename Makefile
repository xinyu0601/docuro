install:
	@npm install
	@grunt
	@docker build --no-cache --rm -t n3r0ch/docuro .