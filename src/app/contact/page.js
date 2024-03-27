import React from "react";
import StaticContact from "../../components/Contact/StaticContact";
import ContactForm from "../../components/Contact/ContactForm";

// 건의함 및 문의사항 전달로서의 기능을 하면 좋을 듯
// 이름 또는 단체 (required)
// 이메일 주소 (required)
// 내용 (required)
// ‘Contact Us (보내기)’ 버튼

export default async function ContactPage() {
  return (
    <section className="flex justify-center gap-12 py-10">
      <StaticContact />

      <ContactForm />
    </section>
  );
}

// app password: hezp rpnd abqp qeyq
