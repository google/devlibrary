// See:
// https://github.com/championswimmer/vuex-module-decorators#accessing-modules-with-nuxtjs

import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import UIModule from '@/store/ui';

let uiModule: UIModule

function initializeStores(store: Store<any>): void {
  uiModule = getModule(UIModule, store)
}

export { 
  initializeStores, 
  uiModule 
}
