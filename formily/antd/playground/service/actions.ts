export type OnGlobalStateChangeCallback = (
  state: Record<string, any>,
  prevState: Record<string, any>
) => void;

export type IGlobalStateChange = {
  callback: OnGlobalStateChangeCallback;
  fireImmediately?: boolean;
};

export type MicroAppStateActions = {
  onGlobalStateChange: (
    callback: OnGlobalStateChangeCallback,
    fireImmediately?: boolean
  ) => void;
  setGlobalState: (state: Record<string, any>) => boolean | void;
  offGlobalStateChange?: () => boolean;
};



class Actions {
  actions: MicroAppStateActions;
  constructor() {
    this.actions = {
      onGlobalStateChange: () => { },
      setGlobalState: () => { },
    };
  }
  /**
   * 覆盖默认actions（从子应用的 mount 方法中调用）
   * @param actions MicroAppStateActions
   */
  setActions(actions: MicroAppStateActions) {
    this.actions = actions;
  }

  /**
   * onGlobalStateChange 映射
   * @param callback: {OnGlobalStateChangeCallback}
   * @param fireImmediately: {boolean} 是否立即执行
   * @returns
   */
  // onGlobalStateChange(
  //   callback: OnGlobalStateChangeCallback,
  //   fireImmediately = false
  // ) {
  //   return this.actions.onGlobalStateChange(callback, fireImmediately);
  // }

  /**
   * setGlobalState 映射
   * @param state: {Record<string, any>}
   * @returns {boolean}
   */
  setGlobalState(state: Record<string, any>) {
    return this.actions.setGlobalState(state);
  }
}

const actions = new Actions();

export default actions;