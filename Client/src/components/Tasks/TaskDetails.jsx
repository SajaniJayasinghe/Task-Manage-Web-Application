import React, { useState } from "react";
import MenuList from "../Sidebar/MenuList";
import Logo from "../Sidebar/Logo";
import { Layout, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateTasks from "../Tasks/CreateTasks";

const { Sider, Content } = Layout;

const TaskDetails = () => {
  const [open, setOpen] = useState(false);

  // Function to toggle the modal visibility

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Content style={{ display: "flex" }}>
          <h1
            style={{
              marginTop: 30,
              marginLeft: 40,
              fontSize: 30,
              fontWeight: "bold",
              flex: 1,
            }}
          >
            Tasks
          </h1>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginTop: 30, marginRight: 20 }}
            size="large"
            onClick={toggleModal}
          >
            Create Task
          </Button>
          {open && <CreateTasks open={open} setOpen={setOpen} />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default TaskDetails;
