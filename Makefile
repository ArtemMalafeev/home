install:
	npm install

lint:
	npx stylelint ./assets/styles/**/*.css
	npx stylelint ./assets/styles/*.css
	npx htmlhint ./*.html

fix:
	npx stylelint ./assets/styles/**/*.css --fix
	npx stylelint ./assets/styles/*.css --fix
