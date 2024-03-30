import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'app.hikerhunger',
	appName: 'hiker-hunger-app',
	webDir: 'build',
	server: {
		androidScheme: 'https'
	}
};

export default config;
