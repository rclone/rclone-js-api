import {axiosInstance} from "./axiosInstance";
import urls from "./endpoint";
import {addColonAtLast, isLocalRemoteName} from "./tools";

/**
 * getStats returns the current rclone stats.
 * @returns {Promise<unknown>}
 */
export const getStats = (group) => {
	let data = {};
		if (group) {
			data = {
				group
			};
		};
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.stats, data).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}

/**
 * getCurrentBandwidthSetting fetches the current limit that is max which the rclone can send request at.
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
 * createPublicLink creates a public link for a supported remote
 * @param remoteName {string}
 * @param remotePath {string}
 * @returns {Function}
 */
export const createNewPublicLink = (remoteName, remotePath) => {
	if (!isLocalRemoteName(remoteName)) {
		remoteName = addColonAtLast(remoteName);
	}
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
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}

/**
 * getConfigDump return the configured remotes from the rclone backend
 * @returns {Promise<unknown>}
 */
export const getAllConfigDump = () => {
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.getConfigDump).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}
/**
 * getFsInfo fetches the information regarding features, hashes from the rclone backend.
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
 * getFilesList fetches the files for a specified remote path (remoteName + remotePath).
 * @param fs {string} Name of the remote config/ ("/" for local path). May contain abc:bucketName for bucket based remotes
 * @param remotePath {string} Name of the path in the remote
 * @returns {Function}
 */
export const getFilesList = (fs, remotePath, options = {}) => {
	return new Promise((resolve, reject) => {
		if(!fs || fs === ""){
			reject("Invalid fs specified");
			return;
		}

		if (!isLocalRemoteName(fs)) {
			fs = addColonAtLast(fs);
		}

		axiosInstance.post(urls.getFilesList, {
			fs,
			remote: remotePath,
			opt: options
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
			reject("Invalid remote name specified");
			return;
		}

		if (!isLocalRemoteName(remoteName)) {
			remoteName = addColonAtLast(remoteName);
		}
		axiosInstance.post(urls.getFsInfo, {
			fs: remoteName
		}).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})

}

/**
 * getRcloneVersion fetches the version and details about the running rclone version.
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


/**
 * getAllRemoteNames fetches all the remotes in the config.
 * @returns {Promise<unknown>}
 */
export const getAllRemoteNames = () => {
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.listRemotes).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}

/**
 * getJobStatus returns the status of a job with jobId
 * @param jobId {number} Valid job id
 * @return {Promise<unknown>}
 */
export const getJobStatus = (jobId) => {
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.getStatusForJob, {jobId}).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}

/**
 * purgeDir deletes the directory with given fs and remote
 * @param fs		{string}	Name of fs
 * @param remote	{string}	path remoteName
 * @return {Promise<unknown>}
 */
export const purgeDir = (fs , remote) => {
	if (!isLocalRemoteName(fs)) {
		fs = addColonAtLast(fs);
	}
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.purge, {
			fs,
			remote
		}).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}


/**
 * deleteFile returns the status of a job with jobId
 * @param fs		{string}	Remote Name
 * @param remote	{string}	Remote Path
 * @return {Promise<unknown>}
 */
export const deleteFile = (fs , remote) => {
	if (!isLocalRemoteName(fs)) {
		fs = addColonAtLast(fs);
	}
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.deleteFile, {
			fs,
			remote
		}).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}

/**
 * cleanTrashForRemote cleans the trash for the remote with remote fs
 * @param fs		{string}	Remote Name
 * @return {Promise<unknown>}
 */
export const cleanTrashForRemote = (fs) => {
	if (!isLocalRemoteName(fs)) {
		fs = addColonAtLast(fs);
	}
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.cleanUpRemote, {
			fs,
		}).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}

/**
 * Get a downloadable url for an rclone object
 * @param ipAddress 	{string}	IP address of running rclone instance
 * @param fsInfo		{object} 	FsInfo of the remote
 * @param remoteName	{string}	name of the remote
 * @param remotePath	{string}	path of the file. Relative to remoteName
 * @param item			{string}	item details
 * @returns 			{string}	url which can be used to download the required file.
 */
export const getDownloadURLForFile = (ipAddress, fsInfo, remoteName, remotePath, item) => {
	let downloadURL = "";

	if (fsInfo.Features.BucketBased) {
		downloadURL = ipAddress + `[${remoteName}]/${remotePath}/${item.Name}`;

	} else {

		downloadURL = ipAddress + `[${remoteName}:${remotePath}]/${item.Name}`;

	}
	return downloadURL;
}

/**
 * Send a backend command and return the result.
 * @param command	{string}			string with the command name
 * @param arg		{array<string>}	 	remote name string eg "drive:"
 * @param opt		{$ObjMap}			list of arguments for the backend command
 * @param fs		{string}		 	remote name string eg "drive:"
 * @returns {Promise<$ObjMap>}
 */
export const backendCommand = (command, arg, opt, fs) => {
	if(!fs) fs = ".";

	return new Promise((resolve, reject) => {
		if(!command || !arg || !opt) throw new Error(`One or more invalid arguments {${command}},{${arg}} {${opt}} {${fs}}`)
		axiosInstance.post(urls.backendCommand, {
			command,
			arg,
			opt,
			fs
		}).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	});
}

/**
 * Send a backend command and return the result.
 * @param arg		{array<string>}	 	remote name string eg "drive:"
 * @param opt		{$ObjMap}			list of arguments for the backend command
 * @returns {Promise<$ObjMap>}
 */
export const coreCommand = ( arg, opt) => {
	return new Promise((resolve, reject) => {
		if(!arg || !opt) throw new Error(`One or more invalid arguments ,{${arg}} {${opt}}`)
		axiosInstance.post(urls.coreCommand, {
			arg,
			opt,
		}).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	});
}


/**
 * getTransferredStats returns transferred job stats.
 * @returns {Promise<unknown>}
 */
 export const getTransferredStats = (group) => {
	let data = {};
	if (group) {
		data = {
			group
		};
	};
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.transferred, data).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}

	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.transferred).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})
}
