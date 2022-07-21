"use strict";

//下面这一段全部来自于hexo-theme-nexmoe的部分源码，感谢大佬，指路: https://github.com/theme-nexmoe/hexo-theme-nexmoe
var getRealPath = function getRealPath(pathname) {
  var desc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!pathname) {
    pathname = window.location.pathname;
  }

  var names = pathname.split("/");

  if (desc === false) {
    for (var i = names.length - 1; i >= 0; --i) {
      var name = names[i].trim();

      if (name.length > 0 && name !== "/" && name !== "index.html") {
        return name;
      }
    }
  } else {
    for (var _i = 0; _i < names.length; ++_i) {
      var _name = names[_i].trim();

      if (_name.length > 0 && _name !== "/" && _name !== "index.html") {
        return _name;
      }
    }
  }

  return "/";
};

var links = document.querySelectorAll(".nav-link");
var rootRealPath = getRealPath(window.location.pathname, true);
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var link = _step.value;
    var linkPath = link.getAttribute("href");

    if (linkPath && getRealPath(linkPath, true) === rootRealPath) {
      link.className = "active-link nav-link";
    }
  } // mobile-nav-link

} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var mlinks = document.querySelectorAll(".mobile-nav-link");
var mrootRealPath = getRealPath(window.location.pathname, true);
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = mlinks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var mlink = _step2.value;
    var mlinkPath = mlink.getAttribute("href");

    if (mlinkPath && getRealPath(mlinkPath, true) === mrootRealPath) {
      mlink.className = "moibile-active-link mobile-nav-link";
    }
  } //设置收起的menu点击的效果

} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
      _iterator2["return"]();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

var mmenu = document.getElementById("mobile-menu");
var mmain = document.getElementById("mobile-main");
var mclose = document.getElementById("mobile-close");

mmenu.onclick = function () {
  mmain.style.display = "block";
};

mclose.onclick = function () {
  mmain.style.display = "none";
}; ///////////////////////////////////////////////////////////////////////////////////
//设置sort的子目录隐藏显示效果


if (document.getElementById("sort")) {
  var sort = document.getElementById("sort");
  var sortdiv = document.getElementById("sort-div");

  sort.onmouseover = function () {
    sortdiv.style.display = "block";
  };

  sort.onmouseout = function () {
    sortdiv.onmouseover = function () {
      console.log("wuhu");
    };

    sortdiv.onmouseout = function () {
      sortdiv.style.display = "none";
    };
  };
} //图片懒加载


var imgs = document.querySelectorAll('img');
var imgdivs = document.querySelectorAll('.lazyload-img-span'); //用来判断bound.top<=clientHeight的函数，返回一个bool值

function isIn(el) {
  var bound = el.getBoundingClientRect();
  var clientHeight = window.innerHeight;
  return bound.top <= clientHeight;
} //检查图片是否在可视区内，如果在，则加载


function check() {
  var _loop = function _loop(p) {
    if (isIn(imgs[p])) {
      loadImg(imgs[p]);

      imgs[p].onload = function () {
        var y = Number(p);
        changeClass(y);
      };
    }
  };

  for (var p = 0; p < imgs.length; p++) {
    _loop(p);
  }
}

function changeClass(num) {
  var tempse = Number(num);
  imgdivs[tempse].className = "lazyload-img-span img-masks";
}

function loadImg(el) {
  if (!el.src) {
    var source = el.dataset.src;
    el.src = source;
  }
}

window.onload = window.onscroll = function () {
  //onscroll()在滚动条滚动的时候触发
  check();
};