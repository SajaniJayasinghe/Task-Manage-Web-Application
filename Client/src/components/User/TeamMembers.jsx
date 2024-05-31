import React from "react";
import { Layout } from "antd"; // Import Layout from Ant Design
import Logo from "../Sidebar/Logo";
import MenuList from "../Sidebar/MenuList";

const { Sider, Content } = Layout;

const TeamMembers = () => {
  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Content>
          <h1>Team Members</h1>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TeamMembers;
