#!/bin/bash

# Netlify Deployment Script
# Bu script projeyi Netlify'a deploy eder

echo "🚀 Netlify Deployment Başlıyor..."
echo ""

# Netlify CLI kurulu mu kontrol et
if ! command -v netlify &> /dev/null
then
    echo "❌ Netlify CLI bulunamadı!"
    echo "📦 Netlify CLI kuruluyor..."
    npm install -g netlify-cli
fi

echo "✅ Netlify CLI hazır"
echo ""

# Login kontrolü
echo "🔐 Netlify'a giriş yapılıyor..."
netlify login

echo ""
echo "📤 Deployment başlatılıyor..."
echo ""

# Production'a deploy
netlify deploy --prod

echo ""
echo "✅ Deployment tamamlandı!"
echo ""
echo "🌐 Siteniz yayında!"
echo ""
echo "📊 Site durumunu kontrol etmek için:"
echo "   netlify status"
echo ""
echo "🔗 Site'ı açmak için:"
echo "   netlify open"
echo ""
