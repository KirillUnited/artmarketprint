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
		{
			name: 'sanity-products-sync',
			cwd: '/home/',
			script: './update-products.js',
			interpreter: 'node',
			node_args: '--experimental-specifier-resolution=node',
			instances: 1,
			exec_mode: 'fork',
			autorestart: false,
			cron_restart: '0 */6 * * *',
			watch: false,
			time: true,
			out_file: './logs/products-sync.log',
			error_file: './logs/products-sync-error.log',
			env: {
				NODE_ENV: 'production',
			},
		},
	],
};
