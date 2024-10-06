document.addEventListener("DOMContentLoaded", function() {
    // Khởi tạo EmailJS với User ID của bạn
    emailjs.init("VHkVYXTcTNZWcmGFS");
    console.log('init success') // Thay YOUR_USER_ID bằng User ID của bạn từ EmailJS

    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Xóa các thông báo lỗi trước đó
        document.querySelectorAll('.error').forEach(function(el) {
            el.remove();
        });

        console.log("submit");
        

        let hasError = false;

        // Kiểm tra các trường bắt buộc
        document.querySelectorAll('.requiredField').forEach(function(field) {
            if (field.value.trim() === '') {
                const labelText = field.previousElementSibling ? field.previousElementSibling.textContent : 'This field';
                const errorSpan = document.createElement('span');
                errorSpan.className = 'error';
                errorSpan.textContent = `You forgot to enter your ${labelText}`;
                field.parentElement.appendChild(errorSpan);
                field.classList.add('inputError');
                hasError = true;
            } else if (field.classList.contains('email')) {
                const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if (!emailReg.test(field.value.trim())) {
                    const labelText = field.previousElementSibling ? field.previousElementSibling.textContent : 'Email';
                    const errorSpan = document.createElement('span');
                    errorSpan.className = 'error';
                    errorSpan.textContent = `You entered an invalid ${labelText}`;
                    field.parentElement.appendChild(errorSpan);
                    field.classList.add('inputError');
                    hasError = true;
                }
            }
        });

        if (!hasError) {
            // Ẩn nút gửi và hiển thị loader
            document.querySelector('#sendMess').style.display = 'none';
            document.querySelector('.preloader').style.display = 'block';

            const formData = new FormData(form);
            const data = {
                name: formData.get("name").valueOf(),
                email: formData.get("email"),
                message: formData.get("message")
            };
            console.log(data);
            
            emailjs.send("service_f2mzl7x","template_esu6vfk", data)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                window.location.href = "thank-you.html";
            }, function(error) {
                alert("Oops! Something went wrong and we couldn't send your message.");
                document.querySelector('.preloader').style.display = 'block';
            });
        return false;
        }
    });
});