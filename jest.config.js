export default {
    preset: 'ts-jest',
    testEnvironment: "node",
    testMatch: ["*.spec.js", "**/test/**/*.js?(x)"],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
        '//node_modules',
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$",
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$",
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$",
        '/node_modules/(?!d3-(array|format))',
        "node_modules/(?!variables/.*)"
    ],
}