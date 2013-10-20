
var _ = require('lodash');
var resteasy = require('resteasy');

//ADD NEW KEY OBJECT
var keys = {
	github: {
		login: '490074a2ebeecd8ff906',
		pass: '2f7ad427fc8ae6362b400609008549feeeb9be3f'
	},
	linkedin: {
		login: 'hm19mmytz1y3',
		pass: 'VkPwjdK4ew0HxruC'
	},
	instagram: {
		login: 'e829032af87b47bc910fbdf5067e2783',
		pass: 'd8c5522bb8e2434494b886f3a213027a'
	}
};

var callback = 'http://localhost:1337/network/callback?network=';

var networks = {};

for (network in keys) {
	networks[network] = resteasy('resteasy/lib/providers/' + network, keys[network], callback + network);
}

module.exports = networks;