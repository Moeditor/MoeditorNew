import packageInfo from '../../package.json';

export default {
  // Get a version text like 'version 0.3.0 (beta)'
  getVersionText () {
    return `version ${packageInfo.version} (${packageInfo.versionInfo})`;
  },

  getDescription () {
    return packageInfo.description;
  },

  getLink (key) {
    return packageInfo.links[key];
  }
};
