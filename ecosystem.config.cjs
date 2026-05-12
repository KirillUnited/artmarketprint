module.exports = {
	apps: [
		{
			name: 'art',
			cwd: __dirname,
			script: '.next/standalone/server.js',
			instances: 1,
			exec_mode: 'fork',
			autorestart: true,
			max_memory_restart: '1G',
			env: {
				NODE_ENV: 'production',
				PORT: 3000,
				HOSTNAME: '0.0.0.0',
				NEXT_TELEMETRY_DISABLED: '1',
			},
		},
	],
};
