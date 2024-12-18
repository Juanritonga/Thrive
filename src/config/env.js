export const config = {
    api: {
        baseURL: import.meta.env.VITE_API_BASE_URL || 'https://thrive-be.app-dev.altru.id/api/v1',
        timeout: 30000
    },
    app: {
        name: 'Thrive',
        version: '1.0.0'
    }
};
