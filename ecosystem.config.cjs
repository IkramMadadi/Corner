module.exports = {
	apps: [
		{
			name: 'aquasoft-nextjs-shop',
			script: 'pnpm',
			args: 'start', // This runs the 'npm run start' command to start your Next.js app
			cwd: './', // The working directory of the app (adjust if needed)
			instances: '1', // Runs the app in cluster mode with maximum instances
			exec_mode: 'fork', // Use cluster mode to take advantage of multi-core systems
			env: {
				NODE_ENV: 'production', // Ensure the environment is set to production
				PORT: 4000, // The port your app should run on
			},
			watch: false, // Set to true if you want PM2 to watch for changes
			log_date_format: 'YYYY-MM-DD HH:mm Z', // Customize the log date format
			error_file: './logs/nextjs-error.log', // Path to the error log file
			out_file: './logs/nextjs-out.log', // Path to the output log file
			merge_logs: true, // Merge logs from all instances into one log file
		},
	],
};
