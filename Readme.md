# JavaScript api for rclone rc

This is a javascript api to access the [rclone rc](https://rclone.org/rc) api.

# How to install 

If you are using <b>npm</b>,
```
npm install rclone-api --save
```
or using <b>yarn</b>,
```shell script
yarn install rclone-api 
```

## Usage

Import the required function

```js
import {getAllProviders} from "rclone-api";
```

And then,

```js
getAllProviders().then(res => {
    //... do something with the data
}, error => {
    //... do something with the error
    //eg: alert(error)
});
```

OR

```js
getAllProviders().then(res => {
    //... do something with the data
}).catch( error => {
    //... do something with the error
    //eg: alert(error)
});
```

## Supported calls

1. ```getStats()```: returns the current rclone stats.
1. ```getCurrentBandwidthSetting()```: fetches the current limit that is max which the rclone can send request at.
1. ```setCurrentBandwidthSetting(newRate)```: changes the current bandwidth limit of the rclone backend. 
 @param newRate {string} Human readable format of size eg: 1M|2M|1.2G specifying 1MB, 2MB, 1.2GB respectively.
1. ```createPublicLink(remoteName, remotePath)``` creates a public link for a supported remote
1. ```getAllProviders()``` returns all the possible providers supported by the rclone backend
1. ```getAllConfigDump()``` return the configured remotes from the rclone backend
1. ```getFsInfo(remoteName)``` fetches the information regarding features, hashes from the rclone backend.
1. ```getFilesList(remoteName, remotePath)``` fetches the files for a specified remote path (remoteName + remotePath).
1. ```getRemoteInfo(remoteName)``` fetches the information about a provider.
1. ```getRcloneVersion()```  fetches the version and details about the running rclone version.
1. ```getAllRemoteNames()``` fetches all the remotes in the config.
1. 
