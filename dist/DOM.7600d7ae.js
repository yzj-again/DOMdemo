// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"DOM.js":[function(require,module,exports) {
window.dom = {};
dom.create = function (string) {
    var container = document.createElement('template');
    container.innerHTML = string.trim(); //trim去掉文本，firstChild拿不到空格文本了
    return container.content.firstChild;
};
//node后面插入节点node2
dom.after = function (node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
    //有bug，当node是最后一个节点时，它就没有nextsibling
    //但是下一个节点是空白也会继续进行
    //就算不换行也能插入
    //<div><div>1</div></div>nextSibling是空也能行
    //而且脚本引入也会出错
};
//node前面插入节点node2
dom.before = function (node, node2) {
    node.parentNode.insertBefore(node2, node);
};
//新增儿子节点append
dom.append = function (parent, node) {
    parent.appendChild(node);
};
//新增一个爸爸节点
dom.wrap = function (node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
};
//删
//删除自身
dom.remove = function (node) {
    node.parentNode.removeChild(node);
    return node;
};
//删除所有儿子
dom.empty = function (parent) {
    var childNodes = parent.childNodes; //解构赋值 const childNodes=node.childNodes

    var arr = [];
    var x = parent.firstChild;
    while (x) {
        arr.push(dom.remove(parent.firstChild));
        x = parent.firstChild;
    }
    //childNodes回车、空格也是儿子
    return arr;
};
//改
//改title
dom.attr = function (node, name, value) {
    if (arguments.length === 3) {
        node.setAttribute(name, value);
    } else if (arguments.length === 2) {
        return node.getAttribute(name);
    } //重载----------
};
//修改文本内容
dom.text = function (node, string) {
    if (arguments.length === 2) {
        if ('innerText' in node) {
            node.innerText = string; //单独修改会删掉内部的p标签-无法避免
        } else {
            node.textContent = string;
        } //适配写法------------
    } else if (arguments.length === 1) {
        if ('innerText' in node) {
            return node.innerText; //单独修改会删掉内部的p标签-无法避免
        } else {
            return node.textContent;
        } //适配写法------------
    }
};

//改html
dom.html = function (node, string) {
    if (arguments.length === 2) {
        node.innerHTML = string;
    } else if (arguments.length === 1) {
        return node.innerHTML;
    }
};
//改style
dom.style = function (node, name, value) {
    if (arguments.length === 3) {
        //dom.style(div,color,'green')
        node.style[name] = value;
    } else if (arguments.length === 2) {
        if (typeof name === 'string') {
            return node.style[name];
        } else if (name instanceof Object) {
            for (var arrayKey in name) {
                //key:border /color
                //node.style.border=xxx
                node.style[arrayKey] = name[arrayKey];
            }
        }
    }
};

//给元素添加class,class也是一个对象，给对象添加一个add()
dom.class = {
    add: function add(node, className) {
        node.classList.add(className);
    },
    remove: function remove(node, className) {
        node.classList.remove(className);
    },
    has: function has(node, className) {
        return node.classList.contains(className);
    }
};
//事件
dom.on = function (node, eventName, fn) {
    node.addEventListener(eventName, fn);
};

dom.off = function (node, eventName, fn) {
    node.removeEventListener(eventName, fn);
};
dom.find = function (selector, scope) {
    return (scope || document).querySelectorAll(selector);
    //如果有scope，则在scope里查找
    //如果没有，则在document里查找
};
dom.parent = function (node) {
    return node.parentNode;
};
dom.children = function (node) {
    return node.children;
};
dom.siblings = function (node) {
    return Array.from(node.parentNode.children).filter(function (n) {
        return n !== node;
    });
    //伪数组转数组，然后进行过滤，排除自身
};
dom.next = function (node) {
    //return node.nextSibling
    //直接用nextSibling会找到文本
    var x = node.nextSibling;
    while (x && x.nodeType === 3) {
        x = x.nextSibling; //如果下一个节点是空，则直接返回x
    }
    return x;
};
dom.previous = function (node) {
    //return node.previousSibling
    //直接用previousSibling会找到文本
    var x = node.previousSibling;
    while (x && x.nodeType === 3) {
        x = x.previousSibling; //如果下一个节点是空，则直接返回x
    }
    return x;
};
dom.each = function (nodeList, fn) {
    for (var i = 0; i < nodeList.length; i++) {
        fn.call(null, nodeList[i]);
    }
};
dom.index = function (node) {
    var list = this.children(this.parent(node));
    for (var i = 0; i < list.length; i++) {
        if (list[i] === node) {
            return i + 1;
        }
    }
};
},{}],"C:\\Users\\11052\\AppData\\Local\\Yarn\\Data\\global\\node_modules\\parcel\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '13232' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:\\Users\\11052\\AppData\\Local\\Yarn\\Data\\global\\node_modules\\parcel\\src\\builtins\\hmr-runtime.js","DOM.js"], null)
//# sourceMappingURL=/DOM.7600d7ae.map