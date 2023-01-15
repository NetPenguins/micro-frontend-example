import { Manifest, RemoteConfig } from "@angular-architects/module-federation";
 
export type CustomRemoteConfig = RemoteConfig & {
    type: string;
    exposedModule: string;
    displayName: string;
    ngModuleName: string;
};
export type CustomManifest = Manifest<CustomRemoteConfig>;