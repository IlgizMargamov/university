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
exports.Ownership = void 0;
const typeorm_1 = require("typeorm");
const Album_1 = require("./Album.js");
const User_1 = require("./User.js");
exports.Ownership = (() => {
    let _classDecorators = [(0, typeorm_1.Index)("ownership_pkey", ["ownedAlbumAlbumId", "userLinkUserId"], {
            unique: true,
        }), (0, typeorm_1.Index)("idx71jw4fyj5abch0e72v9dao7q", ["ownedAlbumAlbumId"], {}), (0, typeorm_1.Index)("uk_71jw4fyj5abch0e72v9dao7q", ["ownedAlbumAlbumId"], { unique: true }), (0, typeorm_1.Index)("uk_1fpjvhxf4x5j161fo26gajr46", ["userLinkUserId"], { unique: true }), (0, typeorm_1.Index)("idx1fpjvhxf4x5j161fo26gajr46", ["userLinkUserId"], {}), (0, typeorm_1.Entity)("ownership", { schema: "dotsphoto" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _ownedAlbumAlbumId_decorators;
    let _ownedAlbumAlbumId_initializers = [];
    let _userLinkUserId_decorators;
    let _userLinkUserId_initializers = [];
    let _ownershipLevel_decorators;
    let _ownershipLevel_initializers = [];
    let _ownedAlbumAlbum_decorators;
    let _ownedAlbumAlbum_initializers = [];
    let _userLinkUser_decorators;
    let _userLinkUser_initializers = [];
    var Ownership = _classThis = class {
        constructor() {
            this.ownedAlbumAlbumId = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _ownedAlbumAlbumId_initializers, void 0));
            this.userLinkUserId = __runInitializers(this, _userLinkUserId_initializers, void 0);
            this.ownershipLevel = __runInitializers(this, _ownershipLevel_initializers, void 0);
            this.ownedAlbumAlbum = __runInitializers(this, _ownedAlbumAlbum_initializers, void 0);
            this.userLinkUser = __runInitializers(this, _userLinkUser_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "Ownership");
    (() => {
        _ownedAlbumAlbumId_decorators = [(0, typeorm_1.Column)("bigint", { primary: true, name: "owned_album_album_id" })];
        _userLinkUserId_decorators = [(0, typeorm_1.Column)("bigint", { primary: true, name: "user_link_user_id" })];
        _ownershipLevel_decorators = [(0, typeorm_1.Column)("character varying", { name: "ownership_level", length: 255 })];
        _ownedAlbumAlbum_decorators = [(0, typeorm_1.OneToOne)(() => Album_1.Album, (album) => album.ownership), (0, typeorm_1.JoinColumn)([
                { name: "owned_album_album_id", referencedColumnName: "albumId" },
            ])];
        _userLinkUser_decorators = [(0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.ownership), (0, typeorm_1.JoinColumn)([{ name: "user_link_user_id", referencedColumnName: "userId" }])];
        __esDecorate(null, null, _ownedAlbumAlbumId_decorators, { kind: "field", name: "ownedAlbumAlbumId", static: false, private: false, access: { has: obj => "ownedAlbumAlbumId" in obj, get: obj => obj.ownedAlbumAlbumId, set: (obj, value) => { obj.ownedAlbumAlbumId = value; } } }, _ownedAlbumAlbumId_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _userLinkUserId_decorators, { kind: "field", name: "userLinkUserId", static: false, private: false, access: { has: obj => "userLinkUserId" in obj, get: obj => obj.userLinkUserId, set: (obj, value) => { obj.userLinkUserId = value; } } }, _userLinkUserId_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _ownershipLevel_decorators, { kind: "field", name: "ownershipLevel", static: false, private: false, access: { has: obj => "ownershipLevel" in obj, get: obj => obj.ownershipLevel, set: (obj, value) => { obj.ownershipLevel = value; } } }, _ownershipLevel_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _ownedAlbumAlbum_decorators, { kind: "field", name: "ownedAlbumAlbum", static: false, private: false, access: { has: obj => "ownedAlbumAlbum" in obj, get: obj => obj.ownedAlbumAlbum, set: (obj, value) => { obj.ownedAlbumAlbum = value; } } }, _ownedAlbumAlbum_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _userLinkUser_decorators, { kind: "field", name: "userLinkUser", static: false, private: false, access: { has: obj => "userLinkUser" in obj, get: obj => obj.userLinkUser, set: (obj, value) => { obj.userLinkUser = value; } } }, _userLinkUser_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        Ownership = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ownership = _classThis;
})();
