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
exports.PhotoMetadata = void 0;
const typeorm_1 = require("typeorm");
const Photo_1 = require("./Photo.js");
exports.PhotoMetadata = (() => {
    let _classDecorators = [(0, typeorm_1.Index)("photo_metadata_pkey", ["metadataId"], { unique: true }), (0, typeorm_1.Entity)("photo_metadata", { schema: "dotsphoto" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _metadataId_decorators;
    let _metadataId_initializers = [];
    let _cameraMegapixels_decorators;
    let _cameraMegapixels_initializers = [];
    let _geolocation_decorators;
    let _geolocation_initializers = [];
    let _heightInPixels_decorators;
    let _heightInPixels_initializers = [];
    let _kilobyteSize_decorators;
    let _kilobyteSize_initializers = [];
    let _shotAt_decorators;
    let _shotAt_initializers = [];
    let _widthInPixels_decorators;
    let _widthInPixels_initializers = [];
    let _photos_decorators;
    let _photos_initializers = [];
    var PhotoMetadata = _classThis = class {
        constructor() {
            this.metadataId = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _metadataId_initializers, void 0));
            this.cameraMegapixels = __runInitializers(this, _cameraMegapixels_initializers, void 0);
            this.geolocation = __runInitializers(this, _geolocation_initializers, void 0);
            this.heightInPixels = __runInitializers(this, _heightInPixels_initializers, void 0);
            this.kilobyteSize = __runInitializers(this, _kilobyteSize_initializers, void 0);
            this.shotAt = __runInitializers(this, _shotAt_initializers, void 0);
            this.widthInPixels = __runInitializers(this, _widthInPixels_initializers, void 0);
            this.photos = __runInitializers(this, _photos_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "PhotoMetadata");
    (() => {
        _metadataId_decorators = [(0, typeorm_1.Column)("bigint", { primary: true, name: "metadata_id" })];
        _cameraMegapixels_decorators = [(0, typeorm_1.Column)("integer", { name: "camera_megapixels", nullable: true })];
        _geolocation_decorators = [(0, typeorm_1.Column)("character varying", {
                name: "geolocation",
                nullable: true,
                length: 9999,
            })];
        _heightInPixels_decorators = [(0, typeorm_1.Column)("integer", { name: "height_in_pixels", nullable: true })];
        _kilobyteSize_decorators = [(0, typeorm_1.Column)("integer", { name: "kilobyte_size", nullable: true })];
        _shotAt_decorators = [(0, typeorm_1.Column)("date", { name: "shot_at", nullable: true })];
        _widthInPixels_decorators = [(0, typeorm_1.Column)("integer", { name: "width_in_pixels", nullable: true })];
        _photos_decorators = [(0, typeorm_1.OneToMany)(() => Photo_1.Photo, (photo) => photo.metadataLink2)];
        __esDecorate(null, null, _metadataId_decorators, { kind: "field", name: "metadataId", static: false, private: false, access: { has: obj => "metadataId" in obj, get: obj => obj.metadataId, set: (obj, value) => { obj.metadataId = value; } } }, _metadataId_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _cameraMegapixels_decorators, { kind: "field", name: "cameraMegapixels", static: false, private: false, access: { has: obj => "cameraMegapixels" in obj, get: obj => obj.cameraMegapixels, set: (obj, value) => { obj.cameraMegapixels = value; } } }, _cameraMegapixels_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _geolocation_decorators, { kind: "field", name: "geolocation", static: false, private: false, access: { has: obj => "geolocation" in obj, get: obj => obj.geolocation, set: (obj, value) => { obj.geolocation = value; } } }, _geolocation_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _heightInPixels_decorators, { kind: "field", name: "heightInPixels", static: false, private: false, access: { has: obj => "heightInPixels" in obj, get: obj => obj.heightInPixels, set: (obj, value) => { obj.heightInPixels = value; } } }, _heightInPixels_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _kilobyteSize_decorators, { kind: "field", name: "kilobyteSize", static: false, private: false, access: { has: obj => "kilobyteSize" in obj, get: obj => obj.kilobyteSize, set: (obj, value) => { obj.kilobyteSize = value; } } }, _kilobyteSize_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _shotAt_decorators, { kind: "field", name: "shotAt", static: false, private: false, access: { has: obj => "shotAt" in obj, get: obj => obj.shotAt, set: (obj, value) => { obj.shotAt = value; } } }, _shotAt_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _widthInPixels_decorators, { kind: "field", name: "widthInPixels", static: false, private: false, access: { has: obj => "widthInPixels" in obj, get: obj => obj.widthInPixels, set: (obj, value) => { obj.widthInPixels = value; } } }, _widthInPixels_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _photos_decorators, { kind: "field", name: "photos", static: false, private: false, access: { has: obj => "photos" in obj, get: obj => obj.photos, set: (obj, value) => { obj.photos = value; } } }, _photos_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        PhotoMetadata = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PhotoMetadata = _classThis;
})();
