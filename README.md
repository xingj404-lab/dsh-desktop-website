# DeepSeek Harness 桌面版 · 官网

[dsh-desktop](https://github.com/xingj404-lab/dsh-desktop) 的官网静态站点，
让用户直接访问本网站即可下载桌面应用，无需跳转到 GitHub。

- 自动检测访客系统（macOS / Windows），推荐对应的安装包
- 从 GitHub Releases API 实时拉取最新版本与真实下载地址、文件大小
- API 不可用时自动回退到内置的兜底下载地址，保证按钮始终可用
- **中英双语**：右上角一键切换，自动跟随浏览器语言（可被 `?lang=zh|en` 覆盖）
- 零依赖、零构建：纯 HTML + CSS + 原生 JS，可直接部署到任意静态托管

## 本地预览

直接打开 `index.html` 即可；或起一个静态服务器：

```sh
python3 -m http.server 8080
# 然后访问 http://localhost:8080
```

## 部署到 GitHub Pages

本仓库已内置 GitHub Actions 工作流（`.github/workflows/pages.yml`），
每次推送到 `main` 会自动构建并部署到 Pages。只需启用一次：

1. 仓库 **Settings → Pages**
2. **Build and deployment → Source** 选择 **GitHub Actions**
3. 推送代码后，首次工作流运行完成即可访问
   `https://<用户名>.github.io/dsh-desktop-website/`

> 也可改用传统方式：Source 选择 **Deploy from a branch**，分支选 `main`、目录选 `/ (root)`。

## 目录结构

```
index.html                 页面结构（Hero / 下载 / 特性 / 对比 / FAQ / 页脚）
styles.css                 样式（DeepSeek 品牌风格，响应式）
app.js                     平台检测 + 中英文案 + 最新版本拉取 + 下载地址填充
assets/                    logo.svg（鲸鱼 Logo）、应用图标
.github/workflows/pages.yml  GitHub Pages 自动部署工作流
```

## 版本同步说明

下载地址由 `app.js` 在浏览器端从
`https://api.github.com/repos/xingj404-lab/dsh-desktop/releases/latest`
动态获取，因此每次发布新版本后官网会自动更新，无需手动改动。

`index.html` 内嵌的 `window.__DSH_FALLBACK__` 为兜底数据；当 API 请求失败时
使用。若长时间依赖兜底数据，请同步更新其中的版本号与资产文件名。

## 文案维护

所有页面文案集中在 `app.js` 顶部的 `T` 对象（`zh` / `en` 两个语言）。
HTML 中通过 `data-i18n="key"`（纯文本）或 `data-i18n-html="key"`（含 HTML）
标记；新增或修改文案只需同步更新 `T` 中两个语言的对应 key。
