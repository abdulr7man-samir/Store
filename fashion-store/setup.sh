#!/bin/bash

# 👗 Fashion Store Setup Script
# هذا السكريبت يساعدك في إعداد المشروع بسرعة

echo "🎀 مرحباً بك في متجر الأزياء الفاخرة"
echo "================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت. اذهب إلى https://nodejs.org"
    exit 1
fi

echo "✅ Node.js مثبت: $(node --version)"
echo ""

# Install dependencies
echo "📦 جاري تثبيت المكتبات..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ فشل التثبيت"
    exit 1
fi

echo ""
echo "✅ تم تثبيت المكتبات بنجاح!"
echo ""

# Create .env file
if [ ! -f .env.local ]; then
    echo "📝 إنشاء ملف .env.local..."
    cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_KEY=
EOF
    echo "✅ تم إنشاء .env.local"
    echo ""
    echo "⚠️  الآن لازم تملي البيانات:"
    echo "   NEXT_PUBLIC_SUPABASE_URL = رابط المشروع من Supabase"
    echo "   NEXT_PUBLIC_SUPABASE_KEY = مفتاح Anon من Supabase"
else
    echo "✅ ملف .env.local موجود بالفعل"
fi

echo ""
echo "🚀 لتشغيل المشروع استخدم:"
echo "   npm run dev"
echo ""
echo "ثم افتح: http://localhost:3000"
echo ""
