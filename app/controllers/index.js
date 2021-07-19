

var danhSachNguoiDung = new DanhSachNguoiDung();
var layDanhSachND = function () {
    danhSachNguoiDung.layDSND().then(function (result) {
        renderTeacher(result.data);
        setLocalStorage(result.data);
    }).catch(function (error) {
        // alert('Bị lỗi hệ thống');
    });
};

layDanhSachND();
function renderTeacher(mangND) {
    var content = '';
    mangND.map(function (nd) {
        if (nd.loaiND === 'Giáo viên') {
            content += `
            <div class="item-1">
                <div class="item-image">
                    <img src="${nd.hinhAnh}" alt="">
                </div>

                <div class="item-text">
                    <div class="country">
                        <h3>${nd.ngonNgu}</h3>
                    </div>
                    <div class="name">
                        <h5>${nd.hoTen}</h5>
                    </div>
                    <div class="text-box">
                        <p>${nd.moTa}</p>
                    </div>
                </div>
            </div>

            `;
        };
    });

    document.getElementById('teacher-content').innerHTML = content;
}