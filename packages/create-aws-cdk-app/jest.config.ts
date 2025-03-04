/* eslint-disable */
export default {
  displayName: 'create-aws-cdk-app',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverageFrom: ['bin/**/*.ts', '!**/*.d.ts'],
  coverageDirectory: '../../coverage/packages/create-aws-cdk-app',
}
