import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";
import SettingsPage from "./components/SettingsPage";
import RecordsPage from "./components/RecordsPage";
import PlanPage from "./components/PlanPage";
import CommunityPage from "./components/CommunityPage";
import FriendsPage from "./components/FriendsPage";
import UserPage from "./components/UserPage";
import "./components/i18n";
import Calculate from "./components/Calculate";

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="min-h-screen flex flex-col bg-[url('./images/pexels-willpicturethis-1954524.jpg')] bg-cover bg-center bg-fixed bg-no-repeat">
        <Header />
        <Content className="flex-1 bg-white/60">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/records" element={<RecordsPage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/calculate" element={<Calculate />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
