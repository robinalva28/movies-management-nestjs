import { ScreenMode } from './screen-mode';

export class UserConfiguration {
  private readonly _screenMode: ScreenMode;

  private constructor(screenMode: ScreenMode) {
    this._screenMode = screenMode;
  }

  public static createDefault(): UserConfiguration {
    return new UserConfiguration(ScreenMode.LIGHT);
  }

  get screenMode(): ScreenMode {
    return this._screenMode;
  }

  public changeScreenModeToLight(): UserConfiguration {
    return new UserConfiguration(ScreenMode.LIGHT);
  }

  public changeScreenModeToDark(): UserConfiguration {
    return new UserConfiguration(ScreenMode.DARK);
  }

  public changeScreenModeToAuto(): UserConfiguration {
    return new UserConfiguration(ScreenMode.AUTO);
  }
}
