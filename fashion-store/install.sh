#!/bin/bash

# 👗 Fashion Store - ملف التثبيت السريع
# هذا الملف يثبт كل شيء تلقائياً

echo "================================================"
echo "👗 مرحباً بك في متجر الأزياء الفاخرة"
echo "Fashion Store - E-Commerce Platform"
echo "================================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت"
    echo "   اذهبي إلى: https://nodejs.org"
    echo "   واختاري الإصدار LTS"
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"
echo ""

# Install dependencies
echo "📦 تثبيت المكتبات... (قد يستغرق دقائق)"
npm install --legacy-peer-deps

if [ $? -ne 0 ]; then
    echo "❌ فشل التثبيت"
    echo "   جربي: npm install --legacy-peer-deps"
    exit 1
fi

echo ""
echo "✅ تم تثبيت المكتبات!"
echo ""

# Create or update .env.local
if [ -f .env ]; then
    echo "⚠️  ملف .env موجود بالفعل"
    echo "   تأكدي من أنه يحتوي على:"
    echo "     NEXT_PUBLIC_SUPABASE_URL=..."
    echo "     NEXT_PUBLIC_SUPABASE_KEY=..."
else
    echo "📝 إنشاء ملف .env"
    cp .env .env.local 2>/dev/null || true
fi

echo ""
echo "================================================"
echo "🎉 تم الإعداد بنجاح!"
echo "================================================"
echo ""
echo "📖 خطوات التشغيل:"
echo ""
echo "1️⃣  تأكدي من البيانات في .env"
echo ""
echo "2️⃣  شغّلي الموقع:"
echo "    npm run dev"
echo ""
echo "3️⃣  افتحي في المتصفح:"
echo "    http://localhost:3000"
echo ""
echo "📚 ملفات مهمة:"
echo "   - README.md            - تعليمات شاملة"
echo "   - QUICK_START.md       - بداية سريعة"
echo "   - SUPABASE_SETUP.md    - إعداد Supabase"
echo "   - REPLIT_GUIDE.md      - تشغيل على Replit"
echo "   - FAQ.md               - أسئلة شائعة"
echo ""
echo "🚀 لشغل الموقع الآن:"
echo "   npm run dev"
echo ""
echo "حظاً موفقاً! 👗✨"
echo ""
