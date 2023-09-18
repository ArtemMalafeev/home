install:
	npm install

lint:
	npx stylelint 'app/assets/css/**/*.css'
	npx stylelint 'app/assets/css/*.css'
	npx htmlhint 'app/index.html'

fix:
	npx stylelint 'app/assets/css/**/*.css' --fix
	npx stylelint 'app/assets/css/*.css' --fix

build:
	gulp build

local:
	gulp