# 🚀 快速部署指南

## 最简单的方式：Vercel（5分钟部署）

### 步骤 1：准备代码
确保您的代码已推送到 Git 仓库（GitHub、GitLab 或 Bitbucket）

### 步骤 2：访问 Vercel
1. 打开 https://vercel.com
2. 点击 "Sign Up" 或 "Log In"
3. 使用 GitHub 账号登录（推荐）

### 步骤 3：导入项目
1. 点击 "Add New..." → "Project"
2. 选择您的 Git 仓库
3. 点击 "Import"

### 步骤 4：配置（通常自动检测）
- Framework Preset: **Vite** ✅
- Root Directory: `./` ✅
- Build Command: `npm run build` ✅
- Output Directory: `dist` ✅

### 步骤 5：环境变量（如果需要）
如果项目需要 API 密钥：
- 在 "Environment Variables" 中添加
- 名称：`GEMINI_API_KEY`
- 值：您的 API 密钥

### 步骤 6：部署
1. 点击 "Deploy"
2. 等待 1-2 分钟
3. 完成！您会获得一个 URL，例如：`movie-utopia.vercel.app`

### 步骤 7：自定义域名（可选）
1. 在项目设置中添加您的域名
2. 按照提示配置 DNS
3. 等待 SSL 证书自动配置

---

## 其他平台快速链接

### Netlify
- 访问：https://www.netlify.com
- 拖拽 `dist` 文件夹即可部署
- 或连接 Git 仓库自动部署

### Cloudflare Pages
- 访问：https://pages.cloudflare.com
- 连接 Git 仓库
- 选择 Vite 框架预设

---

## 需要帮助？

查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取详细说明和故障排除指南。
