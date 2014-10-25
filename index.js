var path = require('path');

var requireNamespaced = function requireN(ns, request){
  if(!requireNamespaced.namespaces[ns]) {
    var err = new Error('Cannot find module "' + request + '" in namespace "' + ns + '"');
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  }

  try{
    return require(path.join(requireNamespaced.namespaces[ns], request));
  } catch(err) {
    if(err.code === 'MODULE_NOT_FOUND'){
      err.message = 'Cannot find module "' + request + '" in namespace "' + ns + '"';
    }

    throw err;
  }
};

requireNamespaced.namespaces = {};

requireNamespaced.add = function(ns, path){
  requireNamespaced.namespaces[ns] = path;
};

module.exports = requireNamespaced;
