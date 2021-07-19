// tạo đối tượng danhSachNguoiDung từ lớp đối tượng DanhSachNguoiDung
var danhSachNguoiDung = new DanhSachNguoiDung();


// validator
var validator = new Validator();

function getEle(id) {
    return document.getElementById(id);
};



//xóa người dùng
var xoaND = function(id) {
    danhSachNguoiDung.xoaNguoiDung(id).then(function(result) {
        alert('Bạn có muốn xóa ko???')
        layDanhSachND();
    }).catch(function(error) {
        // alert('Lỗi hệ thống');
    });
};




//cập nhật người dùng
var capNhatND = function(id) {
    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var hinhAnh = getEle('HinhAnh').value;
    var loaiND = getEle('loaiNguoiDung').value;
    var ngonNgu = getEle('loaiNgonNgu').value;
    var moTa = getEle('MoTa').value;


    var isValid = true;

    isValid &= validator.kiemTraRong(taiKhoan, 'tbTaiKhoan', '(*) Hãy nhập thông tin tài khoản vào !!!');

    isValid &= validator.kiemTraRong(hoTen, 'tbHoTen', '(*) Hãy nhập thông tin họ tên vào !!!')
                && validator.kiemTraChuoi(hoTen, 'tbHoTen', '(*) Hãy nhập chuỗi ký tự (không bao gồm ký tự đặc biệt !!!)');

    isValid &= validator.kiemTraRong(matKhau, 'tbMatKhau', '(*) Hãy nhập thông tin mật khẩu vào !!!')
                && validator.kiemTraPassWord(matKhau, 'tbMatKhau', '(*) Hãy nhập từ 6 đến 8 ký tự: "Bao gồm ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt !!!');

    isValid &= validator.kiemTraRong(email, 'tbEmail', '(*) Hãy nhập email vào !!!')
                && validator.kiemTraEmail(email, 'tbEmail', '(*) Hãy nhập email đúng định dạng !!!');
            
    isValid &= validator.kiemTraRong(hinhAnh, 'tbHinhAnh', '(*) Hãy nhập link hình ảnh vào !!!');

    isValid &= validator.kiemTraChucVu(loaiND, 'tbLoaiND', '(*) Hãy chọn người dùng !!!');

    isValid &= validator.kiemTraNgoNgu(ngonNgu, 'tbNgonNgu', '(*) Hãy chọn ngôn ngữ !!!');

    isValid &= validator.kiemTraRong(moTa, 'tbMoTa', '(*) Hã nhập mô tả vào !!!')
                && validator.kiemTraDoDaiKyTu(moTa, 'tbMoTa', '(*) Hãy nhập không quá 60 ký tự !!!', 1, 60);

    if(!isValid) return;


    var nd = new NguoiDung(taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);
    danhSachNguoiDung.capNhatNguoiDung(id, nd).then(function(result) {
        layDanhSachND();

        document.querySelector('#myModal .close').click();
        
    }).catch(function(error) {
        // alert('Lỗi hệ thống');
    });

};



var xemND = function(id) {
    danhSachNguoiDung.xemNguoiDung(id).then(function(result) {
        var ds = result.data;
    
        getEle('btnThemNguoiDung').click();

        getEle('TaiKhoan').value = ds.taiKhoan;
        getEle('HoTen').value = ds.hoTen;
        getEle('MatKhau').value = ds.matKhau;
        getEle('Email').value = ds.email;
        getEle('HinhAnh').value = ds.hinhAnh;
        getEle('loaiNguoiDung').value = ds.loaiND;
        getEle('loaiNgonNgu').value = ds.ngonNgu;
        getEle('MoTa').value = ds.moTa;

        var modalFooter = document.querySelector('.modal-footer');
        modalFooter.innerHTML = `<button class="btn btn-success" onclick="capNhatND('${ds.id}')">Cập nhật</button>`

    }).catch(function(error) {
        // alert('Lỗi hệ thống');
    });
};




// render hiện thị danh sách người dùng
function renderTable(mangDanhSach) {
    var content = '';
    mangDanhSach.map(function(ds, index) {
        content += `
            <tr style="text-align: center">
                <td>${index + 1}</td>
                <td>${ds.taiKhoan}</td>
                <td>${ds.matKhau}</td>
                <td>${ds.hoTen}</td>
                <td>
                    <img style="width: 80px; height: 80px" src="${ds.hinhAnh}"/>
                </td>
                <td>${ds.email}</td>
                <td>${ds.ngonNgu}</td>
                <td>${ds.loaiND}</td>
                <td>${ds.moTa}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaND('${ds.id}')">Xóa</button>
                    <button class="btn btn-success" onclick="xemND('${ds.id}')">Xem</button>
                </td>
            </tr>
        
        `;
    });

    getEle('tblDanhSachNguoiDung').innerHTML = content;
};


// tìm kiếm người dùng
getEle('ipTimKiem').addEventListener('keyup', function() {
    var mangND = getLocalStorage();
    var chuoiTK = getEle('ipTimKiem').value;

    var mangTimKiem = danhSachNguoiDung.timKiem(mangND, chuoiTK);
    renderTable(mangTimKiem);
});



// lấy danh sách người dùng từ người dùng nhập
var layDanhSachND = function() {
    danhSachNguoiDung.layDSND().then(function(result) {
        renderTable(result.data);
        setLocalStorage(result.data); 
    }).catch(function(error) {
        // alert('Bị lỗi hệ thống');
    });
};

layDanhSachND();




// thêm người dùng
var themND = function() {
    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var hinhAnh = getEle('HinhAnh').value;
    var loaiND = getEle('loaiNguoiDung').value;
    var ngonNgu = getEle('loaiNgonNgu').value;
    var moTa = getEle('MoTa').value;

   var dsnd = getLocalStorage();

    // validate input
    var isValid = true;

    isValid &= validator.kiemTraRong(taiKhoan, 'tbTaiKhoan', '(*) Hãy nhập thông tin tài khoản vào !!!')
                && validator.trungTaiKhoan(taiKhoan, dsnd, 'tbTaiKhoan', '(*) Tài khoản bị trùng !!!');

    isValid &= validator.kiemTraRong(hoTen, 'tbHoTen', '(*) Hãy nhập thông tin họ tên vào !!!')
                && validator.kiemTraChuoi(hoTen, 'tbHoTen', '(*) Hãy nhập chuỗi ký tự (không bao gồm ký tự đặc biệt !!!)');

    isValid &= validator.kiemTraRong(matKhau, 'tbMatKhau', '(*) Hãy nhập thông tin mật khẩu vào !!!')
                && validator.kiemTraPassWord(matKhau, 'tbMatKhau', '(*) Hãy nhập từ 6 đến 8 ký tự: "Bao gồm ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt !!!');

    isValid &= validator.kiemTraRong(email, 'tbEmail', '(*) Hãy nhập email vào !!!')
                && validator.kiemTraEmail(email, 'tbEmail', '(*) Hãy nhập email đúng định dạng !!!');
            
    isValid &= validator.kiemTraRong(hinhAnh, 'tbHinhAnh', '(*) Hãy nhập link hình ảnh vào !!!');

    isValid &= validator.kiemTraChucVu(loaiND, 'tbLoaiND', '(*) Hãy chọn người dùng !!!');

    isValid &= validator.kiemTraNgoNgu(ngonNgu, 'tbNgonNgu', '(*) Hãy chọn ngôn ngữ !!!');

    isValid &= validator.kiemTraRong(moTa, 'tbMoTa', '(*) Hã nhập mô tả vào !!!')
                && validator.kiemTraDoDaiKyTu(moTa, 'tbMoTa', '(*) Hãy nhập không quá 60 ký tự !!!', 1, 60);

    if(!isValid) return;

    
    // khởi tạo nguoiDung từ lớp đối tượng NguoiDung
    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);
    danhSachNguoiDung.themNguoiDung(nguoiDung)
        .then(function(result) {
            layDanhSachND();
        }).catch(function(error) {
            // alert('Lỗi hệ thống');
        });
    
};

getEle('btnThemNguoiDung').addEventListener('click', function() {
    getEle('formND').reset();
    var modalFooter = document.querySelector('.modal-footer');
    modalFooter.innerHTML = `<button class="btn btn-success" onclick="themND()">Thêm người dùng</button>`
});




function setLocalStorage(dsnd) {
    localStorage.setItem('DSND', JSON.stringify(dsnd));
};

function getLocalStorage() {
    if(localStorage.getItem('DSND')) {
        return JSON.parse(localStorage.getItem('DSND'));  
    }; 
};