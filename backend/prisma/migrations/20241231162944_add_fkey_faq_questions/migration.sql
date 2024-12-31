-- AddForeignKey
ALTER TABLE "faq_questions" ADD CONSTRAINT "faq_questions_faq_category_id_fkey" FOREIGN KEY ("faq_category_id") REFERENCES "faq_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
