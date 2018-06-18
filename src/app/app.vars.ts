export class Config {
  static GIT_USER = 'lbassin';
  static GIT_REPO = 'okty-config';
  static GIT_CONTAINERS_PATH = 'containers';
  static GIT_TEMPLATES_PATH = 'templates';
  static GIT_BRANCHE = '?ref=master';
  static GIT_URL = 'https://api.github.com/repos/' + Config.GIT_USER + '/' + Config.GIT_REPO + '/contents/';

  static getUrl(type: string, file: string): string {
    if (file) {
      file = '/' + file;
    }

    return Config.GIT_URL + type + file + Config.GIT_BRANCHE;
  }
}
