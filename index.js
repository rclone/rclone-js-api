import {axiosInstance} from "./axiosInstance";
import urls from "./endpoint";

/**
 * getStats returns the current rclone stats.
 * @returns {Promise<unknown>}
 */
export function getStats () {
	console.log("HI");
	return new Promise((resolve, reject) => {
		axiosInstance.post(urls.stats).then(res => {
			resolve(res.data);
		}, error => {
			reject(error);
		})
	})

}
