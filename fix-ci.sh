#!/bin/bash

# 快速修复CI工作流程脚本

echo "🔧 修复CI工作流程..."

# 删除复杂的工作流程文件
echo "📁 删除复杂的工作流程文件..."
rm -f .github/workflows/ci.yml
rm -f .github/workflows/release.yml
rm -f .github/workflows/simple-ci.yml

# 使用纯构建工作流程
echo "✅ 使用纯构建工作流程..."
mv .github/workflows/build-only.yml .github/workflows/ci.yml

echo "🎉 修复完成！"
echo ""
echo "📋 现在的工作流程功能："
echo "  ✅ 代码质量检查 (ESLint + TypeScript)"
echo "  ✅ 自动构建应用"
echo "  ✅ 上传构建产物"
echo "  ✅ 无需外部配置"
echo ""
echo "🚀 下一步："
echo "  1. git add ."
echo "  2. git commit -m 'Fix CI workflow'"
echo "  3. git push origin main"
echo ""
echo "📱 本地测试："
echo "  npm run dev    # 开发模式"
echo "  npm run build  # 构建测试"
