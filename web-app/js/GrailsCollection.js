var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Backbone.GrailsCollection = (function() {
  __extends(GrailsCollection, Backbone.Collection);
  function GrailsCollection() {
    GrailsCollection.__super__.constructor.apply(this, arguments);
  }
  GrailsCollection.prototype.paramRoot = "data";
  GrailsCollection.prototype.methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read': 'GET'
  };
  GrailsCollection.prototype.getUrl = function(object) {
    if (!(object && object.url)) {
      return null;
    }
    if (_.isFunction(object.url)) {
      return object.url();
    } else {
      return object.url;
    }
  };
  GrailsCollection.prototype.parse = function(resp, xhr) {
    var data, field, m, _i, _j, _len, _len2, _ref;
    if (!resp.success) {
      alert(resp.message);
      return;
    }
    data = resp[this.paramRoot];
    if (_.isArray(this.model.dateFields) && _.isArray(data)) {
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        m = data[_i];
        _ref = this.model.dateFields;
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          field = _ref[_j];
          m[field] = new Date(m[field]);
        }
      }
    }
    return data;
  };
  GrailsCollection.prototype.sync = function(method, collection, options) {
    var data, params, type;
    type = this.methodMap[method];
    params = _.extend({
      type: type,
      contentType: 'application/json',
      dataType: 'json',
      processData: false
    }, options);
    if (!params.url) {
      params.url = this.getUrl(collection);
    }
    if (!params.data && collection && collection.length > 0 && (method === 'create' || method === 'update')) {
      data = {};
      data[collection.paramRoot] = collection.toJSON();
      params.data = JSON.stringify(data);
    }
    return $.ajax(params);
  };
  return GrailsCollection;
})();