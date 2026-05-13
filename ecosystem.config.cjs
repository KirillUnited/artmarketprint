module.exports = {
	apps: [
		{
			name: 'myapp',
			cwd: '/home',
			script: '.next/standalone/server.js',
			instances: 1,
			exec_mode: 'fork',
			autorestart: true,
			watch: false,
			max_memory_restart: '500M',
			env: {
				PORT: 3000,
				NODE_ENV: 'production',
			},
		},
	],
};
