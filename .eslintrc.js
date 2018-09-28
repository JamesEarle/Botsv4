module.exports = {
    "extends": "standard",
    "rules": {
        "semi": [2, "always"],
        // "indent": [2, 4],
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "no-return-await": 0,
        "no-throw-literal": 0,
        "space-before-function-paren": [0, {
            "named": "never",
            "anonymous": "always",
            "asyncArrow": "always"
        }],
        "template-curly-spacing": [2, "always"]
    }
};
