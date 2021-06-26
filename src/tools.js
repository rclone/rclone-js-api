/**
 * Checks whether the remoteName is local or not. Returns true if it is a remote local path, false otherwise.
 * Behaviour: if the name starts with "/" it is a local name.
 * @param remoteName {string} Name of the remote to check for.
 * @returns {boolean}
 */
export function isLocalRemoteName(remoteName) {
	return (remoteName && remoteName !== "" && remoteName[0] === "/");
}

/**
 * addColonAtLast is a helper function to add semicolon to the last.
 * Behaviour: if the passed in string does not have a semicolon at last, then insert it.
 * If there is a semicolon in the middle, skip insertion.
 * @param name
 * @returns {string}
 */
export function addColonAtLast(name) {
	if (name.indexOf(':') === -1) {
		if (name[name.length - 1] !== ":") {
			name = name + ":"
		}
	}

	return name;
}
