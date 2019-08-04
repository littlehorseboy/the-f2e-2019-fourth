module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/config/tests/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/config/tests/__mocks__/styleMock.js',
  },
};
