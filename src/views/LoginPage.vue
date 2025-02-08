<template>
    <div class="login-container">
      <!-- 左側: 圖片區塊 -->
      <div class="image-section">
        <TripleCircle></TripleCircle>
      </div>
  
      <!-- 右側: 登入表單 -->
      <div class="form-section">
        <div class="form-content">
          <div
            style="
              position: absolute;
              top: 5%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            ">
            <img
              src="https://www.laiyih.com/uploads/tw/company/20231218206.png"
              class="logo-image" />
          </div>
  
          <v-card class="custom-card">
            <v-form @submit.prevent="login">
              <v-select
                v-model="Users.Factory"
                label="Select Factory"
                :items="['Ty Xuan', 'Ty Bach', 'Ty Thac']"
                required
                variant="solo"
                hide-details
                class="input-field">
              </v-select>
  
              <v-text-field
                v-model="Users.UserID"
                label="ID"
                required
                variant="solo"
                hide-details
                class="input-field"></v-text-field>
              <v-text-field
                v-model="Users.Password"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                variant="solo"
                required
                hide-details
                @click:append-inner="showPassword = !showPassword"
                class="input-field"></v-text-field>
              <v-btn type="submit" dark block class="login-button" height="55px">
                Login
              </v-btn>
            </v-form>
          </v-card>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref, onMounted } from "vue";
  import axios from "axios";
  import { useRouter } from "vue-router";
  import { ElMessage } from "element-plus";
  import TripleCircle from "../components/LoginPage/TripleCircle.vue";
  const router = useRouter();
  const showPassword = ref(false);
  
  const Users = reactive({
    UserID: localStorage.getItem("USERID") || "",
    Password: localStorage.getItem("PASSWORD") || "",
    Factory: localStorage.getItem("Factory") || "Ty Xuan", // 默認是 Ty Xuan
  });
  
  const Factory = ref("");
  
  const login = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/qc/login`,
        Users
      );
      if (typeof response.data.data === "object") {
        localStorage.setItem("USERID", response.data.data.USERID);
        localStorage.setItem("Factory", response.data.data.Factory); // 存儲 Factory
        localStorage.setItem("USERNAME", response.data.data.USERNAME);
        router.push("/");
      } else {
        ElMessage({
          message: response.data.data,
          type: "warning",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  </script>
  
  <style scoped>
  /* 整體佈局 */
  .login-container {
    display: flex;
    height: 100vh;
    background: url(https://attachment.pooban.com/uploads/allimg/20220805/1-220P50F520I8.jpg);
    background-size: cover;
  }
  
  /* 左側圖片 */
  .image-section {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    clip-path: polygon(0 0, 80% 0, 100% 100%, 10% 100%);
  }
  
  .login-image {
    max-width: 80%;
    height: auto;
    border-radius: 10px;
  }
  
  /* 右側表單 */
  .form-section {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(https://www.laiyih.com/uploads/tw/home_about/20210205281.png);
    background-size: cover;
    clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
  }
  
  .form-content {
    text-align: center;
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* 水平置中 */
    justify-content: center; /* 垂直置中 */
    height: 100%;
  }
  
  .logo-image {
    height: 100px;
  }
  
  .custom-card {
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid rgb(16, 172, 211);
    border-radius: 10px;
    padding: 20px;
    width: 100%;
  }
  
  .input-field {
    margin-bottom: 15px;
  }
  
  .login-button {
    color: white;
    font-size: 1rem;
    background-color: rgb(0, 110, 255);
  }
  
  /* 響應式設計：小螢幕時改為上下佈局 */
  @media (max-width: 768px) {
    .login-container {
      flex-direction: column;
    }
  
    .image-section {
      height: 40%;
    }
  
    .form-section {
      height: 60%;
    }
  }
  </style>
  