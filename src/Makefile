install_modules:
	echo "Installing server modules"
	sudo npm config -g set registry http://registry.npmjs.org/
	sudo npm install -g aws-sdk
	sudo npm install -g express
	sudo npm install -g q
	sudo npm install -g yadda
	sudo npm install -g mocha
	sudo npm install -g casperjs
	sudo npm install -g async
	sudo npm install -g sinon
	sudo npm install -g casper-chai
	sudo npm install -g supervisor
	sudo npm install -g chai-fuzzy
	echo "Linking global node modules"
	export NODE_PATH=$NODE_PATH:/usr/local/lib/node_modules
