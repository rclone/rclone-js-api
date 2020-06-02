import {axiosInstance} from "./axiosInstance";
import urls from "./endpoint";
import {addColonAtLast, isLocalRemoteName} from "./Tools";

/**
 * getStats returns the current rclone stats.
 * @returns {Promise<unknown>}
 */
export const getStats = () => {
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.stats).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}

/**
 *
 * @returns {Promise<unknown>}
 */
export const getCurrentBandwidthSetting = () => {
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.bwlimit).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}

/**
 * setCurrentBandwidthSetting changes the current bandwidth limit of the rclone backend.
 * @param newRate {string} Human readable format of size eg: 1M|2M|1.2G specifying 1MB, 2MB, 1.2GB respectively.
 * @returns {Promise<unknown>}
 */
export const setCurrentBandwidthSetting = (newRate) => {
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.bwlimit, {rate: newRate}).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}

/**
 * Create a public link for a supported remote
 * @param remoteName {string}
 * @param remotePath {string}
 * @returns {Function}
 */
export const createPublicLink = (remoteName, remotePath) => {
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.createPublicLink, {fs: remoteName, remote: remotePath}).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
};

/**
 * getAllProviders returns all the possible providers supported by the rclone backend
 * @returns {Promise<unknown>}
 */
export const getAllProviders = () => {
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.getProviders).then(res => {
			resolve(res.data.providers);
		}, error => {
			reject(error);
		})
	})
}

/**
 * getConfigDump return the configured remotes from the rclone backend
 * @returns {Promise<unknown>}
 */
export const getConfigDump = () => {
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.getConfigDump).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}
/**
 * getFsInfo fetches the information regarding features, hashes from the rclone backend. Stores into redux store.
 * @param remoteName {string} The name of the remote
 * @returns {Function}
 */
export const getFsInfo = (remoteName) => {
	let sentRemoteName;
	if(!isLocalRemoteName(remoteName)) {
		sentRemoteName = addColonAtLast(remoteName.split(':')[0]);
	}
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.getFsInfo, {
			fs: sentRemoteName
		}).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}

/**
 * getFilesList fetches the files for a specified remote path (remoteName + remotePath). Stores into redux store.
 * @param fs {string} Name of the remote config/ ("/" for local path). May contain abc:bucketName for bucket based remotes
 * @param remotePath {string} Name of the path in the remote
 * @returns {Function}
 */
export const getFilesList = (fs, remotePath) => {
	return new Promise((resolve, reject) => {
		if(!fs || fs === ""){
			reject("Invalid fs specified")
		}

		// check if it is a local path
		fs = fs.indexOf('/') !== 0 ? addColonAtLast(fs) : fs;

		axiosInstance.post(urls.getFsInfo, {
			fs,
			remote: remotePath
		}).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}

/**
 * getRemoteInfo fetches the information about a provider.
 * @param remoteName
 * @returns {Promise<unknown>}
 */
export const getRemoteInfo = (remoteName) => {

	return new Promise((resolve, reject) => {

		if(!remoteName) {
			reject("Invalid remote name specified")
			return
		}

		if (!isLocalRemoteName(remoteName)) {
			remoteName = addColonAtLast(remoteName);
		}
		axiosInstance.post(urls.getAbout, {
				fs: remoteName
		}).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})

}

/**
 * getRemoteInfo fetches the information about a provider.
 * @param remoteName
 * @returns {Promise<unknown>}
 */
export const getRcloneVersion = () => {
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.getRcloneVersion).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}

