/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface TransformDataOptions {
    excludeKeys?: string[];
    keyMappings?: { [key: string]: string };
    valueMappings?: { [key: string]: (value: any) => any };
}

export const transformData = (data: { [key: string]: any }, options: TransformDataOptions = {}): string[] => {
    const {
        excludeKeys = [],
        keyMappings = {},
        valueMappings = {},
    } = options;

    return Object.entries(data).reduce((acc: string[], [key, value]) => {
        if (excludeKeys.includes(key)) return acc;

        // Transform the key to Sentence Case and replace underscores with spaces
        let displayKey = key.replace(/_/g, ' ').replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });

        // Check for custom key mapping
        if (keyMappings[key]) {
            displayKey = keyMappings[key];
        }

        // Check for custom value mapping
        if (valueMappings[key]) {
            value = valueMappings[key](value);
        }

        acc.push(`${displayKey}: ${value}`);
        return acc;
    }, []);
};



// export const options: Options = {
//     excludeKeys: ["id", "trans_pin", "default_pin"],
//     keyMappings: {
//         "business_id": "Business Identifier",
//         "user_id": "User Identifier",
//         "pos_type": "POS Type"
//     },
//     valueMappings: {
//         "balance": (value: string) => `$${parseFloat(value).toFixed(2)}`,
//         "status": (value: string) => value.charAt(0).toUpperCase() + value.slice(1)
//     }
// };


