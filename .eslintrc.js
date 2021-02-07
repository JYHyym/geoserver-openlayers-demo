/*
 * @LastEditors: yym
 * @Date: 2021-02-01 17:41:08
 * @LastEditTime: 2021-02-07 10:52:04
 * @Email: 15764302140@163.com
 * @Description:
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: [2, 'always']
  }
};
