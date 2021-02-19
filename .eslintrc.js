/*
 * @LastEditors: yym
 * @Date: 2021-02-01 17:41:08
 * @LastEditTime: 2021-02-19 10:39:11
 * @Email: 15764302140@163.com
 * @Description:
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    // "xxxxx": true  //xxxx -> 报错的变量
    axios: true,
    $cdn: true,
    ol: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
    semi: [2, 'always']
  }
};
