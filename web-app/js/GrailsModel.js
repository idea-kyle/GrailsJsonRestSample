var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Backbone.GrailsModel = (function() {
  var wrapError;
  __extends(GrailsModel, Backbone.Model);
  function GrailsModel() {
    GrailsModel.__super__.constructor.apply(this, arguments);
  }
  GrailsModel.prototype.paramRoot = "data";
  GrailsModel.dontSaveFields = ["lastUpdated", "dateCreated"];
  GrailsModel.prototype.methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read': 'GET'
  };
  GrailsModel.prototype.clear = function() {
    this.destroy();
    return this.view.remove();
  };
  GrailsModel.prototype.getUrl = function(object) {
    if (!(object && object.url)) {
      return null;
    }
    if (_.isFunction(object.url)) {
      return object.url();
    } else {
      return object.url;
    }
  };
  GrailsModel.prototype.parse = function(resp, xhr) {
    var data, field, _i, _len, _ref;
    if (!resp.success) {
      alert(resp.message);
      return;
    }
    data = resp[this.paramRoot];
    if (_.isArray(this.dateFields)) {
      _ref = this.dateFields;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        field = _ref[_i];
        data[field] = new Date(data[field]);
      }
    }
    return data;
  };
  GrailsModel.prototype.toJSON = function(forWire) {
    var asJson, field, _i, _len, _ref;
    asJson = _.clone(this.attributes);
    if (!forWire) {
      return asJson;
    }
    if (_.isArray(GrailsModel.dontSaveFields)) {
      _ref = GrailsModel.dontSaveFields;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        field = _ref[_i];
        delete asJson[field];
      }
    }
    if (_.isArray(this.dateFields)) {
        _ref = this.dateFields;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          field = _ref[_i];
          asJson[field] = asJson[field].toJSON();
          // strip off milliseconds if exists for consistent parsing on server
          if( asJson[field].indexOf(".") != -1 ){
              asJson[field] = asJson[field].split('.')[0] + 'Z';
          }
        }
      }
    return asJson;
  };
  GrailsModel.prototype.sync = function(method, model, options) {
    var data, params, type;
    type = this.methodMap[method];
    params = _.extend({
      type: type,
      contentType: 'application/json',
      dataType: 'json',
      processData: false
    }, options);
    if (!params.url) {
      params.url = this.getUrl(model);
    }
    if (!params.data && model && (method === 'create' || method === 'update')) {
      data = {};
      data[model.paramRoot] = model.toJSON(true);
      params.data = JSON.stringify(data);
    }
    params.error = wrapError(options.error, model, options);
    return $.ajax(params);
  };
  wrapError = function(onError, model, options) {
    return function(resp) {
      alert(JSON.parse(resp.responseText).message);
      if (onError) {
        return onError(model, resp, options);
      } else {
        return model.trigger('error', model, resp, options);
      }
    };
  };
  return GrailsModel;
})();