document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var imageInput = document.getElementById("imageInput");
    var file = imageInput.files[0];

    // Kiểm tra extension
    const validExtensions = ["png", "gif", "jpg", "jpeg"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      showMessage(
        "Extension không hợp lệ. Chỉ chấp nhận file PNG, GIF, JPG, JPEG."
      );
      return;
    }

    // Kiểm tra kích thước file
    if (file.size > 5 * 1024 * 1024) {
      showMessage("Dung lượng file vượt quá giới hạn 5MB.");
      return;
    }

    var formData = new FormData();
    formData.append("image", file);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/create/");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          showMessage(
            "Upload thành công! Thông tin hình ảnh: " +
              "Tên file gốc: " +
              file.name +
              ", " +
              "Tên file resized (width=200): " +
              response.resized200Name +
              ", " +
              "Tên file resized (width=500): " +
              response.resized500Name
          );
          imageInput.value = "";
        } else {
          showMessage("Có lỗi xảy ra: " + xhr.responseText);
        }
      }
    };
    xhr.send(formData);
  });

function showMessage(message) {
  var messageDiv = document.getElementById("message");
  messageDiv.textContent = message;
}
