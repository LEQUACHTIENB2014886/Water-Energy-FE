export default function useUser() {
    // Lấy UserId từ localStorage
    const getUserId = () => {
        const USERID = localStorage.getItem("USERID");
        if (!USERID) {
            // Nếu không có USERID, xóa dữ liệu người dùng khỏi localStorage
            clearUserData();
        }
        return USERID;
    };

    // Xóa dữ liệu người dùng khỏi localStorage
    const clearUserData = () => {
        localStorage.removeItem("USERID");
        localStorage.removeItem("USERNAME");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    };

    // Lưu thông tin người dùng vào localStorage
    const setUserInfo = (response) => {
        localStorage.setItem("USERID", response.data.data.UserId);
        localStorage.setItem("USERNAME", response.data.data.UserName);
        localStorage.setItem("token", response.data.data.Token);
        localStorage.setItem("role", response.data.data.Role);
    };

    // Lấy thông tin người dùng từ localStorage
    const getUserData = () => {
        const USERID = localStorage.getItem("USERID");
        const USERNAME = localStorage.getItem("USERNAME");
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        // Kiểm tra xem người dùng đã đăng nhập hay chưa (có token không)
        if (!token) {
            return null; // Nếu không có token, tức là người dùng chưa đăng nhập
        }

        // Trả về một đối tượng chứa các dữ liệu người dùng
        return { USERID, USERNAME, token, role };
    };

    // Kiểm tra xem người dùng có đăng nhập không (dựa vào token)
    const isAuthenticated = () => {
        const hasToken = localStorage.getItem("token");
        return hasToken !== null;
    };

    // Trả về các hàm và dữ liệu
    return {
        getUserId,
        setUserInfo,
        isAuthenticated,
        clearUserData,
        getUserData,
    };
}