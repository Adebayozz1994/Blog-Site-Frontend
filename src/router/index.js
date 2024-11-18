import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import LoginPage from "@/components/LoginPage.vue";
import DashBoard from "@/components/DashBoard.vue";
import PasswordLink from "@/components/PasswordLink.vue";
import ResetPassword from "@/components/ResetPassword.vue";
import PasswordUpdate from "@/components/PasswordUpdate.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import AdminRegister from "@/components/AdminRegister.vue";
import AdminLogin from "@/components/AdminLogin.vue";
import AdminDashboard from "@/components/AdminDashboard.vue";
import AdminResetPassword from "@/components/AdminResetPassword.vue";
import AdminPasswordLink from "@/components/AdminPasswordLink.vue";
import AdminPasswordUpdate from "@/components/AdminPasswordUpdate.vue";
import UserNews from "@/components/UserNews.vue";
import AdminNews from "@/components/AdminNews.vue";



const routes = [
    {path: "/", component: HelloWorld},
    {path: "/login", component: LoginPage},
    {path: "/dashboard", component: DashBoard},
    {path: "/passwordlink", component: PasswordLink},
    {path: "/reset-password/:token", component: ResetPassword},
    {path: "/passwordupdate", component: PasswordUpdate},
    {path: "/signup", component: RegisterPage},
    {path: "/news", component: UserNews},





    {path: "/admin/register", component: AdminRegister},
    {path: "/admin/login", component: AdminLogin},
    {path: "/admin/dashboard", component: AdminDashboard},
    {path: "/admin/passwordupdate", component: AdminPasswordUpdate},
    {path: "/admin/reset-password/:token", component: AdminResetPassword},
    {path: "/admin/passwordlink", component: AdminPasswordLink},
    {path: "/admin/News", component: AdminNews},









]



const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router; 