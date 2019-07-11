# thef2e2_week1_timing-to-do-list

vue cli 3、vue、pug

## branch 規範
- master : 正式版
- develop : 開發測試版
- feature-* : 由develop分支開發版，依功能最小單位做區分，由實作的功能命名，開發完成會合併到develop
- release-* : 由develop分支下一版本，由版本號命名，發布時會合併到develop跟master
- hotfixes-* : 由master分支，由正式版中發現的bug命名，修復後合併到master和release

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
