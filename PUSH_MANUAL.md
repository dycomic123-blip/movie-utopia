# 手动推送代码到 GitHub

由于网络连接问题，请按照以下步骤手动推送：

## 方法一：使用 GitHub Desktop（最简单）

1. **下载 GitHub Desktop**
   - 访问：https://desktop.github.com
   - 下载并安装

2. **添加仓库**
   - 打开 GitHub Desktop
   - File → Add Local Repository
   - 选择文件夹：`d:\cursor files\movie-utopia`
   - 点击 "Add repository"

3. **推送到 GitHub**
   - 点击 "Publish repository"
   - 输入仓库名称：`movie-utopia`
   - 选择是否公开
   - 点击 "Publish repository"

## 方法二：使用命令行（需要配置代理或 VPN）

如果您的网络需要代理访问 GitHub：

### 配置 Git 使用代理

```powershell
# HTTP 代理
git config --global http.proxy http://proxy.example.com:8080
git config --global https.proxy https://proxy.example.com:8080

# 或 SOCKS5 代理
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080
```

然后再次尝试推送：
```powershell
cd "d:\cursor files\movie-utopia"
git push -u origin main
```

### 使用 SSH 方式（如果配置了 SSH 密钥）

```powershell
cd "d:\cursor files\movie-utopia"
git remote set-url origin git@github.com:dycomic123-blip/movie-utopia.git
git push -u origin main
```

## 方法三：使用 Gitee（国内镜像）

如果 GitHub 访问困难，可以先推送到 Gitee：

1. **在 Gitee 创建仓库**
   - 访问：https://gitee.com
   - 创建新仓库 `movie-utopia`

2. **推送代码**
   ```powershell
   cd "d:\cursor files\movie-utopia"
   git remote add gitee https://gitee.com/dycomic123-blip/movie-utopia.git
   git push -u gitee main
   ```

3. **稍后同步到 GitHub**
   - 在 Gitee 仓库设置中，可以配置 GitHub 同步

## 方法四：压缩包上传

如果以上方法都不行：

1. **创建压缩包**
   - 右键项目文件夹 → 发送到 → 压缩(zipped)文件夹
   - 排除 `node_modules` 和 `dist` 文件夹

2. **在 GitHub 上传**
   - 访问：https://github.com/new
   - 创建仓库 `movie-utopia`
   - 点击 "uploading an existing file"
   - 上传压缩包并解压
   - 提交更改

## 当前状态

✅ 代码已提交到本地 Git 仓库
✅ 远程仓库已配置：`https://github.com/dycomic123-blip/movie-utopia.git`
❌ 网络连接问题，无法直接推送

## 推荐方案

**最简单**：使用 GitHub Desktop（方法一）
**最快**：配置代理后使用命令行（方法二）
**备选**：使用 Gitee 中转（方法三）

选择最适合您的方法！
