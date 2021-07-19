function Validator() {
    this.kiemTraRong = function(value, spanId, mess) {
        if(!value) {
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }

        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return true; 
    };

    this.kiemTraChuoi = function(value, spanId, mess) {
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");

        if(pattern.test(value)) {
             getEle(spanId).style.display = 'none';
             getEle(spanId).innerHTML = '';
             return true;
        }

        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    };

    this.kiemTraPassWord = function(value, spanId, mess) {
        var testPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,8})");

        if(testPass.test(value)) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }

        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    };

    this.kiemTraEmail = function(value, spanId, mess) {
        var testEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if(testEmail.test(value)) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }

        getEle(spanId).style.display = ' block';
        getEle(spanId).innerHTML = mess;
        return false;
    };

    this.kiemTraDoDaiKyTu = function(value, spanId, mess, min, max) {
        if(value.length >= min && value.length <= max) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }

        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    };

    this.kiemTraChucVu = function (value, spanId, mess) {
        if(value === 'Giáo viên' || value === 'Học viên') {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }

        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    };

    this.kiemTraNgoNgu = function(value, spanId, mess) {
        if(value === 'ITALIAN' || value === 'FRENCH' || value === 'JAPANESE' || value === 'CHINESE' || value === "SWEDEN" || value === "RUSSIAN" || value === "SPANISH") {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }

        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    };

    this.trungTaiKhoan = function(value, dsnd, spanId, mess) {
        isvalid = true;
        dsnd.map(function (nd, index) {
            if(value === nd.taiKhoan) {
                getEle(spanId).style.display = 'block';
                getEle(spanId).innerHTML = mess;
                isvalid = false;
            }

            if(!isvalid) return isvalid;
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return isvalid;
        });
    };
}
