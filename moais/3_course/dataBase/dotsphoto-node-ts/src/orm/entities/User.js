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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Ownership_1 = require("./Ownership.js");
const Album_1 = require("./Album.js");
const Subscription_1 = require("./Subscription.js");
exports.User = (() => {
    let _classDecorators = [(0, typeorm_1.Index)("idxn4swgcf30j6bmtb4l4cjryuym", ["nickname"], {}), (0, typeorm_1.Index)("uk_n4swgcf30j6bmtb4l4cjryuym", ["nickname"], { unique: true }), (0, typeorm_1.Index)("idx1cmuxr3stga2p0vxoi839qbp0", ["rootAlbumLink"], {}), (0, typeorm_1.Index)("idxjlc10xekr5jneqdeeygp8ai1q", ["subscriptionLink"], {}), (0, typeorm_1.Index)("user_pkey", ["userId"], { unique: true }), (0, typeorm_1.Entity)("user", { schema: "dotsphoto" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _fullName_decorators;
    let _fullName_initializers = [];
    let _nickname_decorators;
    let _nickname_initializers = [];
    let _rootAlbumLink_decorators;
    let _rootAlbumLink_initializers = [];
    let _subscriptionLink_decorators;
    let _subscriptionLink_initializers = [];
    let _ownership_decorators;
    let _ownership_initializers = [];
    let _rootAlbumLink2_decorators;
    let _rootAlbumLink2_initializers = [];
    let _subscriptionLink2_decorators;
    let _subscriptionLink2_initializers = [];
    var User = _classThis = class {
        constructor() {
            this.userId = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.email = __runInitializers(this, _email_initializers, void 0);
            this.fullName = __runInitializers(this, _fullName_initializers, void 0);
            this.nickname = __runInitializers(this, _nickname_initializers, void 0);
            this.rootAlbumLink = __runInitializers(this, _rootAlbumLink_initializers, void 0);
            this.subscriptionLink = __runInitializers(this, _subscriptionLink_initializers, void 0);
            this.ownership = __runInitializers(this, _ownership_initializers, void 0);
            this.rootAlbumLink2 = __runInitializers(this, _rootAlbumLink2_initializers, void 0);
            this.subscriptionLink2 = __runInitializers(this, _subscriptionLink2_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "User");
    (() => {
        _userId_decorators = [(0, typeorm_1.Column)("bigint", { primary: true, name: "user_id" })];
        _email_decorators = [(0, typeorm_1.Column)("character varying", { name: "email", nullable: true, length: 9999 })];
        _fullName_decorators = [(0, typeorm_1.Column)("character varying", {
                name: "full_name",
                nullable: true,
                length: 9999,
            })];
        _nickname_decorators = [(0, typeorm_1.Column)("character varying", { name: "nickname", unique: true, length: 9999 })];
        _rootAlbumLink_decorators = [(0, typeorm_1.Column)("bigint", { name: "root_album_link" })];
        _subscriptionLink_decorators = [(0, typeorm_1.Column)("bigint", { name: "subscription_link" })];
        _ownership_decorators = [(0, typeorm_1.OneToOne)(() => Ownership_1.Ownership, (ownership) => ownership.userLinkUser)];
        _rootAlbumLink2_decorators = [(0, typeorm_1.ManyToOne)(() => Album_1.Album, (album) => album.users), (0, typeorm_1.JoinColumn)([{ name: "root_album_link", referencedColumnName: "albumId" }])];
        _subscriptionLink2_decorators = [(0, typeorm_1.ManyToOne)(() => Subscription_1.Subscription, (subscription) => subscription.users), (0, typeorm_1.JoinColumn)([
                { name: "subscription_link", referencedColumnName: "subscriptionId" },
            ])];
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } } }, _userId_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } } }, _email_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: obj => "fullName" in obj, get: obj => obj.fullName, set: (obj, value) => { obj.fullName = value; } } }, _fullName_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _nickname_decorators, { kind: "field", name: "nickname", static: false, private: false, access: { has: obj => "nickname" in obj, get: obj => obj.nickname, set: (obj, value) => { obj.nickname = value; } } }, _nickname_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _rootAlbumLink_decorators, { kind: "field", name: "rootAlbumLink", static: false, private: false, access: { has: obj => "rootAlbumLink" in obj, get: obj => obj.rootAlbumLink, set: (obj, value) => { obj.rootAlbumLink = value; } } }, _rootAlbumLink_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _subscriptionLink_decorators, { kind: "field", name: "subscriptionLink", static: false, private: false, access: { has: obj => "subscriptionLink" in obj, get: obj => obj.subscriptionLink, set: (obj, value) => { obj.subscriptionLink = value; } } }, _subscriptionLink_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _ownership_decorators, { kind: "field", name: "ownership", static: false, private: false, access: { has: obj => "ownership" in obj, get: obj => obj.ownership, set: (obj, value) => { obj.ownership = value; } } }, _ownership_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _rootAlbumLink2_decorators, { kind: "field", name: "rootAlbumLink2", static: false, private: false, access: { has: obj => "rootAlbumLink2" in obj, get: obj => obj.rootAlbumLink2, set: (obj, value) => { obj.rootAlbumLink2 = value; } } }, _rootAlbumLink2_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _subscriptionLink2_decorators, { kind: "field", name: "subscriptionLink2", static: false, private: false, access: { has: obj => "subscriptionLink2" in obj, get: obj => obj.subscriptionLink2, set: (obj, value) => { obj.subscriptionLink2 = value; } } }, _subscriptionLink2_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
})();
