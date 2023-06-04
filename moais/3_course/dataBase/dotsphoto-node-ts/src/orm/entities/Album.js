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
exports.Album = void 0;
const typeorm_1 = require("typeorm");
const Ownership_1 = require("./Ownership.js");
const Photo_1 = require("./Photo.js");
const User_1 = require("./User.js");
exports.Album = (() => {
    let _classDecorators = [(0, typeorm_1.Index)("album_pkey", ["albumId"], { unique: true }), (0, typeorm_1.Entity)("album", { schema: "dotsphoto" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _albumId_decorators;
    let _albumId_initializers = [];
    let _albumName_decorators;
    let _albumName_initializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _kilobyteSize_decorators;
    let _kilobyteSize_initializers = [];
    let _lastUpdatedAt_decorators;
    let _lastUpdatedAt_initializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _ownership_decorators;
    let _ownership_initializers = [];
    let _photos_decorators;
    let _photos_initializers = [];
    let _users_decorators;
    let _users_initializers = [];
    var Album = _classThis = class {
        constructor() {
            this.albumId = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _albumId_initializers, void 0));
            this.albumName = __runInitializers(this, _albumName_initializers, void 0);
            this.createdAt = __runInitializers(this, _createdAt_initializers, void 0);
            this.kilobyteSize = __runInitializers(this, _kilobyteSize_initializers, void 0);
            this.lastUpdatedAt = __runInitializers(this, _lastUpdatedAt_initializers, void 0);
            this.status = __runInitializers(this, _status_initializers, void 0);
            this.ownership = __runInitializers(this, _ownership_initializers, void 0);
            this.photos = __runInitializers(this, _photos_initializers, void 0);
            this.users = __runInitializers(this, _users_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "Album");
    (() => {
        _albumId_decorators = [(0, typeorm_1.Column)("bigint", { primary: true, name: "album_id" })];
        _albumName_decorators = [(0, typeorm_1.Column)("character varying", { name: "album_name", length: 9999 })];
        _createdAt_decorators = [(0, typeorm_1.Column)("date", { name: "created_at" })];
        _kilobyteSize_decorators = [(0, typeorm_1.Column)("integer", { name: "kilobyte_size" })];
        _lastUpdatedAt_decorators = [(0, typeorm_1.Column)("date", { name: "last_updated_at", nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)("character varying", { name: "status", length: 255 })];
        _ownership_decorators = [(0, typeorm_1.OneToOne)(() => Ownership_1.Ownership, (ownership) => ownership.ownedAlbumAlbum)];
        _photos_decorators = [(0, typeorm_1.OneToMany)(() => Photo_1.Photo, (photo) => photo.albumLink2)];
        _users_decorators = [(0, typeorm_1.OneToMany)(() => User_1.User, (user) => user.rootAlbumLink2)];
        __esDecorate(null, null, _albumId_decorators, { kind: "field", name: "albumId", static: false, private: false, access: { has: obj => "albumId" in obj, get: obj => obj.albumId, set: (obj, value) => { obj.albumId = value; } } }, _albumId_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _albumName_decorators, { kind: "field", name: "albumName", static: false, private: false, access: { has: obj => "albumName" in obj, get: obj => obj.albumName, set: (obj, value) => { obj.albumName = value; } } }, _albumName_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } } }, _createdAt_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _kilobyteSize_decorators, { kind: "field", name: "kilobyteSize", static: false, private: false, access: { has: obj => "kilobyteSize" in obj, get: obj => obj.kilobyteSize, set: (obj, value) => { obj.kilobyteSize = value; } } }, _kilobyteSize_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _lastUpdatedAt_decorators, { kind: "field", name: "lastUpdatedAt", static: false, private: false, access: { has: obj => "lastUpdatedAt" in obj, get: obj => obj.lastUpdatedAt, set: (obj, value) => { obj.lastUpdatedAt = value; } } }, _lastUpdatedAt_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } } }, _status_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _ownership_decorators, { kind: "field", name: "ownership", static: false, private: false, access: { has: obj => "ownership" in obj, get: obj => obj.ownership, set: (obj, value) => { obj.ownership = value; } } }, _ownership_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _photos_decorators, { kind: "field", name: "photos", static: false, private: false, access: { has: obj => "photos" in obj, get: obj => obj.photos, set: (obj, value) => { obj.photos = value; } } }, _photos_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _users_decorators, { kind: "field", name: "users", static: false, private: false, access: { has: obj => "users" in obj, get: obj => obj.users, set: (obj, value) => { obj.users = value; } } }, _users_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        Album = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Album = _classThis;
})();
