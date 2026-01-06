# GitHub 推送脚本
# 使用方法：在 PowerShell 中运行此脚本

Write-Host "=== 将 Movie Utopia 推送到 GitHub ===" -ForegroundColor Cyan
Write-Host ""

# 检查是否已配置远程仓库
$remote = git remote get-url origin 2>$null
if ($remote) {
    Write-Host "已检测到远程仓库: $remote" -ForegroundColor Yellow
    $continue = Read-Host "是否要使用此远程仓库？(Y/N)"
    if ($continue -ne "Y" -and $continue -ne "y") {
        Write-Host "请先运行: git remote remove origin" -ForegroundColor Red
        exit
    }
} else {
    Write-Host "未检测到远程仓库。" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "请先在 GitHub 上创建仓库，然后提供以下信息：" -ForegroundColor Cyan
    Write-Host ""
    $username = Read-Host "GitHub 用户名"
    $repoName = Read-Host "仓库名称 (默认: movie-utopia)"
    if ([string]::IsNullOrWhiteSpace($repoName)) {
        $repoName = "movie-utopia"
    }
    
    $useSSH = Read-Host "使用 SSH？(Y/N，默认 N)"
    if ($useSSH -eq "Y" -or $useSSH -eq "y") {
        $remoteUrl = "git@github.com:$username/$repoName.git"
    } else {
        $remoteUrl = "https://github.com/$username/$repoName.git"
    }
    
    Write-Host ""
    Write-Host "添加远程仓库: $remoteUrl" -ForegroundColor Green
    git remote add origin $remoteUrl
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "添加远程仓库失败！" -ForegroundColor Red
        exit 1
    }
}

# 确保在 main 分支
Write-Host ""
Write-Host "检查分支..." -ForegroundColor Cyan
git branch -M main

# 推送代码
Write-Host ""
Write-Host "推送代码到 GitHub..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ 推送成功！" -ForegroundColor Green
    Write-Host ""
    Write-Host "下一步：" -ForegroundColor Cyan
    Write-Host "1. 访问 https://github.com 查看您的仓库" -ForegroundColor White
    Write-Host "2. 访问 https://vercel.com 部署您的项目" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ 推送失败！" -ForegroundColor Red
    Write-Host ""
    Write-Host "可能的原因：" -ForegroundColor Yellow
    Write-Host "- 需要身份验证（使用 Personal Access Token）" -ForegroundColor White
    Write-Host "- 远程仓库不存在或无权访问" -ForegroundColor White
    Write-Host "- 网络连接问题" -ForegroundColor White
    Write-Host ""
    Write-Host "查看 GITHUB_SETUP.md 获取详细帮助" -ForegroundColor Cyan
}
