async function submitForm(event) {
  event.preventDefault(); // منع إعادة تحميل الصفحة

  const form = document.getElementById("registrationForm");
  const formData = new FormData(form);

  // تحقق من الحقول المطلوبة
  const fullName = document.getElementById("fullName").value;
  const salary = document.getElementById("salary").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const workSector = document.getElementById("workSector").value;
  const bank = document.getElementById("bank").value;

  if (fullName && salary && phoneNumber && workSector && bank) {
    try {
      // إرسال النموذج إلى Formspree
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // عرض التنبيه
        const successAlert = document.getElementById("successAlert");
        successAlert.classList.remove("hidden");
        successAlert.classList.add("show");

        // إعادة تعيين الحقول بعد الإرسال
        form.reset();

        // إخفاء التنبيه بعد 3 ثوانٍ وإعادة التوجيه للصفحة الرئيسية
        setTimeout(() => {
          successAlert.classList.remove("show");
          successAlert.classList.add("hidden");
          window.location.href = "/"; // إعادة التوجيه للصفحة الرئيسية
        }, 3000);
      } else {
        alert("حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
      }
    } catch (error) {
      alert("تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.");
    }
  } else {
    alert("يرجى تعبئة جميع الحقول.");
  }
}

// استبدال زر الإرسال بدالة الإرسال المخصصة
document
  .getElementById("registrationForm")
  .addEventListener("submit", submitForm);
