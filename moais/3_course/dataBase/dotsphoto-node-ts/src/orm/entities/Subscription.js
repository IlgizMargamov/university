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
exports.Subscription = void 0;
const typeorm_1 = require("typeorm");
const SubscriptionProduct_1 = require("./SubscriptionProduct.js");
const User_1 = require("./User.js");
exports.Subscription = (() => {
    let _classDecorators = [(0, typeorm_1.Index)("idxew1a7rq5ge07o55y7otpxwcth", ["productLink"], {}), (0, typeorm_1.Index)("subscription_pkey", ["subscriptionId"], { unique: true }), (0, typeorm_1.Entity)("subscription", { schema: "dotsphoto" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _subscriptionId_decorators;
    let _subscriptionId_initializers = [];
    let _dateFrom_decorators;
    let _dateFrom_initializers = [];
    let _dateTo_decorators;
    let _dateTo_initializers = [];
    let _productLink_decorators;
    let _productLink_initializers = [];
    let _productLink2_decorators;
    let _productLink2_initializers = [];
    let _users_decorators;
    let _users_initializers = [];
    var Subscription = _classThis = class {
        constructor() {
            this.subscriptionId = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _subscriptionId_initializers, void 0));
            this.dateFrom = __runInitializers(this, _dateFrom_initializers, void 0);
            this.dateTo = __runInitializers(this, _dateTo_initializers, void 0);
            this.productLink = __runInitializers(this, _productLink_initializers, void 0);
            this.productLink2 = __runInitializers(this, _productLink2_initializers, void 0);
            this.users = __runInitializers(this, _users_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "Subscription");
    (() => {
        _subscriptionId_decorators = [(0, typeorm_1.Column)("bigint", { primary: true, name: "subscription_id" })];
        _dateFrom_decorators = [(0, typeorm_1.Column)("date", { name: "date_from" })];
        _dateTo_decorators = [(0, typeorm_1.Column)("date", { name: "date_to" })];
        _productLink_decorators = [(0, typeorm_1.Column)("bigint", { name: "product_link" })];
        _productLink2_decorators = [(0, typeorm_1.ManyToOne)(() => SubscriptionProduct_1.SubscriptionProduct, (subscriptionProduct) => subscriptionProduct.subscriptions), (0, typeorm_1.JoinColumn)([{ name: "product_link", referencedColumnName: "productId" }])];
        _users_decorators = [(0, typeorm_1.OneToMany)(() => User_1.User, (user) => user.subscriptionLink2)];
        __esDecorate(null, null, _subscriptionId_decorators, { kind: "field", name: "subscriptionId", static: false, private: false, access: { has: obj => "subscriptionId" in obj, get: obj => obj.subscriptionId, set: (obj, value) => { obj.subscriptionId = value; } } }, _subscriptionId_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _dateFrom_decorators, { kind: "field", name: "dateFrom", static: false, private: false, access: { has: obj => "dateFrom" in obj, get: obj => obj.dateFrom, set: (obj, value) => { obj.dateFrom = value; } } }, _dateFrom_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _dateTo_decorators, { kind: "field", name: "dateTo", static: false, private: false, access: { has: obj => "dateTo" in obj, get: obj => obj.dateTo, set: (obj, value) => { obj.dateTo = value; } } }, _dateTo_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _productLink_decorators, { kind: "field", name: "productLink", static: false, private: false, access: { has: obj => "productLink" in obj, get: obj => obj.productLink, set: (obj, value) => { obj.productLink = value; } } }, _productLink_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _productLink2_decorators, { kind: "field", name: "productLink2", static: false, private: false, access: { has: obj => "productLink2" in obj, get: obj => obj.productLink2, set: (obj, value) => { obj.productLink2 = value; } } }, _productLink2_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _users_decorators, { kind: "field", name: "users", static: false, private: false, access: { has: obj => "users" in obj, get: obj => obj.users, set: (obj, value) => { obj.users = value; } } }, _users_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        Subscription = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Subscription = _classThis;
})();
