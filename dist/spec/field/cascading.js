"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.field = exports.Select = void 0;
var React = __importStar(require("react"));
var forms_1 = require("payload/components/forms");
var path_1 = require("../../kit/path");
/**
 * Creates a {@link React.FC} that renders a cascading {@link SelectInput}, using the
 * information provided in the given {@link CascadingOptions}.
 */
function Select(_a) {
    var ref = _a.ref, label = _a.label, selector = _a.selector;
    return function (_a) {
        var path = _a.path;
        var _b = React.useState([]), options = _b[0], setOptions = _b[1];
        var _c = (0, forms_1.useField)({ path: path }), value = _c.value, setValue = _c.setValue;
        var trait = (0, forms_1.useFormFields)(function (_a) {
            var fields = _a[0];
            return fields[(0, path_1.sibling)(path, ref)];
        });
        var v = React.useRef(trait === null || trait === void 0 ? void 0 : trait.value); // hold the current trait value
        React.useEffect(function () {
            var selected = selector(trait === null || trait === void 0 ? void 0 : trait.value);
            setOptions(selected);
            if (v.current === (trait === null || trait === void 0 ? void 0 : trait.value))
                return; // same trait values, no need to update
            setValue(selected.map(function (option) { return option.value; }), true);
            v.current = trait === null || trait === void 0 ? void 0 : trait.value; // hold the latest trait value
        }, [trait]);
        return (React.createElement(React.Fragment, null,
            React.createElement(forms_1.SelectInput, { path: path, name: path, options: options, value: value, hasMany: true, defaultValue: options.map(function (x) { return ({ value: x.value }); }), label: label, onChange: function (x) {
                    if (x instanceof Array) {
                        setValue(x.map(function (option) { return option.value; }));
                        return;
                    }
                    setValue(x.value);
                } })));
    };
}
exports.Select = Select;
/**
 * Creates a decent cascading {@link Select} field.
 */
function field(options, _a) {
    var _b = _a.name, name = _b === void 0 ? "traits" : _b;
    return {
        type: "json",
        name: name,
        admin: {
            components: {
                Field: Select(options),
            },
        },
    };
}
exports.field = field;
exports.default = { Select: Select, field: field };
//# sourceMappingURL=cascading.js.map