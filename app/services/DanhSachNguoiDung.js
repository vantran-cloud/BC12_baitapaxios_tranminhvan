function DanhSachNguoiDung() {
    this.layDSND = function() {
        // lấy dữ liệu danh sách từ server
        var promise = axios({
            url: 'https://60f2a5596d44f30017788715.mockapi.io/users',
            method: 'GET',
        });
        return promise;
    };

    // thêm người dùng
    this.themNguoiDung = function(ds) {
        return axios({
            url: 'https://60f2a5596d44f30017788715.mockapi.io/users',
            method: 'POST',
            data: ds,
        });  
    };

    // xóa người dùng
    this.xoaNguoiDung = function(id) {
        return axios({
            url: `https://60f2a5596d44f30017788715.mockapi.io/users/${id}`,
            method: 'DELETE',
        });
    };

  
    this.xemNguoiDung = function(id) {
        return axios({
            url: `https://60f2a5596d44f30017788715.mockapi.io/users/${id}`,
            method: 'GET',
        });
    };


    // cập nhật người dùng
    this.capNhatNguoiDung = function(id, ds) {
        return axios({
            url: `https://60f2a5596d44f30017788715.mockapi.io/users/${id}`,
            method: 'PUT',
            data: ds,
        });
    };


    // tìm kiếm người dùng
    this.timKiem = function(dsnd, chuoiTK) {
        return dsnd.filter(function(ds) {
            return ds.hoTen.toLowerCase().indexOf(chuoiTK.toLowerCase()) !== -1;
        });
    };
}