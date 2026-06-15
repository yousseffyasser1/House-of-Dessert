import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    // Encode details for WhatsApp URL
    const formattedText = `الاسم: ${name}\nرقم الهاتف: ${phone}\nالرسالة: ${message}`;
    const whatsappUrl = `https://wa.me/20123456789?text=${encodeURIComponent(formattedText)}`;
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-right" dir="rtl">
      
      {/* Page header */}
      <div className="text-center space-y-3 max-w-lg mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-stone-900 font-serif">تواصل معنا</h1>
        <p className="text-stone-500 text-sm">
          يسعدنا تواصلكم معنا عبر الواتساب أو النموذج أدناه
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-[#FAF9F5] rounded-3xl p-8 md:p-12 border border-stone-200/50 shadow-sm max-w-2xl mx-auto">
        <form onSubmit={handleWhatsAppSend} className="space-y-6">
          <Input
            label="الاسم"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="أدخل اسمك الكامل"
            required
          />

          <Input
            label="رقم الهاتف"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0xXXXXXXXX"
            type="tel"
            required
          />

          <Input
            label="الرسالة"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            textarea
            required
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="secondary"
              className="w-full justify-center h-12 shadow-md hover:bg-stone-950 bg-stone-900 text-amber-200"
            >
              إرسال عبر الواتساب
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
}
