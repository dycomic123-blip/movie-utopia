# 📦 将代码推送到 GitHub

## ✅ 已完成
- ✅ Git 仓库已初始化
- ✅ 代码已提交到本地仓库

## 📝 下一步：推送到 GitHub

### 方法一：在 GitHub 网站创建仓库（推荐）

1. **创建新仓库**
   - 访问：https://github.com/new
   - Repository name: `movie-utopia`（或您喜欢的名称）
   - 选择 Public 或 Private
   - ⚠️ **不要**勾选 "Initialize this repository with a README"
   - ⚠️ **不要**添加 .gitignore 或 license（我们已经有了）
   - 点击 "Create repository"

2. **连接本地仓库到 GitHub**
   在终端运行以下命令（将 `YOUR_USERNAME` 替换为您的 GitHub 用户名）：
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/movie-utopia.git
   git branch -M main
   git push -u origin main
   ```

3. **如果使用 SSH**（如果您配置了 SSH 密钥）：
   ```bash
   git remote add origin git@github.com:YOUR_USERNAME/movie-utopia.git
   git branch -M main
   git push -u origin main
   ```

### 方法二：使用 GitHub CLI（如果已安装）

```bash
gh repo create movie-utopia --public --source=. --remote=origin --push
```

---

## 🔐 认证问题

如果推送时要求输入用户名和密码：

### 使用 Personal Access Token（推荐）

1. **创建 Token**
   - 访问：https://github.com/settings/tokens
   - 点击 "Generate new token" → "Generate new token (classic)"
   - 设置名称：`Movie Utopia Deployment`
   - 选择权限：至少勾选 `repo`
   - 点击 "Generate token"
   - **复制 token**（只显示一次！）

2. **使用 Token 推送**
   - 用户名：您的 GitHub 用户名
   - 密码：粘贴刚才复制的 token

### 或使用 GitHub Desktop

- 下载：https://desktop.github.com
- 使用图形界面推送代码

---

## ✅ 验证推送成功

推送成功后，访问您的 GitHub 仓库页面，应该能看到所有文件。

然后就可以在 Vercel/Netlify 中导入这个仓库了！

---

## 🚀 推送后立即部署

1. 访问 https://vercel.com
2. 点击 "New Project"
3. 选择您的 `movie-utopia` 仓库
4. 点击 "Deploy"

完成！
