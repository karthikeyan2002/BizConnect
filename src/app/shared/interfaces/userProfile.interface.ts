export interface UserProfile {
    apiKey: string;
    appName: string;
    city: string;
    createdAt: string; 
    displayName: string;
    email: string;
    emailVerified: boolean;
    firstName: string;
    isAnonymous: boolean;
    lastLoginAt: string; 
    lastName: string;
    myCart?: any; 
    photoURL: string;
    providerData: any;
    stsTokenManager: any; 
    uid: string;
}
