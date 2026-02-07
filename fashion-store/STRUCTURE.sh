#!/bin/bash

# عرض بنية المشروع الكاملة
echo "📂 بنية مشروع متجر الأزياء الفاخرة"
echo "═════════════════════════════════════════"
echo ""

tree -L 3 -I 'node_modules|.next' 2>/dev/null || find . -type d -not -path '*/\.*' -not -path '*/node_modules/*' -not -path '*/.next/*' | head -30 | sort

echo ""
echo "📋 ملخص الملفات:"
echo "   JavaScript files:  $(find . -name '*.js' -not -path '*/node_modules/*' -not -path '*/.next/*' | wc -l)"
echo "   Markdown files:    $(find . -name '*.md' -not -path '*/node_modules/*' | wc -l)"
echo "   Config files:      $(find . -name '*.json' -not -path '*/node_modules/*' | wc -l)"
echo "   CSS files:         $(find . -name '*.css' -not -path '*/node_modules/*' | wc -l)"
echo ""

echo "✅ تم إنشاء المشروع بجميع الملفات المطلوبة!"
