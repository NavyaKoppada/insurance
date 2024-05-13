import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
    console.log('iam here', keycloak.isLoggedIn())
    return () =>
        keycloak.init({
            config: {
                url: 'http://localhost:8080',
                realm: 'myrealm',
                clientId: 'tabner',
            },
            enableBearerInterceptor: true,
            bearerPrefix: 'Bearer',
            bearerExcludedUrls: ['/assets'],
            initOptions: {
                onLoad: 'check-sso',
                silentCheckSsoRedirectUri:
                    window.location.origin + '/assets/silent-check-sso.html',
            },
        });
}