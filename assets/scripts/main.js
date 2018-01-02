;(() => {
  'use strict';

  window.main = window.main || {};

  main.init = (...plugins) => {
    let resources = [];

    if (plugins.length) {
      resources = plugins;
    } else {
      for (let i in main) {
        resources.push(i);
      }
    }

    main.initTrigger(main, resources);
  };

  main.initTrigger = (object, resources) => {
    if (!resources) {
      resources = [];

      for (let i in object) {
        resources.push(i);
      }
    }

    for (let i in resources) {
      if (object[resources[i]].hasOwnProperty('settings') && object[resources[i]].settings.autoinit) {
        object[resources[i]].init();
      }
    }
  };

  main.init();
})();