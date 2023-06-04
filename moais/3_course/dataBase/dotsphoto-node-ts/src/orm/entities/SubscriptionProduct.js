"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionProduct = void 0;
const typeorm_1 = require("typeorm");
const Subscription_1 = require("./Subscription.js");
exports.SubscriptionProduct = (() => {
    let _classDecorators = [(0, typeorm_1.Index)("subscription_product_pkey", ["productId"], { unique: true }), (0, typeorm_1.Entity)("subscription_product", { schema: "dotsphoto" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _productId_decorators;
    let _productId_initializers = [];
    let _availableSpaceGb_decorators;
    let _availableSpaceGb_initializers = [];
    let _periodMonths_decorators;
    let _periodMonths_initializers = [];
    let _price_decorators;
    let _price_initializers = [];
    let _productName_decorators;
    let _productName_initializers = [];
    let _showAds_decorators;
    let _showAds_initializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _subscriptions_decorators;
    let _subscriptions_initializers = [];
    var SubscriptionProduct = _classThis = class {
        constructor() {
            this.productId = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _productId_initializers, void 0));
            this.availableSpaceGb = __runInitializers(this, _availableSpaceGb_initializers, void 0);
            this.periodMonths = __runInitializers(this, _periodMonths_initializers, void 0);
            this.price = __runInitializers(this, _price_initializers, void 0);
            this.productName = __runInitializers(this, _productName_initializers, void 0);
            this.showAds = __runInitializers(this, _showAds_initializers, void 0);
            this.status = __runInitializers(this, _status_initializers, void 0);
            this.subscriptions = __runInitializers(this, _subscriptions_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "SubscriptionProduct");
    (() => {
        _productId_decorators = [(0, typeorm_1.Column)("bigint", { primary: true, name: "product_id" })];
        _availableSpaceGb_decorators = [(0, typeorm_1.Column)("integer", { name: "available_space_gb" })];
        _periodMonths_decorators = [(0, typeorm_1.Column)("integer", { name: "period_months" })];
        _price_decorators = [(0, typeorm_1.Column)("integer", { name: "price" })];
        _productName_decorators = [(0, typeorm_1.Column)("character varying", { name: "product_name", length: 9999 })];
        _showAds_decorators = [(0, typeorm_1.Column)("boolean", { name: "show_ads" })];
        _status_decorators = [(0, typeorm_1.Column)("character varying", { name: "status", length: 255 })];
        _subscriptions_decorators = [(0, typeorm_1.OneToMany)(() => Subscription_1.Subscription, (subscription) => subscription.productLink2)];
        __esDecorate(null, null, _productId_decorators, { kind: "field", name: "productId", static: false, private: false, access: { has: obj => "productId" in obj, get: obj => obj.productId, set: (obj, value) => { obj.productId = value; } } }, _productId_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _availableSpaceGb_decorators, { kind: "field", name: "availableSpaceGb", static: false, private: false, access: { has: obj => "availableSpaceGb" in obj, get: obj => obj.availableSpaceGb, set: (obj, value) => { obj.availableSpaceGb = value; } } }, _availableSpaceGb_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _periodMonths_decorators, { kind: "field", name: "periodMonths", static: false, private: false, access: { has: obj => "periodMonths" in obj, get: obj => obj.periodMonths, set: (obj, value) => { obj.periodMonths = value; } } }, _periodMonths_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: obj => "price" in obj, get: obj => obj.price, set: (obj, value) => { obj.price = value; } } }, _price_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _productName_decorators, { kind: "field", name: "productName", static: false, private: false, access: { has: obj => "productName" in obj, get: obj => obj.productName, set: (obj, value) => { obj.productName = value; } } }, _productName_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _showAds_decorators, { kind: "field", name: "showAds", static: false, private: false, access: { has: obj => "showAds" in obj, get: obj => obj.showAds, set: (obj, value) => { obj.showAds = value; } } }, _showAds_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } } }, _status_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _subscriptions_decorators, { kind: "field", name: "subscriptions", static: false, private: false, access: { has: obj => "subscriptions" in obj, get: obj => obj.subscriptions, set: (obj, value) => { obj.subscriptions = value; } } }, _subscriptions_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        SubscriptionProduct = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SubscriptionProduct = _classThis;
})();
