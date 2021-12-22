export default function translation(data, module_name, field) {
    let key = module_name + "_translation"
    if (data && data[key]) {
        return typeof data[key][field] !== "undefined" && data[key][field].replace(/[ ]+/g, "") != "" ? data[key][field] : data[field]
    }

    return data[field]
}

export function renderColumn(module_name, field_name) {
    return function(value, display, row) {
        return translation(row, module_name, field_name)
    }
}