import React from "react";
import { Layout, Card, Row, Col } from "antd";
import {
  FaTasks,
  FaCheckCircle,
  FaSpinner,
  FaClipboardList,
} from "react-icons/fa";
import Logo from "../components/Sidebar/Logo";
import MenuList from "../components/Sidebar/MenuList";

const { Sider, Content } = Layout;

const Dashboard = () => {
  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Content className="p-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card
                title={
                  <div className="flex items-center">
                    <FaTasks className="text-white mr-2" />
                    <span className="text-white">TOTAL TASKS</span>
                  </div>
                }
                bordered={false}
                className="bg-[#1d4ed8] text-white"
              >
                <p style={{ fontSize: "30px", fontWeight: "bold" }}>10</p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card
                title={
                  <div className="flex items-center">
                    <FaCheckCircle className="text-white mr-2" />
                    <span className="text-white">COMPLETED TASKS</span>
                  </div>
                }
                bordered={false}
                className="bg-green-500 text-white"
              >
                <p style={{ fontSize: "30px", fontWeight: "bold" }}>1</p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card
                title={
                  <div className="flex items-center">
                    <FaSpinner className="text-white mr-2" />
                    <span className="text-white">TASK IN PROGRESS</span>
                  </div>
                }
                bordered={false}
                className="bg-yellow-500 text-white"
              >
                <p style={{ fontSize: "30px", fontWeight: "bold" }}>3</p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card
                title={
                  <div className="flex items-center">
                    <FaClipboardList className="text-white mr-2" />
                    <span className="text-white">TODOS</span>
                  </div>
                }
                bordered={false}
                className="bg-red-500 text-white"
              >
                <p style={{ fontSize: "30px", fontWeight: "bold" }}>6</p>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
