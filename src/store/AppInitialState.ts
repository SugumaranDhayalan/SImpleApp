import { AppState } from './appState';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AppInitialState: AppState = {
    loading: {
        show: false
    },
    login: {
        error: null,
        isRecoveredPassword: false,
        isRecoveringPassword: false,
        isLoggingIn: false,
        isLoggedIn: false
    }
};
