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
exports.Photo = void 0;
const typeorm_1 = require("typeorm");
const Album_1 = require("./Album.js");
const PhotoMetadata_1 = require("./PhotoMetadata.js");
exports.Photo = (() => {
    let _classDecorators = [(0, typeorm_1.Index)("idxflyvsagn3mwgt9iktvg3kdsvu", ["albumLink"], {}), (0, typeorm_1.Index)("idx62pomox0c940g6mi31pwgq10u", ["metadataLink"], {}), (0, typeorm_1.Index)("photo_pkey", ["photoId"], { unique: true }), (0, typeorm_1.Entity)("photo", { schema: "dotsphoto" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _photoId_decorators;
    let _photoId_initializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _filename_decorators;
    let _filename_initializers = [];
    let _lastUpdatedAt_decorators;
    let _lastUpdatedAt_initializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _albumLink_decorators;
    let _albumLink_initializers = [];
    let _metadataLink_decorators;
    let _metadataLink_initializers = [];
    let _albumLink2_decorators;
    let _albumLink2_initializers = [];
    let _metadataLink2_decorators;
    let _metadataLink2_initializers = [];
    var Photo = _classThis = class {
        constructor() {
            this.photoId = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _photoId_initializers, void 0));
            this.content = __runInitializers(this, _content_initializers, void 0);
            this.createdAt = __runInitializers(this, _createdAt_initializers, void 0);
            this.filename = __runInitializers(this, _filename_initializers, void 0);
            this.lastUpdatedAt = __runInitializers(this, _lastUpdatedAt_initializers, void 0);
            this.status = __runInitializers(this, _status_initializers, void 0);
            this.albumLink = __runInitializers(this, _albumLink_initializers, void 0);
            this.metadataLink = __runInitializers(this, _metadataLink_initializers, void 0);
            this.albumLink2 = __runInitializers(this, _albumLink2_initializers, void 0);
            this.metadataLink2 = __runInitializers(this, _metadataLink2_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "Photo");
    (() => {
        _photoId_decorators = [(0, typeorm_1.Column)("bigint", { primary: true, name: "photo_id" })];
        _content_decorators = [(0, typeorm_1.Column)("bytea", { name: "content" })];
        _createdAt_decorators = [(0, typeorm_1.Column)("date", { name: "created_at" })];
        _filename_decorators = [(0, typeorm_1.Column)("character varying", { name: "filename", length: 9999 })];
        _lastUpdatedAt_decorators = [(0, typeorm_1.Column)("date", { name: "last_updated_at", nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)("character varying", { name: "status", length: 255 })];
        _albumLink_decorators = [(0, typeorm_1.Column)("bigint", { name: "album_link" })];
        _metadataLink_decorators = [(0, typeorm_1.Column)("bigint", { name: "metadata_link" })];
        _albumLink2_decorators = [(0, typeorm_1.ManyToOne)(() => Album_1.Album, (album) => album.photos), (0, typeorm_1.JoinColumn)([{ name: "album_link", referencedColumnName: "albumId" }])];
        _metadataLink2_decorators = [(0, typeorm_1.ManyToOne)(() => PhotoMetadata_1.PhotoMetadata, (photoMetadata) => photoMetadata.photos), (0, typeorm_1.JoinColumn)([{ name: "metadata_link", referencedColumnName: "metadataId" }])];
        __esDecorate(null, null, _photoId_decorators, { kind: "field", name: "photoId", static: false, private: false, access: { has: obj => "photoId" in obj, get: obj => obj.photoId, set: (obj, value) => { obj.photoId = value; } } }, _photoId_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } } }, _content_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } } }, _createdAt_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _filename_decorators, { kind: "field", name: "filename", static: false, private: false, access: { has: obj => "filename" in obj, get: obj => obj.filename, set: (obj, value) => { obj.filename = value; } } }, _filename_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _lastUpdatedAt_decorators, { kind: "field", name: "lastUpdatedAt", static: false, private: false, access: { has: obj => "lastUpdatedAt" in obj, get: obj => obj.lastUpdatedAt, set: (obj, value) => { obj.lastUpdatedAt = value; } } }, _lastUpdatedAt_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } } }, _status_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _albumLink_decorators, { kind: "field", name: "albumLink", static: false, private: false, access: { has: obj => "albumLink" in obj, get: obj => obj.albumLink, set: (obj, value) => { obj.albumLink = value; } } }, _albumLink_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _metadataLink_decorators, { kind: "field", name: "metadataLink", static: false, private: false, access: { has: obj => "metadataLink" in obj, get: obj => obj.metadataLink, set: (obj, value) => { obj.metadataLink = value; } } }, _metadataLink_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _albumLink2_decorators, { kind: "field", name: "albumLink2", static: false, private: false, access: { has: obj => "albumLink2" in obj, get: obj => obj.albumLink2, set: (obj, value) => { obj.albumLink2 = value; } } }, _albumLink2_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _metadataLink2_decorators, { kind: "field", name: "metadataLink2", static: false, private: false, access: { has: obj => "metadataLink2" in obj, get: obj => obj.metadataLink2, set: (obj, value) => { obj.metadataLink2 = value; } } }, _metadataLink2_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        Photo = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Photo = _classThis;
})();
